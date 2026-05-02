/*
  # Notification Templates

  ## Overview
  Creates notification templates for weekly tasks and monthly score updates across
  email and in-app channels. Templates are mobile-responsive and brand-consistent.

  ## Templates Created
  1. Weekly Task - Email
  2. Weekly Task - In-App
  3. Score Update - Email
  4. Score Update - In-App
  5. Task Reminder - Email
  6. Task Reminder - In-App
*/

-- Get channel and type IDs for reference
DO $$
DECLARE
  email_channel_id uuid;
  in_app_channel_id uuid;
  weekly_task_type_id uuid;
  score_update_type_id uuid;
  task_reminder_type_id uuid;
BEGIN
  SELECT id INTO email_channel_id FROM notification_channels WHERE name = 'email';
  SELECT id INTO in_app_channel_id FROM notification_channels WHERE name = 'in_app';
  SELECT id INTO weekly_task_type_id FROM notification_types WHERE name = 'weekly_task';
  SELECT id INTO score_update_type_id FROM notification_types WHERE name = 'score_update';
  SELECT id INTO task_reminder_type_id FROM notification_types WHERE name = 'task_reminder';

  -- Weekly Task Email Template
  INSERT INTO notification_templates (
    notification_type_id,
    channel_id,
    name,
    subject_template,
    content_template,
    html_template,
    variables
  ) VALUES (
    weekly_task_type_id,
    email_channel_id,
    'weekly_task_email',
    'Your Weekly Task: {{task_title}}',
    'Hi {{business_name}},

Your new weekly task is ready! This week, focus on: {{task_title}}

{{task_description}}

WHAT TO DO:
{{recommended_action}}

COPY THIS:
{{copy_paste_text}}

This task should take about 15 minutes to complete and will improve your visibility in AI search results.

Complete your task: {{task_url}}

Questions? Just reply to this email.

Best regards,
The whoza.ai Team

---
whoza.ai | AI-Powered Visibility for Local Tradespeople
Privacy Policy: https://whoza.ai/privacy | Unsubscribe: {{unsubscribe_url}}',
    '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your Weekly Task</title>
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
      .button { padding: 14px 32px !important; font-size: 15px !important; }
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
                    <h1 class="heading" style="color:#ffffff; margin:0; font-size:28px; font-weight:700; letter-spacing:-0.5px;">Your Weekly Task is Ready!</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="padding:40px 40px 24px 40px;">
              <p style="font-size:17px; line-height:1.7; color:#1f2937; margin:0 0 20px 0; font-weight:500;">Hi {{business_name}},</p>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:0 0 24px 0;">
                Your new weekly task is ready! This week, focus on:
              </p>

              <!-- Task Title Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
                <tr>
                  <td style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); padding:28px; border-radius:12px;">
                    <p style="font-size:13px; color:rgba(255,255,255,0.8); margin:0 0 8px 0; text-transform:uppercase; letter-spacing:1.5px; font-weight:600;">This Week''s Focus</p>
                    <h2 style="margin:0; font-size:22px; font-weight:700; color:#ffffff; letter-spacing:-0.3px;">{{task_title}}</h2>
                  </td>
                </tr>
              </table>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:20px 0 24px 0;">
                {{task_description}}
              </p>

              <!-- What To Do Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafb; border-radius:10px; margin:24px 0; border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="two-col" width="36" valign="top" style="padding-right:14px;">
                          <div style="background-color:#ecfdf5; color:#00857d; width:32px; height:32px; border-radius:50%; text-align:center; line-height:32px; font-size:16px;">✓</div>
                        </td>
                        <td class="two-col" valign="top">
                          <h3 style="color:#00857d; font-size:17px; margin:0 0 10px 0; font-weight:700;">What To Do</h3>
                          <p style="font-size:15px; line-height:1.7; color:#374151; margin:0;">{{recommended_action}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Copy & Paste Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fffbf0; border-left:4px solid #f59e0b; border-radius:8px; margin:24px 0;">
                <tr>
                  <td style="padding:20px 24px;">
                    <h3 style="color:#d97706; font-size:15px; margin:0 0 12px 0; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Copy &amp; Paste This</h3>
                    <div style="background-color:#ffffff; padding:16px; border-radius:6px; border:1px solid #fef3c7; font-family:''SF Mono'', Monaco, Consolas, monospace; font-size:13px; color:#1f2937; white-space:pre-wrap; word-wrap:break-word; line-height:1.6;">{{copy_paste_text}}</div>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; line-height:1.6; color:#9ca3af; margin:20px 0; text-align:center;">
                This task should take about <strong style="color:#6b7280;">15 minutes</strong> to complete and will improve your visibility in AI search results.
              </p>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0;">
                <tr>
                  <td align="center">
                    <a href="{{task_url}}" class="button" style="display:inline-block; background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; text-decoration:none; padding:16px 44px; border-radius:8px; font-weight:700; font-size:16px; letter-spacing:0.3px; box-shadow:0 4px 12px rgba(0,133,125,0.25);">
                      Complete Your Task →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:15px; line-height:1.6; color:#9ca3af; margin:24px 0 0 0; padding-top:24px; border-top:1px solid #f3f4f6;">
                Questions? Just reply to this email — we''re here to help.
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
                      <a href="https://whoza.ai/privacy" style="color:rgba(255,255,255,0.5); text-decoration:none;">Privacy Policy</a> &nbsp;•&nbsp;
                      <a href="https://whoza.ai/terms" style="color:rgba(255,255,255,0.5); text-decoration:none;">Terms of Service</a> &nbsp;•&nbsp;
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
    '["business_name", "task_title", "task_description", "recommended_action", "copy_paste_text", "task_url", "unsubscribe_url"]'
  ) ON CONFLICT (notification_type_id, channel_id) DO NOTHING;

  -- Weekly Task In-App Template
  INSERT INTO notification_templates (
    notification_type_id,
    channel_id,
    name,
    subject_template,
    content_template,
    html_template,
    variables
  ) VALUES (
    weekly_task_type_id,
    in_app_channel_id,
    'weekly_task_in_app',
    'Your Weekly Task: {{task_title}}',
    'Your new weekly task is ready! Focus on: {{task_title}}',
    NULL,
    '["business_name", "task_title", "task_url"]'
  ) ON CONFLICT (notification_type_id, channel_id) DO NOTHING;

  -- Score Update Email Template
  INSERT INTO notification_templates (
    notification_type_id,
    channel_id,
    name,
    subject_template,
    content_template,
    html_template,
    variables
  ) VALUES (
    score_update_type_id,
    email_channel_id,
    'score_update_email',
    'Your Monthly Visibility Report — {{trend_direction}} {{score_change}}%',
    'Hi {{business_name}},

Your monthly AI visibility report is ready!

CURRENT VISIBILITY SCORE: {{current_score}}/100
CHANGE FROM LAST MONTH: {{trend_direction}} {{score_change}}%

{{score_summary}}

KEY ACHIEVEMENTS THIS MONTH:
{{achievements}}

AREAS FOR IMPROVEMENT:
{{improvement_areas}}

NEXT STEPS:
{{next_steps}}

View your full report: {{report_url}}

Keep up the great work!

Best regards,
The whoza.ai Team

---
whoza.ai | AI-Powered Visibility for Local Tradespeople
Privacy Policy: https://whoza.ai/privacy | Unsubscribe: {{unsubscribe_url}}',
    '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your Monthly Visibility Report</title>
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
      .button { padding: 14px 32px !important; font-size: 15px !important; }
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
            <td class="header" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); padding:40px 40px 32px 40px; text-align:center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <div style="background-color:rgba(255,255,255,0.15); border-radius:50%; width:64px; height:64px; display:inline-block; line-height:64px; text-align:center;">
                      <span style="color:#ffffff; font-size:28px; font-weight:700; font-family:Georgia, serif;">w.</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 class="heading" style="color:#ffffff; margin:0; font-size:28px; font-weight:700; letter-spacing:-0.5px;">Your Monthly Visibility Report</h1>
                    <p style="color:rgba(255,255,255,0.85); margin:10px 0 0 0; font-size:16px;">{{trend_direction}} {{score_change}}%</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="padding:40px 40px 24px 40px;">
              <p style="font-size:17px; line-height:1.7; color:#1f2937; margin:0 0 20px 0; font-weight:500;">Hi {{business_name}},</p>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:0 0 28px 0;">
                Your monthly AI visibility report is ready! Here''s how you''re performing:
              </p>

              <!-- Score Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
                <tr>
                  <td style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); padding:36px; border-radius:12px; text-align:center;">
                    <p style="font-size:13px; color:rgba(255,255,255,0.8); margin:0 0 12px 0; text-transform:uppercase; letter-spacing:1.5px; font-weight:600;">Current Visibility Score</p>
                    <p class="stat-number" style="font-size:56px; color:#ffffff; margin:0; font-weight:800; letter-spacing:-2px;">{{current_score}}</p>
                    <p style="font-size:14px; color:rgba(255,255,255,0.7); margin:8px 0 0 0;">out of 100</p>

                    <!-- Trend Indicator -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:20px auto 0 auto; padding-top:16px; border-top:1px solid rgba(255,255,255,0.2);">
                      <tr>
                        <td style="text-align:center;">
                          <p style="font-size:20px; font-weight:700; color:#ffffff; margin:0;">{{trend_direction}} {{score_change}}%</p>
                          <p style="font-size:13px; color:rgba(255,255,255,0.7); margin:4px 0 0 0;">from last month</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Progress Bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom:8px;">
                          <span style="font-size:13px; color:#6b7280; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Visibility Progress</span>
                        </td>
                        <td align="right" style="padding-bottom:8px;">
                          <span style="font-size:13px; color:#00857d; font-weight:700;">{{current_score}}/100</span>
                        </td>
                      </tr>
                    </table>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e5e7eb; border-radius:6px; height:10px;">
                      <tr>
                        <td width="{{current_score}}%" style="background:linear-gradient(135deg, #00857d 0%, #006d66 100%); border-radius:6px; height:10px; font-size:1px; line-height:1px;">&nbsp;</td>
                        <td style="font-size:1px; line-height:1px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:24px 0;">
                {{score_summary}}
              </p>

              <!-- Achievements -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0fdf4; border-radius:10px; margin:24px 0; border:1px solid #d1fae5;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="two-col" width="36" valign="top" style="padding-right:14px;">
                          <div style="background-color:#10b981; color:#ffffff; width:28px; height:28px; border-radius:50%; text-align:center; line-height:28px; font-size:14px; font-weight:700;">✓</div>
                        </td>
                        <td class="two-col" valign="top">
                          <h3 style="color:#059669; font-size:17px; margin:0 0 10px 0; font-weight:700;">Key Achievements This Month</h3>
                          <div style="font-size:15px; line-height:1.8; color:#374151;">{{achievements}}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Improvements -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fffbeb; border-radius:10px; margin:24px 0; border:1px solid #fef3c7;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="two-col" width="36" valign="top" style="padding-right:14px;">
                          <div style="background-color:#f59e0b; color:#ffffff; width:28px; height:28px; border-radius:50%; text-align:center; line-height:28px; font-size:14px; font-weight:700;">↑</div>
                        </td>
                        <td class="two-col" valign="top">
                          <h3 style="color:#d97706; font-size:17px; margin:0 0 10px 0; font-weight:700;">Areas for Improvement</h3>
                          <div style="font-size:15px; line-height:1.8; color:#374151;">{{improvement_areas}}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafb; border-radius:10px; margin:24px 0; border:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="two-col" width="36" valign="top" style="padding-right:14px;">
                          <div style="background-color:#00857d; color:#ffffff; width:28px; height:28px; border-radius:50%; text-align:center; line-height:28px; font-size:14px; font-weight:700;">→</div>
                        </td>
                        <td class="two-col" valign="top">
                          <h3 style="color:#00857d; font-size:17px; margin:0 0 10px 0; font-weight:700;">Next Steps</h3>
                          <div style="font-size:15px; line-height:1.8; color:#374151;">{{next_steps}}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0;">
                <tr>
                  <td align="center">
                    <a href="{{report_url}}" class="button" style="display:inline-block; background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; text-decoration:none; padding:16px 44px; border-radius:8px; font-weight:700; font-size:16px; letter-spacing:0.3px; box-shadow:0 4px 12px rgba(0,133,125,0.25);">
                      View Full Report →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px; padding-top:24px; border-top:1px solid #f3f4f6;">
                <tr>
                  <td>
                    <p style="font-size:16px; line-height:1.7; color:#374151; margin:0;">
                      Keep up the great work!<br>
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
                      <a href="https://whoza.ai/privacy" style="color:rgba(255,255,255,0.5); text-decoration:none;">Privacy Policy</a> &nbsp;•&nbsp;
                      <a href="https://whoza.ai/terms" style="color:rgba(255,255,255,0.5); text-decoration:none;">Terms of Service</a> &nbsp;•&nbsp;
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
    '["business_name", "current_score", "trend_direction", "score_change", "score_summary", "achievements", "improvement_areas", "next_steps", "report_url", "unsubscribe_url"]'
  ) ON CONFLICT (notification_type_id, channel_id) DO NOTHING;

  -- Score Update In-App Template
  INSERT INTO notification_templates (
    notification_type_id,
    channel_id,
    name,
    subject_template,
    content_template,
    html_template,
    variables
  ) VALUES (
    score_update_type_id,
    in_app_channel_id,
    'score_update_in_app',
    'Monthly Report: {{trend_direction}} {{score_change}}%',
    'Your monthly visibility report is ready! Current score: {{current_score}}/100 ({{trend_direction}} {{score_change}}%)',
    NULL,
    '["current_score", "trend_direction", "score_change", "report_url"]'
  ) ON CONFLICT (notification_type_id, channel_id) DO NOTHING;

  -- Task Reminder Email Template
  INSERT INTO notification_templates (
    notification_type_id,
    channel_id,
    name,
    subject_template,
    content_template,
    html_template,
    variables
  ) VALUES (
    task_reminder_type_id,
    email_channel_id,
    'task_reminder_email',
    'Reminder: Complete Your Task — {{task_title}}',
    'Hi {{business_name}},

Just a friendly reminder that you have a pending task to complete.

TASK: {{task_title}}
STATUS: {{task_status}}
DUE: {{due_date}}

This task will help improve your AI search visibility and should only take about 15 minutes.

Complete your task: {{task_url}}

Best regards,
The whoza.ai Team

---
whoza.ai | AI-Powered Visibility for Local Tradespeople
Privacy Policy: https://whoza.ai/privacy | Unsubscribe: {{unsubscribe_url}}',
    '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Task Reminder</title>
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
      .two-col { display: block !important; width: 100% !important; }
      .button { padding: 14px 32px !important; font-size: 15px !important; }
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
                    <h1 class="heading" style="color:#ffffff; margin:0; font-size:26px; font-weight:700; letter-spacing:-0.5px;">Task Reminder</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="padding:40px 40px 24px 40px;">
              <p style="font-size:17px; line-height:1.7; color:#1f2937; margin:0 0 20px 0; font-weight:500;">Hi {{business_name}},</p>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:0 0 24px 0;">
                Just a friendly reminder that you have a pending task to complete:
              </p>

              <!-- Task Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
                <tr>
                  <td style="background-color:#fffbeb; border-left:4px solid #f59e0b; border-radius:8px; padding:24px;">
                    <h2 style="color:#d97706; font-size:20px; margin:0 0 14px 0; font-weight:700;">{{task_title}}</h2>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom:6px;">
                          <span style="font-size:13px; color:#9ca3af; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Status</span>
                        </td>
                        <td style="padding-bottom:6px; padding-left:12px;">
                          <span style="font-size:14px; color:#374151; font-weight:600;">{{task_status}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="font-size:13px; color:#9ca3af; font-weight:600; text-transform:uppercase; letter-spacing:0.5px;">Due</span>
                        </td>
                        <td style="padding-left:12px;">
                          <span style="font-size:14px; color:#374151; font-weight:600;">{{due_date}}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="font-size:16px; line-height:1.7; color:#374151; margin:20px 0 24px 0;">
                This task will help improve your AI search visibility and should only take about <strong>15 minutes</strong>.
              </p>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0;">
                <tr>
                  <td align="center">
                    <a href="{{task_url}}" class="button" style="display:inline-block; background:linear-gradient(135deg, #00857d 0%, #006d66 100%); color:#ffffff; text-decoration:none; padding:16px 44px; border-radius:8px; font-weight:700; font-size:16px; letter-spacing:0.3px; box-shadow:0 4px 12px rgba(0,133,125,0.25);">
                      Complete Your Task →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px; padding-top:24px; border-top:1px solid #f3f4f6;">
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
                      <a href="https://whoza.ai/privacy" style="color:rgba(255,255,255,0.5); text-decoration:none;">Privacy Policy</a> &nbsp;•&nbsp;
                      <a href="https://whoza.ai/terms" style="color:rgba(255,255,255,0.5); text-decoration:none;">Terms of Service</a> &nbsp;•&nbsp;
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
    '["business_name", "task_title", "task_status", "due_date", "task_url", "unsubscribe_url"]'
  ) ON CONFLICT (notification_type_id, channel_id) DO NOTHING;

  -- Task Reminder In-App Template
  INSERT INTO notification_templates (
    notification_type_id,
    channel_id,
    name,
    subject_template,
    content_template,
    html_template,
    variables
  ) VALUES (
    task_reminder_type_id,
    in_app_channel_id,
    'task_reminder_in_app',
    'Complete Your Task: {{task_title}}',
    'You have a pending task to complete: {{task_title}}',
    NULL,
    '["task_title", "task_url"]'
  ) ON CONFLICT (notification_type_id, channel_id) DO NOTHING;

END $$;
