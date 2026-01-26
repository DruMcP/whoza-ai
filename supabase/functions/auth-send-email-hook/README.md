# Auth Send Email Hook

This Edge Function is a Supabase Auth Hook that intercepts all authentication emails and sends them via Resend API instead of SMTP.

## Purpose

Replaces the default Supabase SMTP email delivery with Resend API for reliable email delivery and professional branding.

## Email Types Handled

- **signup**: Email confirmation for new user signups
- **recovery**: Password reset emails
- **magic_link**: Magic link authentication
- **email_change**: Email address change confirmation
- **invite**: User invitations

## Configuration

### Environment Variables

- `RESEND_API_KEY`: Resend API key for sending emails
- `SEND_EMAIL_HOOK_SECRET`: Webhook secret for verifying requests from Supabase Auth

### Supabase Dashboard Setup

1. Navigate to: Authentication > Auth Hooks > Send Email
2. Enable the hook
3. Set the endpoint URL to this function
4. Configure the webhook secret

## Deployment

```bash
npx supabase functions deploy auth-send-email-hook --no-verify-jwt
```

Note: The `--no-verify-jwt` flag is required because this function is called by Supabase Auth, not by authenticated users.

## Features

- ✅ Webhook signature verification for security
- ✅ Professional HTML email templates with Whoza.ai branding
- ✅ Plain text fallback for all emails
- ✅ Comprehensive error handling and logging
- ✅ Support for all Supabase Auth email types

## Testing

Test the function by triggering any auth action (password reset, signup, etc.) on the platform. Check Resend dashboard for delivery confirmation.
