/**
 * Auth Send Email Hook
 * 
 * This Edge Function is called by Supabase Auth whenever an authentication email needs to be sent.
 * It replaces the default SMTP email sending and routes all emails through Resend API.
 * 
 * Handles all auth email types:
 * - signup: Email confirmation for new signups
 * - recovery: Password reset emails
 * - email_change: Email address change confirmation
 * - magic_link: Magic link authentication
 * - invite: User invitations
 */

import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);
const hookSecret = (Deno.env.get("SEND_EMAIL_HOOK_SECRET") as string)?.replace("v1,whsec_", "") || "";

interface AuthHookPayload {
  user: {
    id: string;
    email: string;
    email_confirmed_at?: string;
    user_metadata?: Record<string, any>;
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: "signup" | "recovery" | "email_change" | "magic_link" | "invite";
    site_url: string;
    token_new?: string;
    token_hash_new?: string;
  };
}

Deno.serve(async (req) => {
  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Verify webhook signature
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers);
    const wh = new Webhook(hookSecret);
    
    const { user, email_data } = wh.verify(payload, headers) as AuthHookPayload;

    console.log(`Auth email hook triggered: ${email_data.email_action_type} for ${user.email}`);

    // Determine email subject and content based on action type
    let subject: string;
    let htmlContent: string;
    let textContent: string;

    switch (email_data.email_action_type) {
      case "recovery":
        // Password reset email
        subject = "Reset Your Password - Whoza.ai";
        const resetUrl = `${email_data.site_url}/reset-password?token_hash=${email_data.token_hash}&type=recovery`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Reset Your Password</h1>
            </div>
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
              <p style="font-size: 16px; margin-bottom: 20px;">We received a request to reset your password for your Whoza.ai account.</p>
              <p style="font-size: 16px; margin-bottom: 30px;">Click the button below to reset your password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">Reset Password</a>
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 30px;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 14px; color: #667eea; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px;">${resetUrl}</p>
              <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.</p>
              <p style="font-size: 14px; color: #666; margin-top: 20px;">Best regards,<br>The Whoza.ai Team</p>
            </div>
          </body>
          </html>
        `;
        textContent = `Reset Your Password - Whoza.ai\n\nHi there,\n\nWe received a request to reset your password for your Whoza.ai account.\n\nClick the link below to reset your password:\n${resetUrl}\n\nIf you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.\n\nBest regards,\nThe Whoza.ai Team`;
        break;

      case "signup":
        // Email confirmation for new signups
        subject = "Confirm Your Email - Whoza.ai";
        const confirmUrl = `${email_data.site_url}/auth/confirm?token_hash=${email_data.token_hash}&type=signup`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Whoza.ai!</h1>
            </div>
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
              <p style="font-size: 16px; margin-bottom: 20px;">Thank you for signing up for Whoza.ai! We're excited to have you on board.</p>
              <p style="font-size: 16px; margin-bottom: 30px;">Please confirm your email address by clicking the button below:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${confirmUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">Confirm Email</a>
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 30px;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 14px; color: #667eea; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px;">${confirmUrl}</p>
              <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">If you didn't create this account, you can safely ignore this email.</p>
              <p style="font-size: 14px; color: #666; margin-top: 20px;">Best regards,<br>The Whoza.ai Team</p>
            </div>
          </body>
          </html>
        `;
        textContent = `Welcome to Whoza.ai!\n\nHi there,\n\nThank you for signing up for Whoza.ai! We're excited to have you on board.\n\nPlease confirm your email address by clicking the link below:\n${confirmUrl}\n\nIf you didn't create this account, you can safely ignore this email.\n\nBest regards,\nThe Whoza.ai Team`;
        break;

      case "magic_link":
        // Magic link authentication
        subject = "Your Magic Link - Whoza.ai";
        const magicLinkUrl = `${email_data.site_url}/auth/confirm?token_hash=${email_data.token_hash}&type=magiclink`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Sign In to Whoza.ai</h1>
            </div>
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
              <p style="font-size: 16px; margin-bottom: 30px;">Click the button below to sign in to your Whoza.ai account:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${magicLinkUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">Sign In</a>
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 30px;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 14px; color: #667eea; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px;">${magicLinkUrl}</p>
              <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">If you didn't request this sign-in link, you can safely ignore this email.</p>
              <p style="font-size: 14px; color: #666; margin-top: 20px;">Best regards,<br>The Whoza.ai Team</p>
            </div>
          </body>
          </html>
        `;
        textContent = `Sign In to Whoza.ai\n\nHi there,\n\nClick the link below to sign in to your Whoza.ai account:\n${magicLinkUrl}\n\nIf you didn't request this sign-in link, you can safely ignore this email.\n\nBest regards,\nThe Whoza.ai Team`;
        break;

      case "email_change":
        // Email address change confirmation
        subject = "Confirm Your New Email - Whoza.ai";
        const emailChangeUrl = `${email_data.site_url}/auth/confirm?token_hash=${email_data.token_hash}&type=email_change`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Confirm Email Change</h1>
            </div>
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
              <p style="font-size: 16px; margin-bottom: 20px;">We received a request to change your email address for your Whoza.ai account.</p>
              <p style="font-size: 16px; margin-bottom: 30px;">Click the button below to confirm this change:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${emailChangeUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">Confirm Email Change</a>
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 30px;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 14px; color: #667eea; word-break: break-all; background: #f5f5f5; padding: 10px; border-radius: 5px;">${emailChangeUrl}</p>
              <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">If you didn't request this email change, please contact support immediately.</p>
              <p style="font-size: 14px; color: #666; margin-top: 20px;">Best regards,<br>The Whoza.ai Team</p>
            </div>
          </body>
          </html>
        `;
        textContent = `Confirm Email Change - Whoza.ai\n\nHi there,\n\nWe received a request to change your email address for your Whoza.ai account.\n\nClick the link below to confirm this change:\n${emailChangeUrl}\n\nIf you didn't request this email change, please contact support immediately.\n\nBest regards,\nThe Whoza.ai Team`;
        break;

      default:
        throw new Error(`Unsupported email action type: ${email_data.email_action_type}`);
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: "Whoza.ai <noreply@whoza.ai>",
      to: [user.email],
      subject: subject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error(`Failed to send ${email_data.email_action_type} email to ${user.email}:`, error);
      throw error;
    }

    console.log(`Successfully sent ${email_data.email_action_type} email to ${user.email}`);

    // Return success response
    return new Response(
      JSON.stringify({}),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in auth-send-email-hook:", error);
    
    return new Response(
      JSON.stringify({
        error: {
          http_code: error.code || 500,
          message: error.message || "Internal server error",
        },
      }),
      {
        status: error.code || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
