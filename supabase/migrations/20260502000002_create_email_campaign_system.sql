/*
  # Email Campaign and Onboarding System

  ## Overview
  Creates a comprehensive email automation system for onboarding new users with welcome emails
  and educational drip campaigns about local SEO and AI search visibility.

  ## New Tables

  ### `email_templates`
  - `id` (uuid, primary key) - Unique template identifier
  - `name` (text, unique) - Template name/identifier
  - `subject` (text) - Email subject line
  - `html_content` (text) - HTML email content
  - `text_content` (text) - Plain text fallback
  - `category` (text) - Template category (welcome, educational, task, etc.)
  - `variables` (jsonb) - Available variables for template
  - `is_active` (boolean) - Whether template is active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `email_campaigns`
  - `id` (uuid, primary key) - Campaign identifier
  - `name` (text, unique) - Campaign name
  - `description` (text) - Campaign description
  - `trigger_event` (text) - What triggers this campaign (signup, baseline_complete, etc.)
  - `is_active` (boolean) - Whether campaign is active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `campaign_emails`
  - `id` (uuid, primary key) - Campaign email identifier
  - `campaign_id` (uuid) - Reference to campaign
  - `template_id` (uuid) - Reference to email template
  - `sequence_order` (integer) - Order in sequence (1, 2, 3, etc.)
  - `delay_days` (integer) - Days to wait after previous email (0 for immediate)
  - `delay_hours` (integer) - Additional hours to wait
  - `is_active` (boolean) - Whether this email is active
  - `created_at` (timestamptz) - Creation timestamp

  ### `email_logs`
  - `id` (uuid, primary key) - Log entry identifier
  - `user_id` (uuid) - User who received email
  - `template_id` (uuid) - Template that was sent
  - `campaign_id` (uuid, nullable) - Campaign this email belongs to
  - `subject` (text) - Subject line sent
  - `recipient_email` (text) - Email address
  - `status` (text) - sent, failed, bounced, opened, clicked
  - `sent_at` (timestamptz) - When email was sent
  - `opened_at` (timestamptz, nullable) - When email was opened
  - `clicked_at` (timestamptz, nullable) - When link was clicked
  - `error_message` (text, nullable) - Error if failed
  - `metadata` (jsonb) - Additional tracking data
  - `created_at` (timestamptz) - Creation timestamp

  ### `user_campaign_progress`
  - `id` (uuid, primary key) - Progress tracker identifier
  - `user_id` (uuid) - User in campaign
  - `campaign_id` (uuid) - Active campaign
  - `current_sequence` (integer) - Current position in sequence
  - `started_at` (timestamptz) - When campaign started
  - `next_email_at` (timestamptz, nullable) - When next email should be sent
  - `completed_at` (timestamptz, nullable) - When campaign completed
  - `paused` (boolean) - Whether campaign is paused
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Only admins can manage templates and campaigns
  - Users can view their own email logs
*/

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  subject text NOT NULL,
  html_content text NOT NULL,
  text_content text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  variables jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage email templates"
  ON email_templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create email_campaigns table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  trigger_event text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage email campaigns"
  ON email_campaigns FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create campaign_emails table
CREATE TABLE IF NOT EXISTS campaign_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
  template_id uuid NOT NULL REFERENCES email_templates(id) ON DELETE CASCADE,
  sequence_order integer NOT NULL,
  delay_days integer DEFAULT 0,
  delay_hours integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(campaign_id, sequence_order)
);

ALTER TABLE campaign_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage campaign emails"
  ON campaign_emails FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id uuid REFERENCES email_templates(id) ON DELETE SET NULL,
  campaign_id uuid REFERENCES email_campaigns(id) ON DELETE SET NULL,
  subject text NOT NULL,
  recipient_email text NOT NULL,
  status text DEFAULT 'sent',
  sent_at timestamptz DEFAULT now(),
  opened_at timestamptz,
  clicked_at timestamptz,
  error_message text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admin can manage email logs"
  ON email_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_campaign_progress table
CREATE TABLE IF NOT EXISTS user_campaign_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_id uuid NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
  current_sequence integer DEFAULT 1,
  started_at timestamptz DEFAULT now(),
  next_email_at timestamptz,
  completed_at timestamptz,
  paused boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, campaign_id)
);

ALTER TABLE user_campaign_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own campaign progress"
  ON user_campaign_progress FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage campaign progress"
  ON user_campaign_progress FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_logs_user ON email_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status, sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaign_emails_campaign ON campaign_emails(campaign_id, sequence_order);
CREATE INDEX IF NOT EXISTS idx_user_campaign_progress_next_email ON user_campaign_progress(next_email_at) WHERE completed_at IS NULL AND paused = false;
CREATE INDEX IF NOT EXISTS idx_user_campaign_progress_user ON user_campaign_progress(user_id);

-- Insert welcome and educational email templates
INSERT INTO email_templates (name, subject, html_content, text_content, category, variables) VALUES
(
  'welcome_signup',
  'Welcome to whoza.ai — Your AI Visibility Journey Starts Now',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to whoza.ai</title>
  <style type="text/css">
    /* Reset */
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    /* Responsive */
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 24px !important; }
      .header { padding: 32px 24px !important; }
      .footer { padding: 32px 24px !important; }
      .heading { font-size: 24px !important; }
      .subheading { font-size: 18px !important; }
      .stat-number { font-size: 40px !important; }
      .button { padding: 14px 32px !important; font-size: 15px !important; }
      .two-col { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:''Segoe UI'', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header with Logo -->
          <tr>
            <td class="header" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); padding:40px 40px 32px 40px; text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <div style="background-color:rgba(255,255,255,0.15); border-radius:50%; width:64px; height:64px; display:inline-block; line-height:64px; text-align:center;">
                      <span style="color:#ffffff; font-size:28px; font-weight:700; font-family:Georgia, serif;">w.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 class="heading" style="color:#ffffff; margin:0; font-size:28px; font-weight:700; letter-spacing:-0.5px;">Welcome to whoza.ai</h1>
                    <p style="color:rgba(255,255,255,0.85); margin:10px 0 0 0; font-size:16px; font-weight:400;">Your AI Visibility Journey Starts Now</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="content" style="padding:40px 40px 24px 40px;">
              <p style="font-size:17px; line-height:1.7; color:#1f2937; margin:0 0 24px 0; font-weight:500;">Hi {{business_name}},</p>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:0 0 24px 0;">
                Welcome aboard! We''re excited to help you dominate AI-powered search results and get found by customers using ChatGPT, Google AI Overviews, and Perplexity.
              </p>

              <!-- What Happens Next Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafb; border-radius:10px; margin:28px 0; border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:28px;">
                    <h2 class="subheading" style="color:#00857d; font-size:20px; margin:0 0 20px 0; font-weight:700;">What Happens Next?</h2>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
                      <tr>
                        <td class="two-col" width="40" valign="top" style="padding-right:16px;">
                          <div style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; width:36px; height:36px; border-radius:50%; text-align:center; line-height:36px; font-size:16px; font-weight:700;">1</div>
                        </td>
                        <td class="two-col" valign="top">
                          <p style="margin:0 0 4px 0; font-size:15px; font-weight:700; color:#1f2937;">Baseline Assessment</p>
                          <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">24-48 hours — we''ll analyze your current online presence across all AI search platforms.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
                      <tr>
                        <td class="two-col" width="40" valign="top" style="padding-right:16px;">
                          <div style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; width:36px; height:36px; border-radius:50%; text-align:center; line-height:36px; font-size:16px; font-weight:700;">2</div>
                        </td>
                        <td class="two-col" valign="top">
                          <p style="margin:0 0 4px 0; font-size:15px; font-weight:700; color:#1f2937;">Your First Weekly Task</p>
                          <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">A personalised, 15-minute action designed to boost your AI visibility. No technical expertise required.</p>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="two-col" width="40" valign="top" style="padding-right:16px;">
                          <div style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; width:36px; height:36px; border-radius:50%; text-align:center; line-height:36px; font-size:16px; font-weight:700;">3</div>
                        </td>
                        <td class="two-col" valign="top">
                          <p style="margin:0 0 4px 0; font-size:15px; font-weight:700; color:#1f2937;">Continuous Improvement</p>
                          <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">Every week, a new task specifically designed to improve your rankings in AI search results.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:24px 0;">
                Over the next few days, we''ll send you valuable insights about AI search visibility to help you understand why this matters for your business.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0;">
                <tr>
                  <td align="center">
                    <a href="{{portal_url}}" class="button" style="display:inline-block; background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; text-decoration:none; padding:16px 44px; border-radius:8px; font-weight:700; font-size:16px; letter-spacing:0.3px; box-shadow:0 4px 12px rgba(0,133,125,0.25);">
                      Go to Your Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:15px; line-height:1.6; color:#9ca3af; margin:24px 0 0 0; padding-top:24px; border-top:1px solid #f3f4f6;">
                Have questions? Just reply to this email — we''re here to help.
              </p>

              <!-- Signature -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
                <tr>
                  <td>
                    <p style="font-size:16px; line-height:1.7; color:#374151; margin:0;">
                      Best regards,<br>
                      <strong style="color:#00857d;">The whoza.ai Team</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer" style="background:linear-gradient(135deg, #004d47 0%, #003b36 100%); padding:40px 40px 32px 40px; text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <div style="background-color:rgba(255,255,255,0.1); border-radius:50%; width:48px; height:48px; display:inline-block; line-height:48px; text-align:center;">
                      <span style="color:#ffffff; font-size:20px; font-weight:700; font-family:Georgia, serif;">w.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <p style="color:#ffffff; margin:0 0 6px 0; font-size:16px; font-weight:700;">whoza.ai</p>
                    <p style="color:rgba(255,255,255,0.6); margin:0; font-size:13px;">AI-Powered Visibility for Local Tradespeople</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="https://twitter.com/whozadotai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">𝕏</a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://linkedin.com/company/whoza-ai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">in</a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://instagram.com/whozadotai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">ig</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="color:rgba(255,255,255,0.4); margin:0 0 8px 0; font-size:12px;">
                      <a href="{{portal_url}}/privacy" style="color:rgba(255,255,255,0.5); text-decoration:none;">Privacy Policy</a> &nbsp;&bull;&nbsp;
                      <a href="{{portal_url}}/terms" style="color:rgba(255,255,255,0.5); text-decoration:none;">Terms of Service</a> &nbsp;&bull;&nbsp;
                      <a href="{{unsubscribe_url}}" style="color:rgba(255,255,255,0.5); text-decoration:none;">Unsubscribe</a>
                    </p>
                    <p style="color:rgba(255,255,255,0.3); margin:0; font-size:11px;">
                      &copy; 2026 whoza.ai. All rights reserved.<br>
                      You received this because you signed up at whoza.ai
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>',
  'Hi {{business_name}},

Welcome aboard! We''re excited to help you dominate AI-powered search results and get found by customers using ChatGPT, Google AI Overviews, and Perplexity.

WHAT HAPPENS NEXT?

1. BASELINE ASSESSMENT (24-48 hours)
We''ll analyse your current online presence across all AI search platforms to establish your starting point.

2. YOUR FIRST WEEKLY TASK
You''ll receive a personalised, 15-minute action designed to boost your AI visibility. No technical expertise required!

3. CONTINUOUS IMPROVEMENT
Every week, you''ll get a new task specifically designed to improve your rankings in AI search results.

Over the next few days, we''ll send you valuable insights about AI search visibility to help you understand why this matters for your business.

Go to Your Dashboard: {{portal_url}}

Have questions? Just reply to this email — we''re here to help.

Best regards,
The whoza.ai Team

---
whoza.ai | AI-Powered Visibility for Local Tradespeople
{{portal_url}} | Privacy Policy: {{portal_url}}/privacy | Unsubscribe: {{unsubscribe_url}}',
  'welcome',
  '["business_name", "portal_url", "unsubscribe_url"]'
),
(
  'educational_day2',
  'Why AI Search Matters for Local Tradespeople',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Why AI Search Matters</title>
  <style type="text/css">
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 24px !important; }
      .header { padding: 32px 24px !important; }
      .footer { padding: 32px 24px !important; }
      .heading { font-size: 24px !important; }
      .subheading { font-size: 18px !important; }
      .stat-number { font-size: 40px !important; }
      .two-col { display: block !important; width: 100% !important; }
      .stat-card { padding: 24px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:''Segoe UI'', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td class="header" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); padding:32px 40px; text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <div style="background-color:rgba(255,255,255,0.15); border-radius:50%; width:48px; height:48px; display:inline-block; line-height:48px; text-align:center;">
                      <span style="color:#ffffff; font-size:20px; font-weight:700; font-family:Georgia, serif;">w.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="color:rgba(255,255,255,0.8); margin:0; font-size:13px; text-transform:uppercase; letter-spacing:1.5px; font-weight:600;">whoza.ai Insights</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="padding:40px 40px 24px 40px;">
              <h1 class="heading" style="color:#1f2937; font-size:26px; margin:0 0 20px 0; font-weight:700; letter-spacing:-0.5px; line-height:1.3;">The AI Search Revolution: What It Means for Your Business</h1>

              <p style="font-size:17px; line-height:1.7; color:#1f2937; margin:0 0 20px 0; font-weight:500;">Hi {{business_name}},</p>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:0 0 24px 0;">
                Something big is happening in how people find local tradespeople — and it''s happening right now.
              </p>

              <!-- Stat Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
                <tr>
                  <td class="stat-card" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); padding:32px; border-radius:12px; text-align:center;">
                    <p style="font-size:13px; color:rgba(255,255,255,0.8); margin:0 0 8px 0; text-transform:uppercase; letter-spacing:1.5px; font-weight:600;">Did You Know?</p>
                    <p class="stat-number" style="font-size:52px; color:#ffffff; margin:0; font-weight:800; letter-spacing:-1px;">43%</p>
                    <p style="font-size:15px; color:rgba(255,255,255,0.9); margin:8px 0 0 0; line-height:1.5;">of people now use AI assistants like ChatGPT and Google AI to find local services</p>
                  </td>
                </tr>
              </table>

              <h2 class="subheading" style="color:#00857d; font-size:20px; margin:32px 0 18px 0; font-weight:700;">Here''s What''s Changing</h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td class="two-col" width="40" valign="top" style="padding-right:16px;">
                    <div style="background-color:#ecfdf5; color:#00857d; width:36px; height:36px; border-radius:50%; text-align:center; line-height:36px; font-size:16px;">🔍</div>
                  </td>
                  <td class="two-col" valign="top">
                    <p style="margin:0 0 4px 0; font-size:15px; font-weight:700; color:#1f2937;">Traditional Search vs AI Search</p>
                    <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">When someone Googles "electrician near me," they see 10 blue links. When they ask ChatGPT, they get ONE recommendation — and it needs to be yours.</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td class="two-col" width="40" valign="top" style="padding-right:16px;">
                    <div style="background-color:#ecfdf5; color:#00857d; width:36px; height:36px; border-radius:50%; text-align:center; line-height:36px; font-size:16px;">💬</div>
                  </td>
                  <td class="two-col" valign="top">
                    <p style="margin:0 0 4px 0; font-size:15px; font-weight:700; color:#1f2937;">How People Actually Ask</p>
                    <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">Instead of searching for "plumber London," they''re now asking "Who''s the most reliable plumber in East London for emergency repairs?" AI gives them specific answers.</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td class="two-col" width="40" valign="top" style="padding-right:16px;">
                    <div style="background-color:#ecfdf5; color:#00857d; width:36px; height:36px; border-radius:50%; text-align:center; line-height:36px; font-size:16px;">🎯</div>
                  </td>
                  <td class="two-col" valign="top">
                    <p style="margin:0 0 4px 0; font-size:15px; font-weight:700; color:#1f2937;">The Winner Takes All</p>
                    <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">AI platforms typically recommend just 1-3 businesses. If you''re not in that list, you''re invisible to potential customers using these tools.</p>
                  </td>
                </tr>
              </table>

              <!-- Good News Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdf4; border-radius:10px; margin:28px 0; border:1px solid #d1fae5;">
                <tr>
                  <td style="padding:24px;">
                    <h3 style="color:#059669; font-size:17px; margin:0 0 10px 0; font-weight:700;">🎉 The Good News</h3>
                    <p style="font-size:15px; line-height:1.7; color:#374151; margin:0;">
                      Most of your competitors don''t even know this is happening yet. That means there''s a massive opportunity for early movers to dominate their local market in AI search results.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:24px 0;">
                Tomorrow, I''ll share the exact signals that AI platforms look for when deciding which businesses to recommend — and how you can optimise for them.
              </p>

              <!-- Signature -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px; padding-top:24px; border-top:1px solid #f3f4f6;">
                <tr>
                  <td>
                    <p style="font-size:16px; line-height:1.7; color:#374151; margin:0;">
                      To your success,<br>
                      <strong style="color:#00857d;">The whoza.ai Team</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer" style="background:linear-gradient(135deg, #004d47 0%, #003b36 100%); padding:40px 40px 32px 40px; text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <div style="background-color:rgba(255,255,255,0.1); border-radius:50%; width:48px; height:48px; display:inline-block; line-height:48px; text-align:center;">
                      <span style="color:#ffffff; font-size:20px; font-weight:700; font-family:Georgia, serif;">w.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <p style="color:#ffffff; margin:0 0 6px 0; font-size:16px; font-weight:700;">whoza.ai</p>
                    <p style="color:rgba(255,255,255,0.6); margin:0; font-size:13px;">AI-Powered Visibility for Local Tradespeople</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="https://twitter.com/whozadotai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">𝕏</a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://linkedin.com/company/whoza-ai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">in</a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://instagram.com/whozadotai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">ig</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="color:rgba(255,255,255,0.4); margin:0 0 8px 0; font-size:12px;">
                      <a href="https://whoza.ai/privacy" style="color:rgba(255,255,255,0.5); text-decoration:none;">Privacy Policy</a> &nbsp;&bull;&nbsp;
                      <a href="https://whoza.ai/terms" style="color:rgba(255,255,255,0.5); text-decoration:none;">Terms of Service</a> &nbsp;&bull;&nbsp;
                      <a href="{{unsubscribe_url}}" style="color:rgba(255,255,255,0.5); text-decoration:none;">Unsubscribe</a>
                    </p>
                    <p style="color:rgba(255,255,255,0.3); margin:0; font-size:11px;">
                      &copy; 2026 whoza.ai. All rights reserved.<br>
                      You received this because you signed up at whoza.ai
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>',
  'Hi {{business_name}},

Something big is happening in how people find local tradespeople — and it''s happening right now.

DID YOU KNOW?
43% of people now use AI assistants like ChatGPT and Google AI to find local services

HERE''S WHAT''S CHANGING:

🔍 TRADITIONAL SEARCH VS AI SEARCH
When someone Googles "electrician near me," they see 10 blue links. When they ask ChatGPT, they get ONE recommendation — and it needs to be yours.

💬 HOW PEOPLE ACTUALLY ASK
Instead of searching for "plumber London," they''re now asking "Who''s the most reliable plumber in East London for emergency repairs?" AI gives them specific answers.

🎯 THE WINNER TAKES ALL
AI platforms typically recommend just 1-3 businesses. If you''re not in that list, you''re invisible to potential customers using these tools.

🎉 THE GOOD NEWS
Most of your competitors don''t even know this is happening yet. That means there''s a massive opportunity for early movers to dominate their local market in AI search results.

Tomorrow, I''ll share the exact signals that AI platforms look for when deciding which businesses to recommend — and how you can optimise for them.

To your success,
The whoza.ai Team

---
whoza.ai | AI-Powered Visibility for Local Tradespeople
Privacy Policy: https://whoza.ai/privacy | Unsubscribe: {{unsubscribe_url}}',
  'educational',
  '["business_name", "unsubscribe_url"]'
),
(
  'educational_day4',
  'The 5 Signals AI Platforms Use to Rank Local Businesses',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>The 5 AI Ranking Signals</title>
  <style type="text/css">
    body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 24px !important; }
      .header { padding: 32px 24px !important; }
      .footer { padding: 32px 24px !important; }
      .heading { font-size: 24px !important; }
      .subheading { font-size: 18px !important; }
      .two-col { display: block !important; width: 100% !important; }
      .signal-num { width: 32px !important; height: 32px !important; line-height: 32px !important; font-size: 14px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:''Segoe UI'', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td class="header" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); padding:32px 40px; text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <div style="background-color:rgba(255,255,255,0.15); border-radius:50%; width:48px; height:48px; display:inline-block; line-height:48px; text-align:center;">
                      <span style="color:#ffffff; font-size:20px; font-weight:700; font-family:Georgia, serif;">w.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="color:rgba(255,255,255,0.8); margin:0; font-size:13px; text-transform:uppercase; letter-spacing:1.5px; font-weight:600;">whoza.ai Insights</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="padding:40px 40px 24px 40px;">
              <h1 class="heading" style="color:#1f2937; font-size:26px; margin:0 0 20px 0; font-weight:700; letter-spacing:-0.5px; line-height:1.3;">The 5 Signals That Make AI Platforms Recommend Your Business</h1>

              <p style="font-size:17px; line-height:1.7; color:#1f2937; margin:0 0 20px 0; font-weight:500;">Hi {{business_name}},</p>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:0 0 28px 0;">
                Yesterday we talked about why AI search matters. Today, let''s dive into exactly what these AI platforms look for when deciding which businesses to recommend.
              </p>

              <h2 class="subheading" style="color:#00857d; font-size:20px; margin:0 0 24px 0; font-weight:700;">The 5 Critical Ranking Signals</h2>

              <!-- Signal 1 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td class="two-col" width="44" valign="top" style="padding-right:16px;">
                    <div class="signal-num" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; width:40px; height:40px; border-radius:50%; text-align:center; line-height:40px; font-size:16px; font-weight:700;">1</div>
                  </td>
                  <td class="two-col" valign="top">
                    <h3 style="margin:0 0 6px 0; font-size:16px; font-weight:700; color:#1f2937;">Profile Completeness & Consistency</h3>
                    <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">AI platforms cross-reference your information across Google Business Profile, your website, and directories. Inconsistent details (like different phone numbers) hurt your rankings.</p>
                  </td>
                </tr>
              </table>

              <!-- Signal 2 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td class="two-col" width="44" valign="top" style="padding-right:16px;">
                    <div class="signal-num" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; width:40px; height:40px; border-radius:50%; text-align:center; line-height:40px; font-size:16px; font-weight:700;">2</div>
                  </td>
                  <td class="two-col" valign="top">
                    <h3 style="margin:0 0 6px 0; font-size:16px; font-weight:700; color:#1f2937;">Review Quality & Recency</h3>
                    <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">It''s not just about having lots of reviews. AI looks for recent 5-star reviews with detailed descriptions of specific services. Generic reviews don''t carry much weight.</p>
                  </td>
                </tr>
              </table>

              <!-- Signal 3 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td class="two-col" width="44" valign="top" style="padding-right:16px;">
                    <div class="signal-num" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; width:40px; height:40px; border-radius:50%; text-align:center; line-height:40px; font-size:16px; font-weight:700;">3</div>
                  </td>
                  <td class="two-col" valign="top">
                    <h3 style="margin:0 0 6px 0; font-size:16px; font-weight:700; color:#1f2937;">Citation Network Strength</h3>
                    <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">Being listed on authoritative directories like Checkatrade, TrustATrader, and Rated People signals legitimacy to AI platforms. More quality citations = higher trust.</p>
                  </td>
                </tr>
              </table>

              <!-- Signal 4 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td class="two-col" width="44" valign="top" style="padding-right:16px;">
                    <div class="signal-num" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; width:40px; height:40px; border-radius:50%; text-align:center; line-height:40px; font-size:16px; font-weight:700;">4</div>
                  </td>
                  <td class="two-col" valign="top">
                    <h3 style="margin:0 0 6px 0; font-size:16px; font-weight:700; color:#1f2937;">Location-Specific Content</h3>
                    <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">AI loves when businesses clearly serve specific areas. Having content that mentions the neighbourhoods you serve helps AI match you to local searches.</p>
                  </td>
                </tr>
              </table>

              <!-- Signal 5 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td class="two-col" width="44" valign="top" style="padding-right:16px;">
                    <div class="signal-num" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; width:40px; height:40px; border-radius:50%; text-align:center; line-height:40px; font-size:16px; font-weight:700;">5</div>
                  </td>
                  <td class="two-col" valign="top">
                    <h3 style="margin:0 0 6px 0; font-size:16px; font-weight:700; color:#1f2937;">Structured Data & Technical Elements</h3>
                    <p style="margin:0; font-size:14px; line-height:1.6; color:#6b7280;">Your website needs to "speak AI" — using schema markup that tells AI platforms exactly what services you offer, where you operate, and your credentials.</p>
                  </td>
                </tr>
              </table>

              <!-- Best Part Callout -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
                <tr>
                  <td style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); padding:28px; border-radius:12px;">
                    <h3 style="font-size:17px; color:#ffffff; margin:0 0 12px 0; font-weight:700;">Here''s the Best Part</h3>
                    <p style="font-size:15px; line-height:1.7; color:rgba(255,255,255,0.9); margin:0;">
                      You don''t need to tackle all of these at once. Our weekly tasks break down these optimisations into simple, 15-minute actions. Each week, you''ll improve one signal, gradually building your AI visibility score.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:24px 0;">
                Your baseline assessment is almost complete. Soon you''ll receive your first personalised task, designed specifically to boost the ranking signal that will have the biggest impact for YOUR business.
              </p>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0;">
                <tr>
                  <td align="center">
                    <a href="{{portal_url}}" class="button" style="display:inline-block; background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; text-decoration:none; padding:16px 44px; border-radius:8px; font-weight:700; font-size:16px; letter-spacing:0.3px; box-shadow:0 4px 12px rgba(0,133,125,0.25);">
                      Check Your Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px; padding-top:24px; border-top:1px solid #f3f4f6;">
                <tr>
                  <td>
                    <p style="font-size:16px; line-height:1.7; color:#374151; margin:0;">
                      Ready to dominate AI search,<br>
                      <strong style="color:#00857d;">The whoza.ai Team</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer" style="background:linear-gradient(135deg, #004d47 0%, #003b36 100%); padding:40px 40px 32px 40px; text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <div style="background-color:rgba(255,255,255,0.1); border-radius:50%; width:48px; height:48px; display:inline-block; line-height:48px; text-align:center;">
                      <span style="color:#ffffff; font-size:20px; font-weight:700; font-family:Georgia, serif;">w.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <p style="color:#ffffff; margin:0 0 6px 0; font-size:16px; font-weight:700;">whoza.ai</p>
                    <p style="color:rgba(255,255,255,0.6); margin:0; font-size:13px;">AI-Powered Visibility for Local Tradespeople</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="padding:0 8px;">
                          <a href="https://twitter.com/whozadotai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">𝕏</a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://linkedin.com/company/whoza-ai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">in</a>
                        </td>
                        <td style="padding:0 8px;">
                          <a href="https://instagram.com/whozadotai" style="display:inline-block; width:36px; height:36px; background-color:rgba(255,255,255,0.1); border-radius:50%; text-align:center; line-height:36px; color:#ffffff; text-decoration:none; font-size:14px;">ig</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="color:rgba(255,255,255,0.4); margin:0 0 8px 0; font-size:12px;">
                      <a href="https://whoza.ai/privacy" style="color:rgba(255,255,255,0.5); text-decoration:none;">Privacy Policy</a> &nbsp;&bull;&nbsp;
                      <a href="https://whoza.ai/terms" style="color:rgba(255,255,255,0.5); text-decoration:none;">Terms of Service</a> &nbsp;&bull;&nbsp;
                      <a href="{{unsubscribe_url}}" style="color:rgba(255,255,255,0.5); text-decoration:none;">Unsubscribe</a>
                    </p>
                    <p style="color:rgba(255,255,255,0.3); margin:0; font-size:11px;">
                      &copy; 2026 whoza.ai. All rights reserved.<br>
                      You received this because you signed up at whoza.ai
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>',
  'Hi {{business_name}},

Yesterday we talked about why AI search matters. Today, let''s dive into exactly what these AI platforms look for when deciding which businesses to recommend.

THE 5 CRITICAL RANKING SIGNALS:

1. PROFILE COMPLETENESS & CONSISTENCY
AI platforms cross-reference your information across Google Business Profile, your website, and directories. Inconsistent details (like different phone numbers) hurt your rankings.

2. REVIEW QUALITY & RECENCY
It''s not just about having lots of reviews. AI looks for recent 5-star reviews with detailed descriptions of specific services. Generic reviews don''t carry much weight.

3. CITATION NETWORK STRENGTH
Being listed on authoritative directories like Checkatrade, TrustATrader, and Rated People signals legitimacy to AI platforms. More quality citations = higher trust.

4. LOCATION-SPECIFIC CONTENT
AI loves when businesses clearly serve specific areas. Having content that mentions the neighbourhoods you serve helps AI match you to local searches.

5. STRUCTURED DATA & TECHNICAL ELEMENTS
Your website needs to "speak AI" — using schema markup that tells AI platforms exactly what services you offer, where you operate, and your credentials.

HERE''S THE BEST PART:
You don''t need to tackle all of these at once. Our weekly tasks break down these optimisations into simple, 15-minute actions. Each week, you''ll improve one signal, gradually building your AI visibility score.

Your baseline assessment is almost complete. Soon you''ll receive your first personalised task, designed specifically to boost the ranking signal that will have the biggest impact for YOUR business.

Check Your Dashboard: {{portal_url}}

Ready to dominate AI search,
The whoza.ai Team

---
whoza.ai | AI-Powered Visibility for Local Tradespeople
Privacy Policy: https://whoza.ai/privacy | Unsubscribe: {{unsubscribe_url}}',
  'educational',
  '["business_name", "portal_url", "unsubscribe_url"]'
);

-- Create onboarding campaign
INSERT INTO email_campaigns (name, description, trigger_event, is_active) VALUES
(
  'onboarding_sequence',
  'Automated onboarding sequence for new users with welcome email and educational content',
  'user_signup',
  true
);

-- Link emails to campaign
INSERT INTO campaign_emails (campaign_id, template_id, sequence_order, delay_days, delay_hours)
SELECT
  c.id,
  t.id,
  CASE t.name
    WHEN 'welcome_signup' THEN 1
    WHEN 'educational_day2' THEN 2
    WHEN 'educational_day4' THEN 3
  END,
  CASE t.name
    WHEN 'welcome_signup' THEN 0
    WHEN 'educational_day2' THEN 2
    WHEN 'educational_day4' THEN 4
  END,
  CASE t.name
    WHEN 'welcome_signup' THEN 0
    WHEN 'educational_day2' THEN 0
    WHEN 'educational_day4' THEN 0
  END
FROM email_campaigns c
CROSS JOIN email_templates t
WHERE c.name = 'onboarding_sequence'
  AND t.name IN ('welcome_signup', 'educational_day2', 'educational_day4');
