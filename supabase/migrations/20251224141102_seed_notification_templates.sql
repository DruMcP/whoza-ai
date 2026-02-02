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

Your new weekly task is ready! This week focus on: {{task_title}}

{{task_description}}

WHAT TO DO:
{{recommended_action}}

COPY THIS:
{{copy_paste_text}}

This task should take about 15 minutes to complete and will improve your visibility in AI search results.

Complete your task: {{task_url}}

Questions? Just reply to this email.

Best regards,
The whoza.ai Team',
    '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #00857d 0%, #006d66 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Your Weekly Task is Ready!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">Hi {{business_name}},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">
                Your new weekly task is ready! This week, focus on:
              </p>
              
              <div style="background: linear-gradient(135deg, #00857d 0%, #006d66 100%); padding: 25px; border-radius: 6px; margin: 25px 0; color: #ffffff;">
                <h2 style="margin: 0; font-size: 22px; font-weight: bold;">{{task_title}}</h2>
              </div>
              
              <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 20px 0;">
                {{task_description}}
              </p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <h3 style="color: #00857d; font-size: 18px; margin: 0 0 15px 0;">What To Do:</h3>
                <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 0;">
                  {{recommended_action}}
                </p>
              </div>
              
              <div style="background-color: #fffbf0; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <h3 style="color: #f59e0b; font-size: 16px; margin: 0 0 15px 0;">Copy & Paste This:</h3>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 14px; color: #1f2937; white-space: pre-wrap; word-wrap: break-word;">{{copy_paste_text}}</div>
              </div>
              
              <p style="font-size: 14px; line-height: 1.6; color: #666666; margin: 20px 0;">
                This task should take about 15 minutes to complete and will improve your visibility in AI search results.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{task_url}}" style="display: inline-block; background: linear-gradient(135deg, #00857d 0%, #006d66 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                  Complete Your Task
                </a>
              </div>
              
              <p style="font-size: 14px; line-height: 1.6; color: #666666; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #eeeeee;">
                Questions? Just reply to this email - we''re here to help!
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 20px 0 0 0;">
                Best regards,<br>
                <strong>The whoza.ai Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>',
    '["business_name", "task_title", "task_description", "recommended_action", "copy_paste_text", "task_url"]'
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
    'Your Monthly Visibility Report - {{trend_direction}} {{score_change}}%',
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
The whoza.ai Team',
    '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #00857d 0%, #006d66 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Your Monthly Visibility Report</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 18px;">{{trend_direction}} {{score_change}}%</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">Hi {{business_name}},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 30px 0;">
                Your monthly AI visibility report is ready! Here''s how you''re performing:
              </p>
              
              <div style="text-align: center; background: linear-gradient(135deg, #00857d 0%, #006d66 100%); padding: 30px; border-radius: 6px; margin: 25px 0; color: #ffffff;">
                <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Current Visibility Score</div>
                <div style="font-size: 56px; font-weight: bold; margin: 10px 0;">{{current_score}}</div>
                <div style="font-size: 14px;">out of 100</div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.3);">
                  <div style="font-size: 18px; font-weight: bold;">{{trend_direction}} {{score_change}}%</div>
                  <div style="font-size: 14px; margin-top: 5px;">from last month</div>
                </div>
              </div>
              
              <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 25px 0;">
                {{score_summary}}
              </p>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <h3 style="color: #10b981; font-size: 18px; margin: 0 0 15px 0;">Key Achievements This Month</h3>
                <div style="font-size: 15px; line-height: 1.8; color: #333333;">{{achievements}}</div>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <h3 style="color: #f59e0b; font-size: 18px; margin: 0 0 15px 0;">Areas for Improvement</h3>
                <div style="font-size: 15px; line-height: 1.8; color: #333333;">{{improvement_areas}}</div>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <h3 style="color: #00857d; font-size: 18px; margin: 0 0 15px 0;">Next Steps</h3>
                <div style="font-size: 15px; line-height: 1.8; color: #333333;">{{next_steps}}</div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{report_url}}" style="display: inline-block; background: linear-gradient(135deg, #00857d 0%, #006d66 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                  View Full Report
                </a>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #eeeeee;">
                Keep up the great work!<br>
                <strong>The whoza.ai Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>',
    '["business_name", "current_score", "trend_direction", "score_change", "score_summary", "achievements", "improvement_areas", "next_steps", "report_url"]'
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
    'Reminder: Complete Your Task - {{task_title}}',
    'Hi {{business_name}},

Just a friendly reminder that you have a pending task to complete.

TASK: {{task_title}}
STATUS: {{task_status}}
DUE: {{due_date}}

This task will help improve your AI search visibility and should only take about 15 minutes.

Complete your task: {{task_url}}

Best regards,
The whoza.ai Team',
    '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Task Reminder</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">Hi {{business_name}},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">
                Just a friendly reminder that you have a pending task to complete:
              </p>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <h2 style="color: #f59e0b; font-size: 20px; margin: 0 0 15px 0;">{{task_title}}</h2>
                <p style="margin: 10px 0; font-size: 14px; color: #333333;">
                  <strong>Status:</strong> {{task_status}}<br>
                  <strong>Due:</strong> {{due_date}}
                </p>
              </div>
              
              <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 20px 0;">
                This task will help improve your AI search visibility and should only take about 15 minutes.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{task_url}}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                  Complete Your Task
                </a>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 20px 0 0 0;">
                Best regards,<br>
                <strong>The whoza.ai Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>',
    '["business_name", "task_title", "task_status", "due_date", "task_url"]'
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
