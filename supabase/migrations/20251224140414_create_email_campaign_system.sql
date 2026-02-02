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
  'Welcome to whoza.ai - Your AI Visibility Journey Starts Now',
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
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to whoza.ai!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">Hi {{business_name}},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">
                Welcome aboard! We''re excited to help you dominate AI-powered search results and get found by customers using ChatGPT, Google AI Overviews, and Perplexity.
              </p>
              
              <h2 style="color: #00857d; font-size: 20px; margin: 30px 0 15px 0;">What Happens Next?</h2>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                  <strong style="color: #00857d;">📊 Step 1: Baseline Assessment (24-48 hours)</strong><br>
                  We''ll analyze your current online presence across all AI search platforms to establish your starting point.
                </p>
                
                <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                  <strong style="color: #00857d;">🎯 Step 2: Your First Weekly Task</strong><br>
                  You''ll receive a personalized, 15-minute action designed to boost your AI visibility. No technical expertise required!
                </p>
                
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333333;">
                  <strong style="color: #00857d;">📈 Step 3: Continuous Improvement</strong><br>
                  Every week, you''ll get a new task specifically designed to improve your rankings in AI search results.
                </p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 20px 0;">
                Over the next few days, we''ll send you some valuable insights about AI search visibility to help you understand why this matters for your business.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{portal_url}}" style="display: inline-block; background: linear-gradient(135deg, #00857d 0%, #006d66 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                  Go to Your Dashboard
                </a>
              </div>
              
              <p style="font-size: 14px; line-height: 1.6; color: #666666; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #eeeeee;">
                Have questions? Just reply to this email - we''re here to help!
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
  'Hi {{business_name}},

Welcome aboard! We''re excited to help you dominate AI-powered search results and get found by customers using ChatGPT, Google AI Overviews, and Perplexity.

WHAT HAPPENS NEXT?

📊 Step 1: Baseline Assessment (24-48 hours)
We''ll analyze your current online presence across all AI search platforms to establish your starting point.

🎯 Step 2: Your First Weekly Task
You''ll receive a personalized, 15-minute action designed to boost your AI visibility. No technical expertise required!

📈 Step 3: Continuous Improvement
Every week, you''ll get a new task specifically designed to improve your rankings in AI search results.

Over the next few days, we''ll send you some valuable insights about AI search visibility to help you understand why this matters for your business.

Go to Your Dashboard: {{portal_url}}

Have questions? Just reply to this email - we''re here to help!

Best regards,
The whoza.ai Team',
  'welcome',
  '["business_name", "portal_url"]'
),
(
  'educational_day2',
  'Why AI Search Matters for Local Tradespeople',
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
            <td style="padding: 40px;">
              <h1 style="color: #00857d; font-size: 24px; margin: 0 0 20px 0;">The AI Search Revolution: What It Means for Your Business</h1>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">Hi {{business_name}},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">
                Something big is happening in how people find local tradespeople, and it''s happening right now.
              </p>
              
              <div style="background: linear-gradient(135deg, #00857d 0%, #006d66 100%); padding: 25px; border-radius: 6px; margin: 25px 0; color: #ffffff;">
                <p style="font-size: 18px; margin: 0; font-weight: bold;">Did you know?</p>
                <p style="font-size: 32px; margin: 10px 0 5px 0; font-weight: bold;">43%</p>
                <p style="font-size: 15px; margin: 0;">of people now use AI assistants like ChatGPT and Google AI to find local services</p>
              </div>
              
              <h2 style="color: #00857d; font-size: 20px; margin: 30px 0 15px 0;">Here''s What''s Changing:</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                  <strong style="color: #00857d;">🔍 Traditional Search vs AI Search</strong><br>
                  When someone Googles "electrician near me," they see 10 blue links. When they ask ChatGPT, they get ONE recommendation - and it needs to be yours.
                </p>
                
                <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                  <strong style="color: #00857d;">💬 How People Actually Ask</strong><br>
                  Instead of searching for "plumber London," they''re now asking "Who''s the most reliable plumber in East London for emergency repairs?" AI gives them specific answers.
                </p>
                
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333333;">
                  <strong style="color: #00857d;">🎯 The Winner Takes All</strong><br>
                  AI platforms typically recommend just 1-3 businesses. If you''re not in that list, you''re invisible to potential customers using these tools.
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0;">
                <h3 style="color: #00857d; font-size: 18px; margin: 0 0 15px 0;">The Good News</h3>
                <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 0;">
                  Most of your competitors don''t even know this is happening yet. That means there''s a massive opportunity for early movers to dominate their local market in AI search results.
                </p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 25px 0;">
                Tomorrow, I''ll share the exact signals that AI platforms look for when deciding which businesses to recommend - and how you can optimize for them.
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 20px 0 0 0;">
                To your success,<br>
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
  'Hi {{business_name}},

Something big is happening in how people find local tradespeople, and it''s happening right now.

DID YOU KNOW?
43% of people now use AI assistants like ChatGPT and Google AI to find local services

HERE''S WHAT''S CHANGING:

🔍 Traditional Search vs AI Search
When someone Googles "electrician near me," they see 10 blue links. When they ask ChatGPT, they get ONE recommendation - and it needs to be yours.

💬 How People Actually Ask
Instead of searching for "plumber London," they''re now asking "Who''s the most reliable plumber in East London for emergency repairs?" AI gives them specific answers.

🎯 The Winner Takes All
AI platforms typically recommend just 1-3 businesses. If you''re not in that list, you''re invisible to potential customers using these tools.

THE GOOD NEWS
Most of your competitors don''t even know this is happening yet. That means there''s a massive opportunity for early movers to dominate their local market in AI search results.

Tomorrow, I''ll share the exact signals that AI platforms look for when deciding which businesses to recommend - and how you can optimize for them.

To your success,
The whoza.ai Team',
  'educational',
  '["business_name"]'
),
(
  'educational_day4',
  'The 5 Signals AI Platforms Use to Rank Local Businesses',
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
            <td style="padding: 40px;">
              <h1 style="color: #00857d; font-size: 24px; margin: 0 0 20px 0;">The 5 Signals That Make AI Platforms Recommend Your Business</h1>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">Hi {{business_name}},</p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px 0;">
                Yesterday we talked about why AI search matters. Today, let''s dive into exactly what these AI platforms look for when deciding which businesses to recommend.
              </p>
              
              <h2 style="color: #00857d; font-size: 20px; margin: 30px 0 15px 0;">The 5 Critical Ranking Signals:</h2>
              
              <div style="margin: 25px 0;">
                <div style="border-left: 4px solid #00857d; padding-left: 20px; margin-bottom: 25px;">
                  <h3 style="color: #00857d; font-size: 18px; margin: 0 0 10px 0;">1. Profile Completeness & Consistency</h3>
                  <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 0;">
                    AI platforms cross-reference your information across Google Business Profile, your website, and directories. Inconsistent details (like different phone numbers) hurt your rankings.
                  </p>
                </div>
                
                <div style="border-left: 4px solid #00857d; padding-left: 20px; margin-bottom: 25px;">
                  <h3 style="color: #00857d; font-size: 18px; margin: 0 0 10px 0;">2. Review Quality & Recency</h3>
                  <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 0;">
                    It''s not just about having lots of reviews. AI looks for recent 5-star reviews with detailed descriptions of specific services. Generic reviews don''t carry much weight.
                  </p>
                </div>
                
                <div style="border-left: 4px solid #00857d; padding-left: 20px; margin-bottom: 25px;">
                  <h3 style="color: #00857d; font-size: 18px; margin: 0 0 10px 0;">3. Citation Network Strength</h3>
                  <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 0;">
                    Being listed on authoritative directories like Checkatrade, TrustATrader, and Rated People signals legitimacy to AI platforms. More quality citations = higher trust.
                  </p>
                </div>
                
                <div style="border-left: 4px solid #00857d; padding-left: 20px; margin-bottom: 25px;">
                  <h3 style="color: #00857d; font-size: 18px; margin: 0 0 10px 0;">4. Location-Specific Content</h3>
                  <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 0;">
                    AI loves when businesses clearly serve specific areas. Having content that mentions the neighborhoods you serve helps AI match you to local searches.
                  </p>
                </div>
                
                <div style="border-left: 4px solid #00857d; padding-left: 20px;">
                  <h3 style="color: #00857d; font-size: 18px; margin: 0 0 10px 0;">5. Structured Data & Technical Elements</h3>
                  <p style="font-size: 15px; line-height: 1.6; color: #333333; margin: 0;">
                    Your website needs to "speak AI" - using schema markup that tells AI platforms exactly what services you offer, where you operate, and your credentials.
                  </p>
                </div>
              </div>
              
              <div style="background: linear-gradient(135deg, #00857d 0%, #006d66 100%); padding: 25px; border-radius: 6px; margin: 30px 0; color: #ffffff;">
                <h3 style="font-size: 18px; margin: 0 0 15px 0;">Here''s the Best Part:</h3>
                <p style="font-size: 15px; line-height: 1.6; margin: 0;">
                  You don''t need to tackle all of these at once. Our weekly tasks break down these optimizations into simple, 15-minute actions. Each week, you''ll improve one signal, gradually building your AI visibility score.
                </p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 25px 0;">
                Your baseline assessment is almost complete. Soon you''ll receive your first personalized task, designed specifically to boost the ranking signal that will have the biggest impact for YOUR business.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{portal_url}}" style="display: inline-block; background: linear-gradient(135deg, #00857d 0%, #006d66 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                  Check Your Dashboard
                </a>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 20px 0 0 0;">
                Ready to dominate AI search,<br>
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
AI loves when businesses clearly serve specific areas. Having content that mentions the neighborhoods you serve helps AI match you to local searches.

5. STRUCTURED DATA & TECHNICAL ELEMENTS
Your website needs to "speak AI" - using schema markup that tells AI platforms exactly what services you offer, where you operate, and your credentials.

HERE''S THE BEST PART:
You don''t need to tackle all of these at once. Our weekly tasks break down these optimizations into simple, 15-minute actions. Each week, you''ll improve one signal, gradually building your AI visibility score.

Your baseline assessment is almost complete. Soon you''ll receive your first personalized task, designed specifically to boost the ranking signal that will have the biggest impact for YOUR business.

Check Your Dashboard: {{portal_url}}

Ready to dominate AI search,
The whoza.ai Team',
  'educational',
  '["business_name", "portal_url"]'
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
