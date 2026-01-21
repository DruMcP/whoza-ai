import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// YouTube API Configuration
const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY")!;
const YOUTUBE_CLIENT_ID = Deno.env.get("YOUTUBE_CLIENT_ID")!;
const YOUTUBE_CLIENT_SECRET = Deno.env.get("YOUTUBE_CLIENT_SECRET")!;

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  published_at: string;
  duration: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  tags: string[];
}

interface ContentSuggestion {
  video_id: string;
  video_title: string;
  suggestion_type: "short_clip" | "quote_card" | "behind_scenes" | "highlight_reel" | "tutorial_snippet";
  suggested_content: string;
  target_platforms: string[];
  estimated_engagement: "low" | "medium" | "high";
}

// Helper function to parse ISO 8601 duration
function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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

// Generate content repurposing suggestions based on video data
function generateSuggestions(videos: VideoItem[], maxSuggestions: number = 5): ContentSuggestion[] {
  const suggestions: ContentSuggestion[] = [];
  
  // Sort videos by engagement (views + likes)
  const sortedVideos = [...videos].sort((a, b) => 
    (b.view_count + b.like_count * 10) - (a.view_count + a.like_count * 10)
  );

  for (const video of sortedVideos.slice(0, maxSuggestions)) {
    // Determine suggestion type based on video characteristics
    const durationParts = video.duration.split(":").map(Number);
    const totalSeconds = durationParts.length === 3 
      ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
      : durationParts[0] * 60 + durationParts[1];

    let suggestionType: ContentSuggestion["suggestion_type"];
    let suggestedContent: string;
    let targetPlatforms: string[];
    let estimatedEngagement: ContentSuggestion["estimated_engagement"];

    // Determine engagement level
    if (video.view_count > 10000 || video.like_count > 500) {
      estimatedEngagement = "high";
    } else if (video.view_count > 1000 || video.like_count > 50) {
      estimatedEngagement = "medium";
    } else {
      estimatedEngagement = "low";
    }

    // Generate suggestion based on video type
    if (totalSeconds > 600) { // Long videos (>10 min)
      suggestionType = "short_clip";
      suggestedContent = `Extract 3-5 key moments from "${video.title}" to create engaging short-form content. Focus on the most impactful statements or demonstrations.`;
      targetPlatforms = ["instagram", "youtube_shorts", "tiktok"];
    } else if (totalSeconds > 180) { // Medium videos (3-10 min)
      suggestionType = "highlight_reel";
      suggestedContent = `Create a 60-second highlight reel from "${video.title}" showcasing the main value proposition and call-to-action.`;
      targetPlatforms = ["instagram", "linkedin", "twitter"];
    } else if (video.description.toLowerCase().includes("how to") || video.description.toLowerCase().includes("tutorial")) {
      suggestionType = "tutorial_snippet";
      suggestedContent = `Break down "${video.title}" into step-by-step carousel posts or quick tip videos for each platform.`;
      targetPlatforms = ["instagram", "linkedin", "twitter"];
    } else {
      suggestionType = "quote_card";
      suggestedContent = `Extract key quotes or insights from "${video.title}" to create shareable quote cards with your branding.`;
      targetPlatforms = ["instagram", "linkedin", "twitter"];
    }

    suggestions.push({
      video_id: video.id,
      video_title: video.title,
      suggestion_type: suggestionType,
      suggested_content: suggestedContent,
      target_platforms: targetPlatforms,
      estimated_engagement: estimatedEngagement,
    });
  }

  return suggestions;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    // List channel videos (public data - uses API key)
    if (action === "list") {
      const channelId = url.searchParams.get("channel_id");
      const maxResults = parseInt(url.searchParams.get("max_results") || "10");

      if (!channelId) {
        return new Response(JSON.stringify({ error: "channel_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get channel's uploads playlist
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
      );

      const channelData = await channelResponse.json();
      
      if (!channelData.items || channelData.items.length === 0) {
        return new Response(JSON.stringify({ error: "Channel not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

      // Get videos from uploads playlist
      const playlistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
      );

      const playlistData = await playlistResponse.json();

      if (!playlistData.items) {
        return new Response(JSON.stringify({ videos: [], total: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get video IDs for detailed info
      const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(",");

      // Get detailed video statistics
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );

      const videosData = await videosResponse.json();

      const videos: VideoItem[] = videosData.items.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        published_at: video.snippet.publishedAt,
        duration: parseDuration(video.contentDetails.duration),
        view_count: parseInt(video.statistics.viewCount || "0"),
        like_count: parseInt(video.statistics.likeCount || "0"),
        comment_count: parseInt(video.statistics.commentCount || "0"),
        tags: video.snippet.tags || [],
      }));

      return new Response(JSON.stringify({
        videos: videos,
        total: playlistData.pageInfo.totalResults,
        next_page_token: playlistData.nextPageToken || null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get single video details
    if (action === "video") {
      const videoId = url.searchParams.get("video_id");

      if (!videoId) {
        return new Response(JSON.stringify({ error: "video_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
      );

      const videoData = await videoResponse.json();

      if (!videoData.items || videoData.items.length === 0) {
        return new Response(JSON.stringify({ error: "Video not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const video = videoData.items[0];

      return new Response(JSON.stringify({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        published_at: video.snippet.publishedAt,
        duration: parseDuration(video.contentDetails.duration),
        view_count: parseInt(video.statistics.viewCount || "0"),
        like_count: parseInt(video.statistics.likeCount || "0"),
        comment_count: parseInt(video.statistics.commentCount || "0"),
        tags: video.snippet.tags || [],
        channel_id: video.snippet.channelId,
        channel_title: video.snippet.channelTitle,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Search channel videos
    if (action === "search") {
      const query = url.searchParams.get("q");
      const channelId = url.searchParams.get("channel_id");
      const maxResults = parseInt(url.searchParams.get("max_results") || "10");

      if (!query) {
        return new Response(JSON.stringify({ error: "q (query) is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      let searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
      
      if (channelId) {
        searchUrl += `&channelId=${channelId}`;
      }

      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (!searchData.items) {
        return new Response(JSON.stringify({ videos: [], total: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get video IDs for detailed info
      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",");

      // Get detailed video statistics
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );

      const videosData = await videosResponse.json();

      const videos: VideoItem[] = videosData.items.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        published_at: video.snippet.publishedAt,
        duration: parseDuration(video.contentDetails.duration),
        view_count: parseInt(video.statistics.viewCount || "0"),
        like_count: parseInt(video.statistics.likeCount || "0"),
        comment_count: parseInt(video.statistics.commentCount || "0"),
        tags: video.snippet.tags || [],
      }));

      return new Response(JSON.stringify({
        videos: videos,
        total: searchData.pageInfo.totalResults,
        next_page_token: searchData.nextPageToken || null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate content repurposing suggestions (POST request)
    if (req.method === "POST" && action === "suggest") {
      const body = await req.json();
      const { channel_id, max_suggestions = 5, user_id } = body;

      if (!channel_id) {
        return new Response(JSON.stringify({ error: "channel_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get channel's uploads playlist
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&id=${channel_id}&key=${YOUTUBE_API_KEY}`
      );

      const channelData = await channelResponse.json();
      
      if (!channelData.items || channelData.items.length === 0) {
        return new Response(JSON.stringify({ error: "Channel not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
      const channelTitle = channelData.items[0].snippet.title;

      // Get recent videos
      const playlistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=20&key=${YOUTUBE_API_KEY}`
      );

      const playlistData = await playlistResponse.json();

      if (!playlistData.items || playlistData.items.length === 0) {
        return new Response(JSON.stringify({ 
          suggestions: [],
          message: "No videos found in channel" 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get video IDs for detailed info
      const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(",");

      // Get detailed video statistics
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );

      const videosData = await videosResponse.json();

      const videos: VideoItem[] = videosData.items.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        published_at: video.snippet.publishedAt,
        duration: parseDuration(video.contentDetails.duration),
        view_count: parseInt(video.statistics.viewCount || "0"),
        like_count: parseInt(video.statistics.likeCount || "0"),
        comment_count: parseInt(video.statistics.commentCount || "0"),
        tags: video.snippet.tags || [],
      }));

      // Generate suggestions
      const suggestions = generateSuggestions(videos, max_suggestions);

      // Log the suggestion request
      if (user_id) {
        await supabase.from("agent_logs").insert({
          agent_name: "youtube",
          action: "content_suggestions_generated",
          details: {
            user_id: user_id,
            channel_id: channel_id,
            channel_title: channelTitle,
            suggestions_count: suggestions.length,
          },
        });
      }

      return new Response(JSON.stringify({
        channel_id: channel_id,
        channel_title: channelTitle,
        suggestions: suggestions,
        analyzed_videos: videos.length,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get user's own channel videos (requires authentication)
    if (req.method === "POST" && action === "my_videos") {
      const body = await req.json();
      const { user_id, max_results = 10 } = body;

      if (!user_id) {
        return new Response(JSON.stringify({ error: "user_id is required" }), {
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

      // Get valid access token
      const accessToken = await getValidAccessToken(supabase, connection);
      if (!accessToken) {
        return new Response(JSON.stringify({ 
          error: "YouTube token expired. Please reconnect your account." 
        }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get user's channel
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&mine=true`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      const channelData = await channelResponse.json();

      if (!channelData.items || channelData.items.length === 0) {
        return new Response(JSON.stringify({ error: "No YouTube channel found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
      const channelTitle = channelData.items[0].snippet.title;
      const channelId = channelData.items[0].id;

      // Get videos from uploads playlist
      const playlistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${max_results}`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      const playlistData = await playlistResponse.json();

      if (!playlistData.items || playlistData.items.length === 0) {
        return new Response(JSON.stringify({ 
          videos: [],
          channel_id: channelId,
          channel_title: channelTitle,
          total: 0 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get video IDs for detailed info
      const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(",");

      // Get detailed video statistics
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      const videosData = await videosResponse.json();

      const videos: VideoItem[] = videosData.items.map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
        published_at: video.snippet.publishedAt,
        duration: parseDuration(video.contentDetails.duration),
        view_count: parseInt(video.statistics.viewCount || "0"),
        like_count: parseInt(video.statistics.likeCount || "0"),
        comment_count: parseInt(video.statistics.commentCount || "0"),
        tags: video.snippet.tags || [],
      }));

      return new Response(JSON.stringify({
        videos: videos,
        channel_id: channelId,
        channel_title: channelTitle,
        total: playlistData.pageInfo.totalResults,
        next_page_token: playlistData.nextPageToken || null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("YouTube Content Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
