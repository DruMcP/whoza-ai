import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// YouTube OAuth Configuration
const YOUTUBE_CLIENT_ID = Deno.env.get("YOUTUBE_CLIENT_ID")!;
const YOUTUBE_CLIENT_SECRET = Deno.env.get("YOUTUBE_CLIENT_SECRET")!;

interface UploadRequest {
  user_id: string;
  video_url: string;
  title: string;
  description?: string;
  tags?: string[];
  privacy_status?: "public" | "private" | "unlisted";
  category_id?: string;
  campaign_id?: string;
  post_id?: string;
}

// Helper function to refresh access token if expired
async function getValidAccessToken(supabase: any, connection: any): Promise<string | null> {
  const isExpired = new Date(connection.token_expires_at) < new Date();
  
  if (!isExpired) {
    return connection.access_token;
  }

  if (!connection.refresh_token) {
    return null;
  }

  console.log("Access token expired, refreshing...");

  const refreshResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: connection.refresh_token,
      client_id: YOUTUBE_CLIENT_ID,
      client_secret: YOUTUBE_CLIENT_SECRET,
    }),
  });

  const refreshData = await refreshResponse.json();

  if (refreshData.error) {
    console.error("Token refresh failed:", refreshData);
    return null;
  }

  const newExpiresAt = new Date(Date.now() + (refreshData.expires_in || 3600) * 1000).toISOString();

  await supabase
    .from("social_connections")
    .update({
      access_token: refreshData.access_token,
      token_expires_at: newExpiresAt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", connection.id);

  return refreshData.access_token;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: UploadRequest = await req.json();
    const {
      user_id,
      video_url,
      title,
      description = "",
      tags = [],
      privacy_status = "private", // Default to private for safety
      category_id = "22", // People & Blogs category
      campaign_id,
      post_id,
    } = body;

    // Validate required fields
    if (!user_id || !video_url || !title) {
      return new Response(JSON.stringify({ 
        error: "Missing required fields: user_id, video_url, and title are required" 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get YouTube connection
    const { data: connection, error: connError } = await supabase
      .from("social_connections")
      .select("*")
      .eq("user_id", user_id)
      .eq("platform", "youtube")
      .eq("is_active", true)
      .single();

    if (connError || !connection) {
      return new Response(JSON.stringify({ error: "YouTube not connected" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get valid access token (refresh if needed)
    const accessToken = await getValidAccessToken(supabase, connection);
    if (!accessToken) {
      return new Response(JSON.stringify({ 
        error: "YouTube token expired. Please reconnect your account." 
      }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Download the video from the provided URL
    console.log("Downloading video from:", video_url);
    const videoResponse = await fetch(video_url);
    
    if (!videoResponse.ok) {
      return new Response(JSON.stringify({ 
        error: `Failed to download video: ${videoResponse.statusText}` 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const videoBlob = await videoResponse.blob();
    const videoSize = videoBlob.size;
    console.log("Video downloaded, size:", videoSize, "bytes");

    // Create video metadata
    const videoMetadata = {
      snippet: {
        title: title,
        description: description,
        tags: tags,
        categoryId: category_id,
      },
      status: {
        privacyStatus: privacy_status,
        selfDeclaredMadeForKids: false,
      },
    };

    // Step 1: Initialize resumable upload
    console.log("Initializing resumable upload...");
    const initResponse = await fetch(
      "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Upload-Content-Length": videoSize.toString(),
          "X-Upload-Content-Type": videoBlob.type || "video/mp4",
        },
        body: JSON.stringify(videoMetadata),
      }
    );

    if (!initResponse.ok) {
      const errorText = await initResponse.text();
      console.error("Upload initialization failed:", errorText);
      
      let errorMessage = "Failed to initialize upload";
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (e) {
        errorMessage = errorText;
      }

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: initResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const uploadUrl = initResponse.headers.get("Location");
    if (!uploadUrl) {
      return new Response(JSON.stringify({ error: "No upload URL received" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Upload URL received, uploading video...");

    // Step 2: Upload the video
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": videoBlob.type || "video/mp4",
        "Content-Length": videoSize.toString(),
      },
      body: videoBlob,
    });

    const uploadResult = await uploadResponse.json();
    console.log("Upload response:", JSON.stringify(uploadResult));

    if (!uploadResponse.ok) {
      const errorMessage = uploadResult.error?.message || "Failed to upload video";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: uploadResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const videoId = uploadResult.id;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Log the upload
    await supabase.from("agent_logs").insert({
      agent_name: "youtube",
      action: "video_uploaded",
      campaign_id: campaign_id || null,
      post_id: post_id || null,
      details: {
        video_id: videoId,
        video_url: videoUrl,
        title: title,
        privacy_status: privacy_status,
        channel_id: connection.metadata?.channel_id,
      },
    });

    // Update post if post_id is provided
    if (post_id) {
      await supabase
        .from("launch_ops_posts")
        .update({
          media_url: videoUrl,
          published_at: new Date().toISOString(),
        })
        .eq("id", post_id);
    }

    return new Response(JSON.stringify({
      success: true,
      video_id: videoId,
      video_url: videoUrl,
      title: title,
      privacy_status: privacy_status,
      message: `Video successfully uploaded to YouTube${privacy_status === "private" ? " (private mode - requires Google API verification for public uploads)" : ""}`,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("YouTube Upload Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
