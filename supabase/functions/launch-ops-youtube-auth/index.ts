import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// YouTube OAuth Configuration
const YOUTUBE_CLIENT_ID = Deno.env.get("YOUTUBE_CLIENT_ID")!;
const YOUTUBE_CLIENT_SECRET = Deno.env.get("YOUTUBE_CLIENT_SECRET")!;
const YOUTUBE_REDIRECT_URI = Deno.env.get("YOUTUBE_REDIRECT_URI") || "https://ryeqbewlmaqewsuvuhlm.supabase.co/functions/v1/launch-ops-youtube-auth";
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "https://launchops-tjvcxusj.manus.space";

// YouTube OAuth Scopes
const YOUTUBE_SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

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

    // Handle OAuth callback (GET request with code)
    if (req.method === "GET" && url.searchParams.has("code")) {
      const code = url.searchParams.get("code")!;
      const state = url.searchParams.get("state")!;

      // Verify state token
      const { data: stateData, error: stateError } = await supabase
        .from("youtube_oauth_states")
        .select("*")
        .eq("state", state)
        .single();

      if (stateError || !stateData) {
        console.error("Invalid state token:", stateError);
        return Response.redirect(`${FRONTEND_URL}/launch-ops/settings?error=invalid_state`, 302);
      }

      // Delete used state token
      await supabase.from("youtube_oauth_states").delete().eq("state", state);

      // Check if state is expired
      if (new Date(stateData.expires_at) < new Date()) {
        return Response.redirect(`${FRONTEND_URL}/launch-ops/settings?error=state_expired`, 302);
      }

      // Exchange code for tokens
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: YOUTUBE_REDIRECT_URI,
          client_id: YOUTUBE_CLIENT_ID,
          client_secret: YOUTUBE_CLIENT_SECRET,
        }),
      });

      const tokenData = await tokenResponse.json();
      console.log("Token exchange response status:", tokenResponse.status);

      if (tokenData.error) {
        console.error("Token exchange error:", tokenData);
        return Response.redirect(`${FRONTEND_URL}/launch-ops/settings?error=${encodeURIComponent(tokenData.error_description || tokenData.error)}`, 302);
      }

      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token;
      const expiresIn = tokenData.expires_in || 3600;

      // Get user info from Google
      const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      let googleUserId = "unknown";
      let googleUserName = "YouTube User";
      let googleEmail = null;
      let googleAvatar = null;

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        console.log("Google UserInfo:", JSON.stringify(userInfo));
        googleUserId = userInfo.id || "unknown";
        googleUserName = userInfo.name || "YouTube User";
        googleEmail = userInfo.email || null;
        googleAvatar = userInfo.picture || null;
      }

      // Get YouTube channel info
      const channelResponse = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&mine=true",
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      let channelId = null;
      let channelTitle = null;
      let channelThumbnail = null;

      if (channelResponse.ok) {
        const channelData = await channelResponse.json();
        console.log("YouTube Channel Data:", JSON.stringify(channelData));
        if (channelData.items && channelData.items.length > 0) {
          const channel = channelData.items[0];
          channelId = channel.id;
          channelTitle = channel.snippet?.title || googleUserName;
          channelThumbnail = channel.snippet?.thumbnails?.default?.url || googleAvatar;
        }
      }

      const tokenExpiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      // Check for existing YouTube connection
      const { data: existingConnection } = await supabase
        .from("social_connections")
        .select("id")
        .eq("user_id", stateData.user_id)
        .eq("platform", "youtube")
        .single();

      const connectionData = {
        platform_user_id: googleUserId,
        platform_username: channelTitle || googleUserName,
        platform_email: googleEmail,
        platform_avatar: channelThumbnail || googleAvatar,
        access_token: accessToken,
        refresh_token: refreshToken,
        token_expires_at: tokenExpiresAt,
        scopes: YOUTUBE_SCOPES,
        connected_at: new Date().toISOString(),
        is_active: true,
        metadata: {
          channel_id: channelId,
          channel_title: channelTitle,
        },
      };

      if (existingConnection) {
        await supabase
          .from("social_connections")
          .update(connectionData)
          .eq("id", existingConnection.id);
      } else {
        await supabase.from("social_connections").insert({
          user_id: stateData.user_id,
          platform: "youtube",
          ...connectionData,
        });
      }

      // Log the connection
      await supabase.from("agent_logs").insert({
        agent_name: "youtube",
        action: "account_connected",
        details: {
          user_id: stateData.user_id,
          channel_id: channelId,
          channel_title: channelTitle,
        },
      });

      return Response.redirect(`${FRONTEND_URL}/launch-ops/settings?youtube_connected=true`, 302);
    }

    // Handle POST requests for actions
    if (req.method === "POST") {
      const body = await req.json();
      const postAction = body.action;
      const userId = body.user_id;

      // Get authorization URL
      if (postAction === "get_auth_url") {
        const stateToken = crypto.randomUUID();

        // Ensure youtube_oauth_states table exists and store state
        await supabase.from("youtube_oauth_states").insert({
          state: stateToken,
          user_id: userId,
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        });

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${YOUTUBE_CLIENT_ID}` +
          `&redirect_uri=${encodeURIComponent(YOUTUBE_REDIRECT_URI)}` +
          `&response_type=code` +
          `&scope=${encodeURIComponent(YOUTUBE_SCOPES.join(" "))}` +
          `&access_type=offline` +
          `&prompt=consent` +
          `&state=${stateToken}`;

        return new Response(JSON.stringify({ auth_url: authUrl }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Check connection status
      if (postAction === "check_status") {
        const { data: connection, error } = await supabase
          .from("social_connections")
          .select("*")
          .eq("user_id", userId)
          .eq("platform", "youtube")
          .eq("is_active", true)
          .single();

        if (error || !connection) {
          return new Response(JSON.stringify({ connected: false }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Check if token is expired
        const isExpired = new Date(connection.token_expires_at) < new Date();

        return new Response(JSON.stringify({
          connected: true,
          user_name: connection.platform_username,
          user_email: connection.platform_email,
          user_avatar: connection.platform_avatar,
          channel_id: connection.metadata?.channel_id,
          channel_title: connection.metadata?.channel_title,
          expires_at: connection.token_expires_at,
          is_expired: isExpired,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Refresh access token
      if (postAction === "refresh_token") {
        const { data: connection, error } = await supabase
          .from("social_connections")
          .select("*")
          .eq("user_id", userId)
          .eq("platform", "youtube")
          .eq("is_active", true)
          .single();

        if (error || !connection || !connection.refresh_token) {
          return new Response(JSON.stringify({ error: "No refresh token available" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
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
          return new Response(JSON.stringify({ error: refreshData.error_description || refreshData.error }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
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

        return new Response(JSON.stringify({
          success: true,
          expires_at: newExpiresAt,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Disconnect YouTube account
      if (postAction === "disconnect") {
        await supabase
          .from("social_connections")
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .eq("user_id", userId)
          .eq("platform", "youtube");

        await supabase.from("agent_logs").insert({
          agent_name: "youtube",
          action: "account_disconnected",
          details: { user_id: userId },
        });

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle GET request for authorize action (redirect to Google)
    if (req.method === "GET" && action === "authorize") {
      const state = url.searchParams.get("state");
      if (!state) {
        return new Response(JSON.stringify({ error: "Missing state parameter" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${YOUTUBE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(YOUTUBE_REDIRECT_URI)}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent(YOUTUBE_SCOPES.join(" "))}` +
        `&access_type=offline` +
        `&prompt=consent` +
        `&state=${state}`;

      return Response.redirect(authUrl, 302);
    }

    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("YouTube Auth Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
