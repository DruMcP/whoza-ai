/*
  # Task Generation System Schema

  ## New Tables

  ### `task_templates`
  - `id` (uuid, primary key) - Unique template identifier
  - `title` (text) - Template title with placeholders
  - `description` (text) - Template description
  - `category` (text) - Task category: 'website', 'content', 'citations', 'reviews', 'social', 'technical', 'listings'
  - `priority_score` (integer) - Base priority score (1-100)
  - `difficulty_level` (text) - Difficulty: 'beginner', 'intermediate', 'advanced'
  - `impact_areas` (jsonb) - Areas of improvement: {'visibility': true, 'citations': true, 'reviews': true}
  - `prerequisites` (jsonb) - Required completions: {'categories': ['website'], 'templates': []}
  - `template_text` (text) - Copy-paste text with placeholders like {business_name}, {service_area}
  - `customization_rules` (jsonb) - Rules for customization
  - `estimated_time_minutes` (integer) - Estimated completion time
  - `is_active` (boolean) - Whether template is currently active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `task_generation_state`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, unique)
  - `business_id` (uuid, references business_profiles)
  - `skill_level` (text) - Current skill level: 'beginner', 'intermediate', 'advanced'
  - `completed_categories` (jsonb) - Completed category counts
  - `completed_templates` (text[]) - Array of completed template IDs
  - `last_task_generated_at` (timestamptz) - Last task generation timestamp
  - `next_task_priority` (text) - Next recommended priority area
  - `profile_completeness_score` (integer) - Profile completeness (0-100)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `task_generation_log`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `task_id` (uuid, references tasks)
  - `template_id` (uuid, references task_templates)
  - `generation_reason` (text) - Why this task was selected
  - `priority_score` (integer) - Calculated priority at generation time
  - `generated_at` (timestamptz) - Generation timestamp

  ## Security
  - Enable RLS on all tables
  - Admin-only access for task_templates
  - User access to their own generation state and logs
*/

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create task_templates table
CREATE TABLE IF NOT EXISTS task_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('website', 'content', 'citations', 'reviews', 'social', 'technical', 'listings', 'foundational')),
  priority_score integer NOT NULL CHECK (priority_score >= 1 AND priority_score <= 100),
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  impact_areas jsonb DEFAULT '{}',
  prerequisites jsonb DEFAULT '{"categories": [], "templates": []}',
  template_text text NOT NULL,
  customization_rules jsonb DEFAULT '{}',
  estimated_time_minutes integer DEFAULT 30,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage task templates"
  ON task_templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "All authenticated users can view active templates"
  ON task_templates FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create task_generation_state table
CREATE TABLE IF NOT EXISTS task_generation_state (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id uuid REFERENCES business_profiles(id) ON DELETE CASCADE,
  skill_level text DEFAULT 'beginner' CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
  completed_categories jsonb DEFAULT '{}',
  completed_templates text[] DEFAULT ARRAY[]::text[],
  last_task_generated_at timestamptz,
  next_task_priority text,
  profile_completeness_score integer DEFAULT 0 CHECK (profile_completeness_score >= 0 AND profile_completeness_score <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE task_generation_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generation state"
  ON task_generation_state FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own generation state"
  ON task_generation_state FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own generation state"
  ON task_generation_state FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can manage all generation states"
  ON task_generation_state FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create task_generation_log table
CREATE TABLE IF NOT EXISTS task_generation_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE SET NULL,
  template_id uuid REFERENCES task_templates(id) ON DELETE SET NULL,
  generation_reason text,
  priority_score integer,
  generated_at timestamptz DEFAULT now()
);

ALTER TABLE task_generation_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generation logs"
  ON task_generation_log FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all generation logs"
  ON task_generation_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "System can insert generation logs"
  ON task_generation_log FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_task_templates_category 
  ON task_templates(category, is_active);

CREATE INDEX IF NOT EXISTS idx_task_templates_priority 
  ON task_templates(priority_score DESC);

CREATE INDEX IF NOT EXISTS idx_task_generation_state_user 
  ON task_generation_state(user_id);

CREATE INDEX IF NOT EXISTS idx_task_generation_log_user 
  ON task_generation_log(user_id, generated_at DESC);

-- Update trigger for updated_at columns
DROP TRIGGER IF EXISTS update_task_templates_updated_at ON task_templates;
CREATE TRIGGER update_task_templates_updated_at
  BEFORE UPDATE ON task_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_task_generation_state_updated_at ON task_generation_state;
CREATE TRIGGER update_task_generation_state_updated_at
  BEFORE UPDATE ON task_generation_state
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
/*
  # Seed Task Template Library

  Populates the task_templates table with a comprehensive library of AI visibility improvement tasks.
  
  Categories:
  - foundational: Essential baseline tasks
  - website: Website optimization
  - content: Content creation and optimization
  - citations: Business citations and listings
  - reviews: Review generation and management
  - social: Social media presence
  - technical: Technical SEO and structured data
  - listings: Directory and platform listings
*/

-- Insert foundational tasks (must be completed first)
INSERT INTO task_templates (title, description, category, priority_score, difficulty_level, impact_areas, prerequisites, template_text, estimated_time_minutes) VALUES

('Verify Your Google Business Profile', 
'Claim and verify your Google Business Profile to establish your primary business identity online.',
'foundational',
100,
'beginner',
'{"visibility": true, "citations": true, "local_search": true}',
'{"categories": [], "templates": []}',
$$Visit https://business.google.com and search for "{business_name}" in {service_area}. If your business appears, claim it. If not, create a new profile. Complete the verification process by phone, email, or postcard. This is the foundation of your online visibility.$$,
45),

('Complete Your Business Profile Information',
'Fill out all available fields in your business profile to maximize AI understanding of your services.',
'foundational',
95,
'beginner',
'{"visibility": true, "completeness": true}',
'{"categories": ["foundational"], "templates": []}',
$$Log into your Google Business Profile and complete these fields:
- Business description (include "{trade_type}" and "{service_area}")
- Services list (add your key services)
- Business hours
- Service areas
- Contact information
- Website URL: {website_url}$$,
30),

-- Website optimization tasks
('Add Structured Data to Your Website',
'Implement LocalBusiness schema markup to help AI systems understand your business information.',
'technical',
85,
'advanced',
'{"visibility": true, "ai_understanding": true, "structured_data": true}',
'{"categories": ["foundational", "website"], "templates": []}',
$$Add this JSON-LD schema to your website <head> section:

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{business_name}",
  "description": "{trade_type} serving {service_area}",
  "telephone": "{phone}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "{service_area}",
    "postalCode": "{postcode}"
  }
}
</script>

This helps AI systems accurately identify and describe your business.$$,
60),

('Create a Dedicated Services Page',
'Build a comprehensive services page that clearly explains what you offer and who you serve.',
'website',
80,
'intermediate',
'{"visibility": true, "content": true, "clarity": true}',
'{"categories": ["foundational"], "templates": []}',
$$Create a services page on {website_url} that:

1. Lists all {trade_type} services you provide
2. Explains who you serve in {service_area}
3. Includes pricing guidance or free quote information
4. Features customer testimonials
5. Has clear contact information

Make sure each service has its own section with descriptive text that AI systems can understand.$$,
90),

-- Content creation tasks
('Write a Comprehensive About Us Page',
'Create an about page that establishes your expertise, credentials, and local presence.',
'content',
75,
'beginner',
'{"visibility": true, "authority": true, "trust": true}',
'{"categories": ["foundational"], "templates": []}',
$$Write an About Us page for {website_url} that includes:

- Your business history and founding story
- Your credentials and qualifications as a {trade_type}
- Your service area ({service_area}) and why you chose this location
- Your team and expertise
- Your commitment to quality and customer service
- Any awards, certifications, or professional memberships

Aim for 500-800 words of genuine, authentic content that shows your expertise.$$,
60),

('Create Location-Specific Content',
'Develop content that demonstrates your local expertise and service area knowledge.',
'content',
70,
'intermediate',
'{"visibility": true, "local_relevance": true, "authority": true}',
'{"categories": ["foundational", "content"], "templates": []}',
$$Create a blog post or service page about "{trade_type} in {service_area}". Include:

- Local building codes or regulations relevant to your work
- Common issues specific to {service_area} properties
- Local landmarks or areas you serve
- Community involvement or local projects
- Why local expertise matters for {trade_type}

This helps AI systems understand your local authority.$$,
75),

-- Citations and listings tasks
('Claim Your Bing Places Listing',
'Establish your presence on Bing to reach users of Microsoft AI systems.',
'listings',
70,
'beginner',
'{"visibility": true, "citations": true, "platform_coverage": true}',
'{"categories": ["foundational"], "templates": []}',
$$Visit https://www.bingplaces.com and claim your business listing:

Business: {business_name}
Type: {trade_type}
Location: {service_area}
Website: {website_url}

Ensure all information matches your Google Business Profile exactly. This helps Microsoft Copilot and Bing AI find and recommend your business.$$,
30),

('Get Listed on Industry-Specific Directories',
'Build citations on trade-specific platforms where AI systems look for service providers.',
'citations',
65,
'intermediate',
'{"visibility": true, "citations": true, "authority": true}',
'{"categories": ["foundational"], "templates": []}',
$$Create profiles on these {trade_type} directories:

1. Checkatrade.com
2. MyBuilder.com
3. TrustATrader.com
4. RatedPeople.com

For each listing:
- Use consistent NAP (Name, Address, Phone)
- Business: {business_name}
- Service area: {service_area}
- Link to: {website_url}
- Upload quality photos of your work
- Request reviews from past customers$$,
90),

-- Review generation tasks
('Request Reviews from Recent Customers',
'Proactively gather authentic reviews to build trust signals for AI systems.',
'reviews',
80,
'beginner',
'{"visibility": true, "trust": true, "social_proof": true}',
'{"categories": ["foundational"], "templates": []}',
$$Send this message to 5 recent satisfied customers:

Hi [Name], thank you for choosing {business_name} for your recent {trade_type} work. We would love to hear about your experience! Would you mind leaving us a review on Google? It really helps other homeowners in {service_area} find reliable tradespeople. Here is the link: [your Google review link]. Thanks so much!

Personalize each message and only contact customers you genuinely served well.$$,
45),

('Respond to Existing Reviews',
'Engage with your reviews to show active business management and customer care.',
'reviews',
60,
'beginner',
'{"trust": true, "engagement": true, "customer_service": true}',
'{"categories": ["foundational"], "templates": []}',
$$Review all your existing Google reviews and respond to any unanswered ones:

For positive reviews:
Thank you for your kind words! We are thrilled you are happy with our {trade_type} work. We appreciate your trust in {business_name} and look forward to serving {service_area} for years to come.

For negative reviews:
We are sorry to hear about your experience. We take all feedback seriously. Please contact us at [phone/email] so we can make this right.

AI systems note businesses that actively engage with customers.$$,
30),

-- Social media tasks
('Create a Facebook Business Page',
'Establish a Facebook presence to increase your digital footprint and citations.',
'social',
55,
'beginner',
'{"visibility": true, "social_presence": true, "citations": true}',
'{"categories": ["foundational"], "templates": []}',
$$Create a Facebook Business Page for {business_name}:

1. Go to facebook.com/pages/create
2. Choose Local Business
3. Fill in:
   - Business name: {business_name}
   - Category: {trade_type}
   - Location: {service_area}
   - Website: {website_url}
4. Upload profile and cover photos
5. Complete the About section
6. Post your first update about your services

This adds another authoritative citation for AI systems to verify your business.$$,
45),

('Share a Recent Project on Social Media',
'Create shareable content that demonstrates your work quality and expertise.',
'social',
50,
'beginner',
'{"visibility": true, "social_proof": true, "content": true}',
'{"categories": ["social"], "templates": []}',
$$Post about a recent {trade_type} project on your social media:

1. Take 3-5 quality photos of the completed work
2. Write a post explaining:
   - The problem you solved
   - Your approach and expertise
   - The result achieved
   - Location (mention {service_area})
3. Use relevant hashtags: #{trade_type} #{service_area} #LocalBusiness
4. Tag the location

This creates searchable content that AI systems can discover and reference.$$,
30),

-- Advanced technical tasks
('Implement FAQ Schema Markup',
'Add FAQ structured data to help AI systems answer questions about your business.',
'technical',
75,
'advanced',
'{"visibility": true, "ai_answers": true, "structured_data": true}',
'{"categories": ["technical"], "templates": []}',
$$Add FAQ schema to your website to help AI provide accurate answers. Add this to your FAQ or services page:

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What {trade_type} services do you offer in {service_area}?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "We provide comprehensive {trade_type} services throughout {service_area}, including [list your main services]."
    }
  }]
}
</script>

Add 3-5 common questions customers ask.$$,
45),

('Create a Sitemap and Submit to Search Engines',
'Help AI systems discover and index all your website content.',
'technical',
65,
'intermediate',
'{"visibility": true, "indexing": true, "discoverability": true}',
'{"categories": ["website"], "templates": []}',
$$Create an XML sitemap for {website_url}:

1. Use a sitemap generator tool or plugin
2. Include all important pages:
   - Homepage
   - Services pages
   - About page
   - Contact page
   - Blog posts
3. Upload to {website_url}/sitemap.xml
4. Submit to Google Search Console
5. Submit to Bing Webmaster Tools

This helps AI systems understand your complete website structure.$$,
40),

-- Additional content tasks
('Write Service-Specific Blog Posts',
'Create detailed content about specific services to capture long-tail searches and AI queries.',
'content',
60,
'intermediate',
'{"visibility": true, "authority": true, "long_tail_search": true}',
'{"categories": ["content"], "templates": []}',
$$Write a detailed blog post (800-1200 words) about one of your {trade_type} services:

Title: Complete Guide to [Specific Service] in {service_area}

Include:
- What the service involves
- Why customers need it
- Your process and expertise
- Typical costs and timeframes
- Common questions
- Local considerations for {service_area}
- Call to action

This helps AI systems provide detailed, accurate answers when users ask about this service.$$,
90),

('Update Your Business Information Across All Platforms',
'Ensure consistent NAP (Name, Address, Phone) across all online platforms.',
'citations',
70,
'beginner',
'{"consistency": true, "citations": true, "trust": true}',
'{"categories": ["foundational"], "templates": []}',
$$Audit and update your business information on all platforms where you are listed:

Ensure these details are identical everywhere:
- Business name: {business_name}
- Trade type: {trade_type}
- Service area: {service_area}
- Website: {website_url}
- Phone number: {phone}

Check: Google, Bing, Facebook, Yelp, trade directories, and any other platforms where you are listed.

Inconsistent information confuses AI systems and reduces your visibility.$$,
60);
/*
  # AI Visibility Scoring Engine

  ## Overview
  Creates a comprehensive scoring system that measures business visibility across AI platforms
  using multi-factor analysis including profile completeness, reviews, citations, content,
  technical SEO, and social presence.

  ## New Tables

  ### `visibility_score_details`
  - `id` (uuid, primary key) - Unique score detail identifier
  - `business_id` (uuid, references business_profiles) - Associated business
  - `score_date` (date) - Date of score calculation
  - `overall_score` (integer, 0-100) - Total AI visibility score
  - `profile_completeness_score` (integer, 0-25) - Profile completion score
  - `review_quality_score` (integer, 0-20) - Review quality and quantity score
  - `citation_presence_score` (integer, 0-20) - Directory and citation score
  - `content_relevance_score` (integer, 0-15) - Content quality score
  - `technical_seo_score` (integer, 0-10) - Technical SEO score
  - `social_presence_score` (integer, 0-10) - Social media presence score
  - `benchmark_percentile` (integer, 0-100) - Percentile rank vs similar businesses
  - `month_over_month_change` (integer) - Change from previous month
  - `recommendations` (jsonb) - Specific improvement recommendations
  - `calculation_metadata` (jsonb) - Details of how score was calculated
  - `created_at` (timestamptz) - Creation timestamp

  ### `scoring_benchmarks`
  - `id` (uuid, primary key) - Benchmark identifier
  - `trade_type` (text) - Type of trade/business
  - `metric_name` (text) - Name of metric being benchmarked
  - `percentile_25` (numeric) - 25th percentile value
  - `percentile_50` (numeric) - 50th percentile (median) value
  - `percentile_75` (numeric) - 75th percentile value
  - `percentile_90` (numeric) - 90th percentile value
  - `sample_size` (integer) - Number of businesses in benchmark
  - `last_updated` (timestamptz) - Last update timestamp
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can view their own scores
  - Admins have full access
*/

-- Create visibility_score_details table
CREATE TABLE IF NOT EXISTS visibility_score_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  score_date date NOT NULL DEFAULT CURRENT_DATE,
  overall_score integer NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  profile_completeness_score integer DEFAULT 0 CHECK (profile_completeness_score >= 0 AND profile_completeness_score <= 25),
  review_quality_score integer DEFAULT 0 CHECK (review_quality_score >= 0 AND review_quality_score <= 20),
  citation_presence_score integer DEFAULT 0 CHECK (citation_presence_score >= 0 AND citation_presence_score <= 20),
  content_relevance_score integer DEFAULT 0 CHECK (content_relevance_score >= 0 AND content_relevance_score <= 15),
  technical_seo_score integer DEFAULT 0 CHECK (technical_seo_score >= 0 AND technical_seo_score <= 10),
  social_presence_score integer DEFAULT 0 CHECK (social_presence_score >= 0 AND social_presence_score <= 10),
  benchmark_percentile integer DEFAULT 0 CHECK (benchmark_percentile >= 0 AND benchmark_percentile <= 100),
  month_over_month_change integer DEFAULT 0,
  recommendations jsonb DEFAULT '[]',
  calculation_metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(business_id, score_date)
);

ALTER TABLE visibility_score_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own score details"
  ON visibility_score_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM business_profiles
      WHERE business_profiles.id = visibility_score_details.business_id
      AND business_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can view all score details"
  ON visibility_score_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admin can insert score details"
  ON visibility_score_details FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admin can update score details"
  ON visibility_score_details FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create scoring_benchmarks table
CREATE TABLE IF NOT EXISTS scoring_benchmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_type text NOT NULL,
  metric_name text NOT NULL,
  percentile_25 numeric DEFAULT 0,
  percentile_50 numeric DEFAULT 0,
  percentile_75 numeric DEFAULT 0,
  percentile_90 numeric DEFAULT 0,
  sample_size integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(trade_type, metric_name)
);

ALTER TABLE scoring_benchmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated users can view benchmarks"
  ON scoring_benchmarks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage benchmarks"
  ON scoring_benchmarks FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_visibility_score_details_business 
  ON visibility_score_details(business_id, score_date DESC);

CREATE INDEX IF NOT EXISTS idx_visibility_score_details_date 
  ON visibility_score_details(score_date DESC);

CREATE INDEX IF NOT EXISTS idx_scoring_benchmarks_trade 
  ON scoring_benchmarks(trade_type, metric_name);

-- Insert default benchmark data for common trades
INSERT INTO scoring_benchmarks (trade_type, metric_name, percentile_25, percentile_50, percentile_75, percentile_90, sample_size) VALUES
('Electrician', 'overall_score', 45, 62, 75, 85, 500),
('Plumber', 'overall_score', 42, 60, 73, 83, 480),
('Builder', 'overall_score', 40, 58, 70, 80, 450),
('Carpenter', 'overall_score', 43, 61, 72, 82, 420),
('Painter', 'overall_score', 38, 55, 68, 78, 400),
('Electrician', 'profile_completeness', 15, 20, 23, 25, 500),
('Plumber', 'profile_completeness', 14, 19, 22, 24, 480),
('Builder', 'profile_completeness', 13, 18, 21, 23, 450),
('Electrician', 'review_quality', 10, 14, 17, 19, 500),
('Plumber', 'review_quality', 9, 13, 16, 18, 480),
('Builder', 'review_quality', 8, 12, 15, 17, 450),
('Electrician', 'citation_presence', 8, 12, 16, 18, 500),
('Plumber', 'citation_presence', 7, 11, 15, 17, 480),
('Builder', 'citation_presence', 6, 10, 14, 16, 450)
ON CONFLICT (trade_type, metric_name) DO NOTHING;
/*
  # Multi-Channel Notification System

  ## Overview
  Creates a comprehensive notification infrastructure for delivering weekly tasks and monthly
  score updates across multiple channels (email, WhatsApp, in-app, SMS). Built with channel
  flexibility and user preferences in mind.

  ## New Tables

  ### `notification_channels`
  - `id` (uuid, primary key) - Channel identifier
  - `name` (text, unique) - Channel name (email, whatsapp, in_app, sms)
  - `display_name` (text) - User-facing channel name
  - `is_enabled` (boolean) - Whether channel is active globally
  - `requires_verification` (boolean) - Whether channel requires user verification
  - `available_plans` (text[]) - Which plans have access to this channel
  - `priority_order` (integer) - Fallback priority (lower = higher priority)
  - `created_at` (timestamptz) - Creation timestamp

  ### `notification_types`
  - `id` (uuid, primary key) - Type identifier
  - `name` (text, unique) - Type name (weekly_task, score_update, etc.)
  - `display_name` (text) - User-facing type name
  - `description` (text) - What this notification is for
  - `default_enabled` (boolean) - Whether enabled by default for new users
  - `user_can_disable` (boolean) - Whether user can turn off this type
  - `created_at` (timestamptz) - Creation timestamp

  ### `notification_templates`
  - `id` (uuid, primary key) - Template identifier
  - `notification_type_id` (uuid) - Reference to notification type
  - `channel_id` (uuid) - Reference to channel
  - `name` (text) - Template identifier
  - `subject_template` (text) - Subject line template (for email/SMS)
  - `content_template` (text) - Content template
  - `html_template` (text) - HTML version (for email)
  - `variables` (jsonb) - Available variables for template
  - `is_active` (boolean) - Whether template is active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `user_notification_preferences`
  - `id` (uuid, primary key) - Preference identifier
  - `user_id` (uuid) - User reference
  - `notification_type_id` (uuid) - Notification type
  - `channel_id` (uuid) - Channel preference
  - `is_enabled` (boolean) - Whether this notification type is enabled for this channel
  - `delivery_time` (time) - Preferred delivery time (if applicable)
  - `delivery_days` (text[]) - Preferred delivery days (if applicable)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `notifications`
  - `id` (uuid, primary key) - Notification identifier
  - `user_id` (uuid) - Target user
  - `notification_type_id` (uuid) - Type of notification
  - `priority` (text) - urgent, high, normal, low
  - `title` (text) - Notification title
  - `content` (text) - Notification content
  - `data` (jsonb) - Additional data payload
  - `scheduled_for` (timestamptz) - When to send
  - `expires_at` (timestamptz) - When notification expires
  - `status` (text) - pending, processing, sent, failed, expired
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `notification_delivery_log`
  - `id` (uuid, primary key) - Log entry identifier
  - `notification_id` (uuid) - Reference to notification
  - `user_id` (uuid) - Target user
  - `channel_id` (uuid) - Delivery channel used
  - `recipient` (text) - Email, phone, etc.
  - `status` (text) - sent, delivered, failed, bounced, opened, clicked
  - `sent_at` (timestamptz) - When sent
  - `delivered_at` (timestamptz) - When delivered
  - `opened_at` (timestamptz) - When opened (if tracked)
  - `clicked_at` (timestamptz) - When clicked (if tracked)
  - `error_message` (text) - Error if failed
  - `provider_response` (jsonb) - Response from email/SMS provider
  - `metadata` (jsonb) - Additional tracking data
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can view and manage their own preferences
  - Users can view their own notification history
  - Admins can manage templates and view all notifications
*/

-- Create notification_channels table
CREATE TABLE IF NOT EXISTS notification_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  is_enabled boolean DEFAULT true,
  requires_verification boolean DEFAULT false,
  available_plans text[] DEFAULT ARRAY['free', 'starter', 'growth', 'enterprise'],
  priority_order integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notification_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view enabled channels"
  ON notification_channels FOR SELECT
  TO authenticated
  USING (is_enabled = true);

CREATE POLICY "Admin can manage channels"
  ON notification_channels FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create notification_types table
CREATE TABLE IF NOT EXISTS notification_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  default_enabled boolean DEFAULT true,
  user_can_disable boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notification_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view notification types"
  ON notification_types FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage notification types"
  ON notification_types FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create notification_templates table
CREATE TABLE IF NOT EXISTS notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_type_id uuid NOT NULL REFERENCES notification_types(id) ON DELETE CASCADE,
  channel_id uuid NOT NULL REFERENCES notification_channels(id) ON DELETE CASCADE,
  name text NOT NULL,
  subject_template text,
  content_template text NOT NULL,
  html_template text,
  variables jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(notification_type_id, channel_id)
);

ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage notification templates"
  ON notification_templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_notification_preferences table
CREATE TABLE IF NOT EXISTS user_notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_type_id uuid NOT NULL REFERENCES notification_types(id) ON DELETE CASCADE,
  channel_id uuid NOT NULL REFERENCES notification_channels(id) ON DELETE CASCADE,
  is_enabled boolean DEFAULT true,
  delivery_time time,
  delivery_days text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, notification_type_id, channel_id)
);

ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_notification_preferences FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own preferences"
  ON user_notification_preferences FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own preferences"
  ON user_notification_preferences FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all preferences"
  ON user_notification_preferences FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_type_id uuid NOT NULL REFERENCES notification_types(id) ON DELETE CASCADE,
  priority text DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  title text NOT NULL,
  content text NOT NULL,
  data jsonb DEFAULT '{}',
  scheduled_for timestamptz DEFAULT now(),
  expires_at timestamptz,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'expired', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create notification_delivery_log table
CREATE TABLE IF NOT EXISTS notification_delivery_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  channel_id uuid NOT NULL REFERENCES notification_channels(id) ON DELETE CASCADE,
  recipient text NOT NULL,
  status text DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'failed', 'bounced', 'opened', 'clicked')),
  sent_at timestamptz DEFAULT now(),
  delivered_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  error_message text,
  provider_response jsonb,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notification_delivery_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own delivery logs"
  ON notification_delivery_log FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all delivery logs"
  ON notification_delivery_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admin can insert delivery logs"
  ON notification_delivery_log FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_status ON notifications(user_id, status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled ON notifications(scheduled_for, status) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_notification ON notification_delivery_log(notification_id);
CREATE INDEX IF NOT EXISTS idx_notification_delivery_log_user ON notification_delivery_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_notification_preferences_user ON user_notification_preferences(user_id);

-- Insert default notification channels
INSERT INTO notification_channels (name, display_name, is_enabled, requires_verification, available_plans, priority_order) VALUES
('email', 'Email', true, true, ARRAY['free', 'starter', 'growth', 'enterprise'], 1),
('in_app', 'In-App', true, false, ARRAY['free', 'starter', 'growth', 'enterprise'], 2),
('whatsapp', 'WhatsApp', false, true, ARRAY['growth', 'enterprise'], 3),
('sms', 'SMS', false, true, ARRAY['enterprise'], 4)
ON CONFLICT (name) DO NOTHING;

-- Insert default notification types
INSERT INTO notification_types (name, display_name, description, default_enabled, user_can_disable) VALUES
('weekly_task', 'Weekly Task', 'Your weekly SEO task is ready', true, false),
('score_update', 'Score Update', 'Your monthly visibility score report', true, true),
('task_reminder', 'Task Reminder', 'Reminder to complete your pending task', true, true),
('system_alert', 'System Alert', 'Important system notifications', true, false),
('marketing', 'Marketing Updates', 'News, tips, and product updates', true, true)
ON CONFLICT (name) DO NOTHING;
/*
  # Analytics and Reporting System

  ## Overview
  Comprehensive analytics infrastructure for tracking user and platform KPIs, enabling
  data-driven decision making and product development insights.

  ## New Tables

  ### `analytics_events`
  Raw event tracking for all user interactions and system events
  - `id` (uuid, primary key) - Event identifier
  - `event_type` (text) - Type of event (task_completed, score_calculated, login, etc.)
  - `event_category` (text) - Category (user_action, system_event, business_metric)
  - `user_id` (uuid) - User who triggered event (null for system events)
  - `business_id` (uuid) - Related business profile
  - `event_data` (jsonb) - Structured event data
  - `metadata` (jsonb) - Additional context (user agent, IP, etc.)
  - `created_at` (timestamptz) - Event timestamp

  ### `user_engagement_metrics`
  Aggregated daily/weekly/monthly metrics per user
  - `id` (uuid, primary key) - Metric identifier
  - `user_id` (uuid) - User reference
  - `period_type` (text) - daily, weekly, monthly
  - `period_start` (date) - Period start date
  - `period_end` (date) - Period end date
  - `tasks_assigned` (integer) - Tasks assigned in period
  - `tasks_completed` (integer) - Tasks completed in period
  - `task_completion_rate` (decimal) - Completion rate percentage
  - `avg_time_to_complete` (interval) - Average completion time
  - `score_at_start` (integer) - Visibility score at period start
  - `score_at_end` (integer) - Visibility score at period end
  - `score_change` (integer) - Score delta
  - `logins_count` (integer) - Number of logins
  - `portal_visits` (integer) - Portal page views
  - `notifications_sent` (integer) - Notifications delivered
  - `notifications_opened` (integer) - Notifications opened
  - `engagement_score` (decimal) - Calculated engagement score
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ### `platform_metrics`
  Aggregated platform-wide metrics
  - `id` (uuid, primary key) - Metric identifier
  - `period_type` (text) - daily, weekly, monthly
  - `period_start` (date) - Period start date
  - `period_end` (date) - Period end date
  - `new_signups` (integer) - New user registrations
  - `trial_starts` (integer) - Users starting trial
  - `trial_conversions` (integer) - Trials converted to paid
  - `trial_conversion_rate` (decimal) - Conversion rate percentage
  - `active_users` (integer) - Users who logged in
  - `paying_customers` (integer) - Users with paid subscriptions
  - `churned_users` (integer) - Users who cancelled
  - `churn_rate` (decimal) - Churn rate percentage
  - `mrr` (decimal) - Monthly recurring revenue
  - `arr` (decimal) - Annual recurring revenue
  - `average_ltv` (decimal) - Average lifetime value
  - `total_tasks_completed` (integer) - Platform-wide task completions
  - `avg_visibility_score` (decimal) - Average user score
  - `total_notifications_sent` (integer) - Platform-wide notifications
  - `notification_open_rate` (decimal) - Notification engagement
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ### `user_cohorts`
  Cohort analysis for tracking user groups over time
  - `id` (uuid, primary key) - Cohort identifier
  - `cohort_name` (text) - Cohort name (e.g., "2024-01")
  - `cohort_start_date` (date) - Cohort start date
  - `cohort_end_date` (date) - Cohort end date
  - `user_ids` (uuid[]) - Array of user IDs in cohort
  - `initial_users` (integer) - Starting user count
  - `retention_month_1` (integer) - Users retained after 1 month
  - `retention_month_2` (integer) - Users retained after 2 months
  - `retention_month_3` (integer) - Users retained after 3 months
  - `retention_month_6` (integer) - Users retained after 6 months
  - `retention_month_12` (integer) - Users retained after 12 months
  - `avg_ltv` (decimal) - Average LTV for cohort
  - `avg_task_completion_rate` (decimal) - Cohort average completion
  - `avg_score_improvement` (decimal) - Cohort average score improvement
  - `metadata` (jsonb) - Additional cohort data
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ### `subscription_events`
  Tracks all subscription lifecycle events for LTV calculation
  - `id` (uuid, primary key) - Event identifier
  - `user_id` (uuid) - User reference
  - `event_type` (text) - started, upgraded, downgraded, renewed, cancelled
  - `from_plan` (text) - Previous plan
  - `to_plan` (text) - New plan
  - `mrr_change` (decimal) - Change in MRR
  - `event_date` (date) - Event date
  - `metadata` (jsonb) - Additional event data
  - `created_at` (timestamptz) - Record creation

  ### `user_lifetime_value`
  Calculated LTV for each user
  - `id` (uuid, primary key) - Record identifier
  - `user_id` (uuid) - User reference
  - `total_revenue` (decimal) - Total revenue from user
  - `months_active` (integer) - Months as customer
  - `current_mrr` (decimal) - Current monthly revenue
  - `predicted_ltv` (decimal) - Predicted lifetime value
  - `customer_acquisition_cost` (decimal) - CAC if known
  - `roi` (decimal) - Return on investment
  - `risk_score` (decimal) - Churn risk score (0-1)
  - `last_payment_date` (date) - Last payment received
  - `calculated_at` (timestamptz) - Last calculation
  - `created_at` (timestamptz) - Record creation
  - `updated_at` (timestamptz) - Last update

  ## Security
  - Enable RLS on all tables
  - Users can view their own metrics
  - Only admins can view platform metrics
  - All event tracking is system-only

  ## Performance
  - Indexes on user_id, period dates, event types
  - Partitioning strategy for analytics_events by month
*/

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_category text NOT NULL CHECK (event_category IN ('user_action', 'system_event', 'business_metric', 'engagement')),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  business_id uuid REFERENCES business_profiles(id) ON DELETE SET NULL,
  event_data jsonb DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can insert events"
  ON analytics_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view all events"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_engagement_metrics table
CREATE TABLE IF NOT EXISTS user_engagement_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  period_type text NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  period_start date NOT NULL,
  period_end date NOT NULL,
  tasks_assigned integer DEFAULT 0,
  tasks_completed integer DEFAULT 0,
  task_completion_rate decimal(5,2) DEFAULT 0,
  avg_time_to_complete interval,
  score_at_start integer,
  score_at_end integer,
  score_change integer DEFAULT 0,
  logins_count integer DEFAULT 0,
  portal_visits integer DEFAULT 0,
  notifications_sent integer DEFAULT 0,
  notifications_opened integer DEFAULT 0,
  engagement_score decimal(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, period_type, period_start)
);

ALTER TABLE user_engagement_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own metrics"
  ON user_engagement_metrics FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all user metrics"
  ON user_engagement_metrics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create platform_metrics table
CREATE TABLE IF NOT EXISTS platform_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  period_type text NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  period_start date NOT NULL,
  period_end date NOT NULL,
  new_signups integer DEFAULT 0,
  trial_starts integer DEFAULT 0,
  trial_conversions integer DEFAULT 0,
  trial_conversion_rate decimal(5,2) DEFAULT 0,
  active_users integer DEFAULT 0,
  paying_customers integer DEFAULT 0,
  churned_users integer DEFAULT 0,
  churn_rate decimal(5,2) DEFAULT 0,
  mrr decimal(12,2) DEFAULT 0,
  arr decimal(12,2) DEFAULT 0,
  average_ltv decimal(12,2) DEFAULT 0,
  total_tasks_completed integer DEFAULT 0,
  avg_visibility_score decimal(5,2) DEFAULT 0,
  total_notifications_sent integer DEFAULT 0,
  notification_open_rate decimal(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(period_type, period_start)
);

ALTER TABLE platform_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage platform metrics"
  ON platform_metrics FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_cohorts table
CREATE TABLE IF NOT EXISTS user_cohorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_name text NOT NULL UNIQUE,
  cohort_start_date date NOT NULL,
  cohort_end_date date NOT NULL,
  user_ids uuid[] DEFAULT ARRAY[]::uuid[],
  initial_users integer DEFAULT 0,
  retention_month_1 integer DEFAULT 0,
  retention_month_2 integer DEFAULT 0,
  retention_month_3 integer DEFAULT 0,
  retention_month_6 integer DEFAULT 0,
  retention_month_12 integer DEFAULT 0,
  avg_ltv decimal(12,2) DEFAULT 0,
  avg_task_completion_rate decimal(5,2) DEFAULT 0,
  avg_score_improvement decimal(5,2) DEFAULT 0,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage cohorts"
  ON user_cohorts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create subscription_events table
CREATE TABLE IF NOT EXISTS subscription_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('started', 'upgraded', 'downgraded', 'renewed', 'cancelled', 'reactivated')),
  from_plan text,
  to_plan text,
  mrr_change decimal(10,2) DEFAULT 0,
  event_date date DEFAULT CURRENT_DATE,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscription_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can insert subscription events"
  ON subscription_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view subscription events"
  ON subscription_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create user_lifetime_value table
CREATE TABLE IF NOT EXISTS user_lifetime_value (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_revenue decimal(12,2) DEFAULT 0,
  months_active integer DEFAULT 0,
  current_mrr decimal(10,2) DEFAULT 0,
  predicted_ltv decimal(12,2) DEFAULT 0,
  customer_acquisition_cost decimal(10,2) DEFAULT 0,
  roi decimal(10,2) DEFAULT 0,
  risk_score decimal(3,2) DEFAULT 0,
  last_payment_date date,
  calculated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_lifetime_value ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own LTV"
  ON user_lifetime_value FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage LTV"
  ON user_lifetime_value FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_category ON analytics_events(event_category, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_engagement_user_period ON user_engagement_metrics(user_id, period_type, period_start DESC);
CREATE INDEX IF NOT EXISTS idx_user_engagement_period ON user_engagement_metrics(period_start DESC, period_type);

CREATE INDEX IF NOT EXISTS idx_platform_metrics_period ON platform_metrics(period_start DESC, period_type);

CREATE INDEX IF NOT EXISTS idx_subscription_events_user ON subscription_events(user_id, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_subscription_events_date ON subscription_events(event_date DESC);

CREATE INDEX IF NOT EXISTS idx_user_ltv_user ON user_lifetime_value(user_id);
CREATE INDEX IF NOT EXISTS idx_user_ltv_risk ON user_lifetime_value(risk_score DESC);

-- Create helper function to track events
CREATE OR REPLACE FUNCTION track_analytics_event(
  p_event_type text,
  p_event_category text,
  p_user_id uuid DEFAULT NULL,
  p_business_id uuid DEFAULT NULL,
  p_event_data jsonb DEFAULT '{}'::jsonb,
  p_metadata jsonb DEFAULT '{}'::jsonb
) RETURNS uuid AS $$
DECLARE
  v_event_id uuid;
BEGIN
  INSERT INTO analytics_events (
    event_type,
    event_category,
    user_id,
    business_id,
    event_data,
    metadata
  ) VALUES (
    p_event_type,
    p_event_category,
    p_user_id,
    p_business_id,
    p_event_data,
    p_metadata
  ) RETURNING id INTO v_event_id;
  
  RETURN v_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
/*
  # Free AI Visibility Score System

  ## Overview
  Extends the existing visibility scoring system to support free, preview-only diagnostic scores
  that serve as a conversion tool. Free scores are lightweight, high-level assessments that
  demonstrate value without providing full service features.

  ## Changes to Existing Tables

  ### `visibility_score_details`
  Add three new columns:
  - `is_free_preview` (boolean) - Marks if this is a free diagnostic score
  - `score_band` (text) - Simple category: 'Low', 'Medium', 'High'
  - `summary_text` (text) - Plain-English explanation of the score

  ## New Tables

  ### `free_score_submissions`
  Tracks free score requests before users create full accounts:
  - `id` (uuid, primary key) - Unique submission identifier
  - `email` (text, optional) - Contact email if provided
  - `business_name` (text) - Name of the business
  - `trade_type` (text) - Type of trade/business
  - `location` (text) - Business location
  - `website_url` (text, optional) - Website or Google Business link
  - `calculated_score` (integer) - The free visibility score (0-100)
  - `score_band` (text) - Low/Medium/High classification
  - `summary_text` (text) - Explanation of what the score means
  - `converted_to_user` (boolean) - Whether they signed up
  - `user_id` (uuid, optional) - If they converted, link to user
  - `created_at` (timestamptz) - Submission timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Free score submissions are publicly insertable (to allow pre-auth submissions)
  - Users can view their own submissions after auth
  - Admins can view all submissions

  ## Notes
  - Free scores use simplified calculation logic
  - No detailed breakdowns or recommendations included
  - Designed to demonstrate value and drive conversions
*/

-- Extend visibility_score_details table with free preview fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'visibility_score_details' AND column_name = 'is_free_preview'
  ) THEN
    ALTER TABLE visibility_score_details ADD COLUMN is_free_preview boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'visibility_score_details' AND column_name = 'score_band'
  ) THEN
    ALTER TABLE visibility_score_details ADD COLUMN score_band text CHECK (score_band IN ('Low', 'Medium', 'High'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'visibility_score_details' AND column_name = 'summary_text'
  ) THEN
    ALTER TABLE visibility_score_details ADD COLUMN summary_text text;
  END IF;
END $$;

-- Create free_score_submissions table
CREATE TABLE IF NOT EXISTS free_score_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  business_name text NOT NULL,
  trade_type text NOT NULL,
  location text NOT NULL,
  website_url text,
  calculated_score integer NOT NULL CHECK (calculated_score >= 0 AND calculated_score <= 100),
  score_band text NOT NULL CHECK (score_band IN ('Low', 'Medium', 'High')),
  summary_text text NOT NULL,
  converted_to_user boolean DEFAULT false,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE free_score_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a free score (pre-auth)
CREATE POLICY "Anyone can submit free score"
  ON free_score_submissions FOR INSERT
  WITH CHECK (true);

-- Users can view their own submissions (by email or user_id)
CREATE POLICY "Users can view own submissions"
  ON free_score_submissions FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Admins can view all submissions
CREATE POLICY "Admin can view all submissions"
  ON free_score_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Admins can update submissions (e.g., mark as converted)
CREATE POLICY "Admin can update submissions"
  ON free_score_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_free_score_submissions_email 
  ON free_score_submissions(email);

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_user 
  ON free_score_submissions(user_id);

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_created 
  ON free_score_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_free_score_submissions_converted 
  ON free_score_submissions(converted_to_user);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_free_score_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_free_score_submissions_updated_at_trigger ON free_score_submissions;
CREATE TRIGGER update_free_score_submissions_updated_at_trigger
  BEFORE UPDATE ON free_score_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_free_score_submissions_updated_at();/*
  # Rex Decision Engine - Entity Confidence Engineering System

  ## Overview
  Implements Rex, an AI decision engine that uses Entity Confidence Engineering (ECE)
  to generate ONE human-approved action at a time to increase business visibility
  through entity clarity, consensus, and trust.

  ## Core Principles
  - ONE recommendation per business at a time
  - All actions require explicit human approval
  - Focus on 5 ECE pillars: Entity Clarity, Consensus Shaping, Answer Readiness, 
    Risk Reduction, and Confidence Accretion
  - Conservative, incremental, trust-first approach

  ## New Tables
  1. `rex_ece_evaluations` - Stores ECE pillar assessments for each business
  2. `rex_recommendations` - Current ONE active recommendation per business
  3. `rex_action_history` - Historical record of completed actions and impact
  4. `rex_confidence_scores` - Time-series tracking of confidence accretion
  5. `rex_evaluation_criteria` - Configurable criteria for ECE assessment

  ## Security
  - RLS enabled on all tables
  - Users can only access their own business data
  - Admins can view all data for support purposes
*/

-- ============================================================================
-- ECE EVALUATION CRITERIA
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_evaluation_criteria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pillar text NOT NULL CHECK (pillar IN (
    'entity_clarity',
    'consensus_shaping', 
    'answer_readiness',
    'risk_reduction',
    'confidence_accretion'
  )),
  criterion_key text NOT NULL,
  criterion_name text NOT NULL,
  description text NOT NULL,
  weight integer NOT NULL DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(pillar, criterion_key)
);

ALTER TABLE rex_evaluation_criteria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active criteria"
  ON rex_evaluation_criteria FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admin can manage criteria"
  ON rex_evaluation_criteria FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- ============================================================================
-- ECE EVALUATIONS (5 Pillars Assessment)
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_ece_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Entity Clarity (0-100)
  entity_clarity_score integer NOT NULL DEFAULT 0 CHECK (entity_clarity_score BETWEEN 0 AND 100),
  entity_clarity_notes text,
  entity_clarity_weaknesses jsonb DEFAULT '[]'::jsonb,
  
  -- Consensus Shaping (0-100)
  consensus_score integer NOT NULL DEFAULT 0 CHECK (consensus_score BETWEEN 0 AND 100),
  consensus_notes text,
  consensus_conflicts jsonb DEFAULT '[]'::jsonb,
  
  -- Answer Readiness (0-100)
  answer_readiness_score integer NOT NULL DEFAULT 0 CHECK (answer_readiness_score BETWEEN 0 AND 100),
  answer_readiness_notes text,
  answer_readiness_gaps jsonb DEFAULT '[]'::jsonb,
  
  -- Risk Reduction (0-100)
  risk_reduction_score integer NOT NULL DEFAULT 0 CHECK (risk_reduction_score BETWEEN 0 AND 100),
  risk_reduction_notes text,
  risk_factors jsonb DEFAULT '[]'::jsonb,
  
  -- Confidence Accretion (0-100)
  confidence_score integer NOT NULL DEFAULT 0 CHECK (confidence_score BETWEEN 0 AND 100),
  confidence_notes text,
  confidence_opportunities jsonb DEFAULT '[]'::jsonb,
  
  -- Overall Assessment
  overall_score integer GENERATED ALWAYS AS (
    (entity_clarity_score + consensus_score + answer_readiness_score + 
     risk_reduction_score + confidence_score) / 5
  ) STORED,
  weakest_pillar text,
  evaluation_data jsonb DEFAULT '{}'::jsonb,
  
  evaluated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rex_ece_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own evaluations"
  ON rex_ece_evaluations FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert own evaluations"
  ON rex_ece_evaluations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all evaluations"
  ON rex_ece_evaluations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_rex_evaluations_business ON rex_ece_evaluations(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_evaluations_user ON rex_ece_evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_rex_evaluations_overall_score ON rex_ece_evaluations(overall_score);
CREATE INDEX IF NOT EXISTS idx_rex_evaluations_evaluated_at ON rex_ece_evaluations(evaluated_at);

-- ============================================================================
-- REX RECOMMENDATIONS (ONE Active Per Business)
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  evaluation_id uuid REFERENCES rex_ece_evaluations(id) ON DELETE SET NULL,
  
  -- Recommendation Details
  target_pillar text NOT NULL CHECK (target_pillar IN (
    'entity_clarity',
    'consensus_shaping',
    'answer_readiness',
    'risk_reduction',
    'confidence_accretion'
  )),
  action_type text NOT NULL,
  title text NOT NULL,
  explanation text NOT NULL,
  exact_copy text,
  application_location text NOT NULL,
  expected_impact text NOT NULL,
  estimated_minutes integer DEFAULT 5,
  
  -- Status Tracking
  status text NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft',
    'sent_to_admin',
    'sent_to_customer',
    'approved',
    'in_progress',
    'completed',
    'declined',
    'superseded'
  )),
  
  -- Approval Workflow
  generated_at timestamptz DEFAULT now(),
  sent_to_admin_at timestamptz,
  sent_to_customer_at timestamptz,
  approved_at timestamptz,
  completed_at timestamptz,
  declined_at timestamptz,
  decline_reason text,
  
  -- Impact Tracking
  completion_notes text,
  actual_impact_notes text,
  confidence_increase integer,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create partial unique index to ensure only ONE active recommendation per business
CREATE UNIQUE INDEX IF NOT EXISTS idx_rex_recommendations_one_active_per_business 
ON rex_recommendations(business_id) 
WHERE status IN ('draft', 'sent_to_admin', 'sent_to_customer', 'approved', 'in_progress');

ALTER TABLE rex_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own recommendations"
  ON rex_recommendations FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update own recommendations"
  ON rex_recommendations FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all recommendations"
  ON rex_recommendations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admin can manage recommendations"
  ON rex_recommendations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_rex_recommendations_business ON rex_recommendations(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_user ON rex_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_status ON rex_recommendations(status);
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_target_pillar ON rex_recommendations(target_pillar);

-- ============================================================================
-- REX ACTION HISTORY
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_action_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recommendation_id uuid REFERENCES rex_recommendations(id) ON DELETE SET NULL,
  evaluation_id uuid REFERENCES rex_ece_evaluations(id) ON DELETE SET NULL,
  
  -- Action Details
  target_pillar text NOT NULL,
  action_type text NOT NULL,
  title text NOT NULL,
  what_changed text NOT NULL,
  where_applied text NOT NULL,
  
  -- Impact Measurement
  confidence_before integer,
  confidence_after integer,
  confidence_increase integer,
  pillar_score_before integer,
  pillar_score_after integer,
  impact_notes text,
  
  -- Timeline
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rex_action_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own action history"
  ON rex_action_history FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert own action history"
  ON rex_action_history FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all action history"
  ON rex_action_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_rex_history_business ON rex_action_history(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_history_user ON rex_action_history(user_id);
CREATE INDEX IF NOT EXISTS idx_rex_history_completed ON rex_action_history(completed_at);
CREATE INDEX IF NOT EXISTS idx_rex_history_pillar ON rex_action_history(target_pillar);

-- ============================================================================
-- REX CONFIDENCE SCORES (Time-Series)
-- ============================================================================

CREATE TABLE IF NOT EXISTS rex_confidence_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Pillar Scores
  entity_clarity_score integer NOT NULL DEFAULT 0 CHECK (entity_clarity_score BETWEEN 0 AND 100),
  consensus_score integer NOT NULL DEFAULT 0 CHECK (consensus_score BETWEEN 0 AND 100),
  answer_readiness_score integer NOT NULL DEFAULT 0 CHECK (answer_readiness_score BETWEEN 0 AND 100),
  risk_reduction_score integer NOT NULL DEFAULT 0 CHECK (risk_reduction_score BETWEEN 0 AND 100),
  confidence_score integer NOT NULL DEFAULT 0 CHECK (confidence_score BETWEEN 0 AND 100),
  
  -- Overall
  overall_confidence integer NOT NULL DEFAULT 0 CHECK (overall_confidence BETWEEN 0 AND 100),
  
  -- Context
  measurement_type text NOT NULL CHECK (measurement_type IN (
    'initial',
    'post_action',
    'monthly_review',
    'manual'
  )),
  triggered_by_action_id uuid REFERENCES rex_action_history(id) ON DELETE SET NULL,
  notes text,
  
  measured_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rex_confidence_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own confidence scores"
  ON rex_confidence_scores FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert own confidence scores"
  ON rex_confidence_scores FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Admin can view all confidence scores"
  ON rex_confidence_scores FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_rex_confidence_business ON rex_confidence_scores(business_id);
CREATE INDEX IF NOT EXISTS idx_rex_confidence_user ON rex_confidence_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_rex_confidence_measured ON rex_confidence_scores(measured_at);
CREATE INDEX IF NOT EXISTS idx_rex_confidence_type ON rex_confidence_scores(measurement_type);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION get_active_rex_recommendation(p_business_id uuid)
RETURNS TABLE (
  recommendation_id uuid,
  title text,
  status text,
  target_pillar text,
  generated_at timestamptz
)
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    id,
    rex_recommendations.title,
    rex_recommendations.status,
    rex_recommendations.target_pillar,
    rex_recommendations.generated_at
  FROM rex_recommendations
  WHERE business_id = p_business_id
    AND status IN ('draft', 'sent_to_admin', 'sent_to_customer', 'approved', 'in_progress')
  ORDER BY generated_at DESC
  LIMIT 1;
END;
$$;

CREATE OR REPLACE FUNCTION get_confidence_trend(p_business_id uuid, p_days integer DEFAULT 30)
RETURNS TABLE (
  measured_at timestamptz,
  overall_confidence integer,
  entity_clarity integer,
  consensus integer,
  answer_readiness integer,
  risk_reduction integer,
  confidence integer
)
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rex_confidence_scores.measured_at,
    rex_confidence_scores.overall_confidence,
    rex_confidence_scores.entity_clarity_score,
    rex_confidence_scores.consensus_score,
    rex_confidence_scores.answer_readiness_score,
    rex_confidence_scores.risk_reduction_score,
    rex_confidence_scores.confidence_score
  FROM rex_confidence_scores
  WHERE business_id = p_business_id
    AND measured_at >= now() - (p_days || ' days')::interval
  ORDER BY measured_at ASC;
END;
$$;

-- ============================================================================
-- SEED DEFAULT ECE CRITERIA
-- ============================================================================

INSERT INTO rex_evaluation_criteria (pillar, criterion_key, criterion_name, description, weight) VALUES
('entity_clarity', 'business_role_clear', 'Business Role Clarity', 'Is what the business does immediately clear and unambiguous?', 5),
('entity_clarity', 'service_location_consistent', 'Service + Location Consistency', 'Are services and service areas consistently described everywhere?', 4),
('entity_clarity', 'primary_service_obvious', 'Primary Service Obvious', 'Can someone instantly name the main service offered?', 5),
('entity_clarity', 'no_generic_terms', 'No Generic Terminology', 'Avoids vague terms like solutions or services', 3),

('consensus_shaping', 'website_profile_match', 'Website-Profile Alignment', 'Website and profiles describe business identically', 5),
('consensus_shaping', 'review_description_match', 'Review-Description Consistency', 'Customer reviews reflect stated services', 4),
('consensus_shaping', 'no_conflicting_categories', 'No Category Conflicts', 'Business categories are consistent across platforms', 4),
('consensus_shaping', 'unified_value_prop', 'Unified Value Proposition', 'Core promise is stated the same way everywhere', 5),

('answer_readiness', 'faq_answer_style', 'FAQ in Answer Format', 'FAQs written as direct answers to questions', 4),
('answer_readiness', 'service_desc_conversational', 'Conversational Service Descriptions', 'Services described in natural, helpful language', 3),
('answer_readiness', 'location_pages_specific', 'Specific Location Content', 'Location pages answer why hire us HERE', 4),
('answer_readiness', 'anticipates_objections', 'Addresses Concerns', 'Content preemptively answers common concerns', 3),

('risk_reduction', 'credentials_explicit', 'Explicit Credentials', 'Licenses, certifications prominently displayed and verifiable', 5),
('risk_reduction', 'boundaries_clear', 'Clear Service Boundaries', 'Explicitly states what is and is not offered', 4),
('risk_reduction', 'verification_easy', 'Easy Verification', 'Claims can be quickly fact-checked', 5),
('risk_reduction', 'contact_transparent', 'Transparent Contact Info', 'Real address, phone, contact methods visible', 3),

('confidence_accretion', 'incremental_improvements', 'Small Consistent Improvements', 'Regular small updates vs rare big changes', 4),
('confidence_accretion', 'review_response_quality', 'Review Response Quality', 'Thoughtful, specific responses to reviews', 3),
('confidence_accretion', 'content_freshness', 'Content Freshness', 'Recent updates signal active business', 3),
('confidence_accretion', 'proof_elements', 'Trust Proof Elements', 'Before/after, testimonials, case examples present', 4)
ON CONFLICT (pillar, criterion_key) DO NOTHING;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_rex_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_rex_evaluation_criteria_updated_at
  BEFORE UPDATE ON rex_evaluation_criteria
  FOR EACH ROW
  EXECUTE FUNCTION update_rex_updated_at();

CREATE TRIGGER update_rex_ece_evaluations_updated_at
  BEFORE UPDATE ON rex_ece_evaluations
  FOR EACH ROW
  EXECUTE FUNCTION update_rex_updated_at();

CREATE TRIGGER update_rex_recommendations_updated_at
  BEFORE UPDATE ON rex_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION update_rex_updated_at();/*
  # Integration Management System

  1. New Tables
    - `integration_providers`
      - Metadata for available integrations (Stripe, Google, Facebook, etc.)
      - Configuration and feature flags
      - API endpoints and OAuth settings

    - `user_integrations`
      - User-specific integration connections
      - Connection status and health
      - Settings and preferences
      - Sync timestamps

    - `integration_credentials`
      - Encrypted API keys and OAuth tokens
      - Token expiry tracking
      - Secure credential storage

    - `integration_webhooks`
      - Webhook event logging
      - Processing status and retries
      - Event deduplication

    - `integration_sync_log`
      - Sync history and audit trail
      - Performance metrics
      - Error tracking

  2. Security
    - Enable RLS on all tables
    - Users can only see their own integrations
    - Admins can view all integrations
    - Credentials encrypted before storage
    - Audit logging for sensitive operations

  3. Important Notes
    - Credentials table uses encryption_key_id for key rotation
    - Webhook events deduplicated by external_event_id
    - Sync log retained for 90 days (can be partitioned)
    - Health checks run periodically via edge functions
*/

-- Integration Providers (master list of available integrations)
CREATE TABLE IF NOT EXISTS integration_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  description text,
  logo_url text,
  category text NOT NULL CHECK (category IN ('payment', 'social_media', 'business_tools', 'analytics', 'crm', 'email', 'communication', 'reviews')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'beta', 'coming_soon', 'deprecated')),

  -- API Configuration
  api_base_url text,
  api_version text,
  rate_limit_per_minute integer,

  -- OAuth Configuration
  requires_oauth boolean DEFAULT false,
  oauth_authorize_url text,
  oauth_token_url text,
  oauth_scopes text[],

  -- Features
  features jsonb DEFAULT '{}',
  webhook_support boolean DEFAULT false,
  webhook_url text,

  -- Metadata
  documentation_url text,
  support_url text,
  terms_url text,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Integration Connections
CREATE TABLE IF NOT EXISTS user_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES integration_providers(id) ON DELETE CASCADE,

  -- Connection Status
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error', 'expired', 'disconnected')),
  health_status text DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'warning', 'error', 'unknown')),

  -- External IDs
  external_account_id text,
  external_account_name text,

  -- Settings
  settings jsonb DEFAULT '{}',
  auto_sync boolean DEFAULT true,
  sync_frequency_minutes integer DEFAULT 1440, -- Daily by default

  -- Timestamps
  connected_at timestamptz DEFAULT now(),
  last_synced_at timestamptz,
  last_health_check_at timestamptz,
  token_expires_at timestamptz,
  disconnected_at timestamptz,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(user_id, provider_id, external_account_id)
);

-- Integration Credentials (encrypted storage)
CREATE TABLE IF NOT EXISTS integration_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_integration_id uuid NOT NULL REFERENCES user_integrations(id) ON DELETE CASCADE,

  -- Credential Type
  credential_type text NOT NULL CHECK (credential_type IN ('api_key', 'oauth_token', 'oauth_refresh_token', 'webhook_secret', 'client_secret')),

  -- Encrypted Data
  encrypted_value text NOT NULL,
  encryption_key_id uuid NOT NULL, -- For key rotation
  encryption_method text NOT NULL DEFAULT 'aes-256-gcm',

  -- Metadata
  expires_at timestamptz,
  scope text[],

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(user_integration_id, credential_type)
);

-- Integration Webhook Events
CREATE TABLE IF NOT EXISTS integration_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_integration_id uuid REFERENCES user_integrations(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES integration_providers(id) ON DELETE CASCADE,

  -- Event Data
  external_event_id text NOT NULL,
  event_type text NOT NULL,
  event_data jsonb NOT NULL,
  raw_payload text,

  -- Processing
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'failed', 'skipped')),
  processed_at timestamptz,
  retry_count integer DEFAULT 0,
  max_retries integer DEFAULT 3,
  next_retry_at timestamptz,

  -- Error Tracking
  error_message text,
  error_details jsonb,

  -- Security
  signature_verified boolean DEFAULT false,
  source_ip inet,

  received_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(provider_id, external_event_id) -- Prevent duplicate processing
);

-- Integration Sync Log
CREATE TABLE IF NOT EXISTS integration_sync_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_integration_id uuid NOT NULL REFERENCES user_integrations(id) ON DELETE CASCADE,

  -- Sync Details
  sync_type text NOT NULL CHECK (sync_type IN ('manual', 'scheduled', 'webhook', 'realtime')),
  sync_direction text NOT NULL CHECK (sync_direction IN ('inbound', 'outbound', 'bidirectional')),

  -- Status
  status text NOT NULL CHECK (status IN ('started', 'in_progress', 'completed', 'failed', 'partial')),

  -- Metrics
  records_processed integer DEFAULT 0,
  records_created integer DEFAULT 0,
  records_updated integer DEFAULT 0,
  records_failed integer DEFAULT 0,
  duration_ms integer,

  -- Error Tracking
  error_message text,
  error_details jsonb,

  -- Metadata
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_integration_providers_status ON integration_providers(status);
CREATE INDEX IF NOT EXISTS idx_integration_providers_category ON integration_providers(category);

CREATE INDEX IF NOT EXISTS idx_user_integrations_user_id ON user_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_provider_id ON user_integrations(provider_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_status ON user_integrations(status);
CREATE INDEX IF NOT EXISTS idx_user_integrations_last_synced ON user_integrations(last_synced_at);

CREATE INDEX IF NOT EXISTS idx_integration_credentials_user_integration ON integration_credentials(user_integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_credentials_expires ON integration_credentials(expires_at) WHERE expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_integration_webhooks_provider ON integration_webhooks(provider_id);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_user_integration ON integration_webhooks(user_integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_status ON integration_webhooks(status);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_next_retry ON integration_webhooks(next_retry_at) WHERE status = 'failed' AND retry_count < max_retries;
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_created ON integration_webhooks(created_at);

CREATE INDEX IF NOT EXISTS idx_integration_sync_log_user_integration ON integration_sync_log(user_integration_id);
CREATE INDEX IF NOT EXISTS idx_integration_sync_log_status ON integration_sync_log(status);
CREATE INDEX IF NOT EXISTS idx_integration_sync_log_created ON integration_sync_log(created_at);

-- Enable Row Level Security
ALTER TABLE integration_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_sync_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Integration Providers: Public read for authenticated users
CREATE POLICY "Anyone can view available integrations"
  ON integration_providers FOR SELECT
  TO authenticated
  USING (status IN ('active', 'beta'));

-- User Integrations: Users see only their own
CREATE POLICY "Users view own integrations"
  ON user_integrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own integrations"
  ON user_integrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own integrations"
  ON user_integrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own integrations"
  ON user_integrations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Integration Credentials: Users access only their own
CREATE POLICY "Users view own credentials"
  ON integration_credentials FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

CREATE POLICY "Users insert own credentials"
  ON integration_credentials FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

CREATE POLICY "Users update own credentials"
  ON integration_credentials FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

CREATE POLICY "Users delete own credentials"
  ON integration_credentials FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_credentials.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

-- Integration Webhooks: System can insert, users can view their own
CREATE POLICY "System inserts webhooks"
  ON integration_webhooks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users view own webhooks"
  ON integration_webhooks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_webhooks.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

-- Integration Sync Log: System can insert, users can view their own
CREATE POLICY "System inserts sync logs"
  ON integration_sync_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users view own sync logs"
  ON integration_sync_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_integrations ui
      WHERE ui.id = integration_sync_log.user_integration_id
      AND ui.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_integration_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_integration_providers_updated_at
  BEFORE UPDATE ON integration_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_user_integrations_updated_at
  BEFORE UPDATE ON user_integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_integration_credentials_updated_at
  BEFORE UPDATE ON integration_credentials
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_integration_webhooks_updated_at
  BEFORE UPDATE ON integration_webhooks
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();
/*
  # Stripe Integration Schema

  1. New Tables
    - `stripe_customers`
      - Maps Rex users to Stripe customers
      - Customer metadata and status
      - Sync tracking

    - `stripe_products`
      - Product catalog from Stripe
      - Feature mappings
      - Pricing information

    - `stripe_prices`
      - Price details for products
      - Billing intervals
      - Currency support

    - `stripe_subscriptions`
      - Active and historical subscriptions
      - Status tracking
      - Billing cycle information

    - `stripe_invoices`
      - Invoice history
      - Payment status
      - PDF links

    - `stripe_payment_methods`
      - Stored payment methods
      - Default payment method tracking
      - Card/bank details (last 4 digits only)

    - `stripe_webhook_events`
      - Stripe-specific webhook events
      - Processing status
      - Event data

  2. Security
    - Enable RLS on all tables
    - Users can only see their own Stripe data
    - No sensitive card data stored (PCI compliance)
    - Admins can view aggregated metrics

  3. Important Notes
    - No full card numbers stored (PCI compliance)
    - Webhook events deduplicated by stripe_event_id
    - Subscription status synced via webhooks
    - Failed payment retry logic handled by Stripe
*/

-- Stripe Customers
CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id text NOT NULL UNIQUE,

  -- Customer Info
  email text,
  name text,
  phone text,

  -- Billing Address
  billing_address jsonb,

  -- Status
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deleted')),
  delinquent boolean DEFAULT false,

  -- Balance
  account_balance integer DEFAULT 0, -- In cents
  currency text DEFAULT 'gbp',

  -- Metadata
  metadata jsonb DEFAULT '{}',

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Products
CREATE TABLE IF NOT EXISTS stripe_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_product_id text NOT NULL UNIQUE,

  -- Product Info
  name text NOT NULL,
  description text,
  active boolean DEFAULT true,

  -- Features
  features text[],
  feature_map jsonb DEFAULT '{}', -- Maps to app features

  -- Metadata
  metadata jsonb DEFAULT '{}',
  images text[],

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Prices
CREATE TABLE IF NOT EXISTS stripe_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_price_id text NOT NULL UNIQUE,
  stripe_product_id text NOT NULL REFERENCES stripe_products(stripe_product_id) ON DELETE CASCADE,

  -- Pricing
  unit_amount integer, -- In cents
  currency text DEFAULT 'gbp',
  billing_scheme text DEFAULT 'per_unit' CHECK (billing_scheme IN ('per_unit', 'tiered', 'volume')),

  -- Recurring
  recurring_interval text CHECK (recurring_interval IN ('day', 'week', 'month', 'year')),
  recurring_interval_count integer DEFAULT 1,
  recurring_usage_type text CHECK (recurring_usage_type IN ('metered', 'licensed')),

  -- Tiers (for tiered pricing)
  tiers jsonb,

  -- Status
  active boolean DEFAULT true,
  
  -- Metadata
  metadata jsonb DEFAULT '{}',

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Subscriptions
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_subscription_id text NOT NULL UNIQUE,
  stripe_customer_id text NOT NULL REFERENCES stripe_customers(stripe_customer_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Subscription Details
  status text NOT NULL CHECK (status IN ('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused')),
  
  -- Items (can have multiple price IDs)
  items jsonb NOT NULL, -- Array of subscription items with price_id and quantity

  -- Billing
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  canceled_at timestamptz,
  ended_at timestamptz,

  -- Trial
  trial_start timestamptz,
  trial_end timestamptz,

  -- Amounts
  latest_invoice_id text,
  latest_invoice_amount integer, -- In cents

  -- Payment
  default_payment_method text,
  collection_method text DEFAULT 'charge_automatically' CHECK (collection_method IN ('charge_automatically', 'send_invoice')),

  -- Metadata
  metadata jsonb DEFAULT '{}',
  description text,

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Invoices
CREATE TABLE IF NOT EXISTS stripe_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_invoice_id text NOT NULL UNIQUE,
  stripe_customer_id text NOT NULL REFERENCES stripe_customers(stripe_customer_id) ON DELETE CASCADE,
  stripe_subscription_id text REFERENCES stripe_subscriptions(stripe_subscription_id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Invoice Details
  number text,
  status text CHECK (status IN ('draft', 'open', 'paid', 'uncollectible', 'void')),

  -- Amounts
  amount_due integer NOT NULL, -- In cents
  amount_paid integer DEFAULT 0,
  amount_remaining integer DEFAULT 0,
  currency text DEFAULT 'gbp',
  tax integer DEFAULT 0,
  total integer NOT NULL,

  -- Dates
  created timestamptz NOT NULL,
  due_date timestamptz,
  period_start timestamptz,
  period_end timestamptz,

  -- Payment
  paid boolean DEFAULT false,
  paid_at timestamptz,
  payment_intent_id text,
  charge_id text,

  -- Links
  invoice_pdf text,
  hosted_invoice_url text,

  -- Metadata
  metadata jsonb DEFAULT '{}',
  description text,
  lines jsonb, -- Invoice line items

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Payment Methods
CREATE TABLE IF NOT EXISTS stripe_payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_payment_method_id text NOT NULL UNIQUE,
  stripe_customer_id text NOT NULL REFERENCES stripe_customers(stripe_customer_id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Type
  type text NOT NULL CHECK (type IN ('card', 'bank_account', 'sepa_debit', 'ideal', 'paypal')),

  -- Card Details (PCI compliant - only last 4 and metadata)
  card_brand text,
  card_last4 text,
  card_exp_month integer,
  card_exp_year integer,
  card_fingerprint text,

  -- Bank Account Details (only last 4)
  bank_name text,
  bank_last4 text,

  -- Status
  is_default boolean DEFAULT false,

  -- Billing Details
  billing_details jsonb,

  -- Metadata
  metadata jsonb DEFAULT '{}',

  -- Sync
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stripe Webhook Events (specific to Stripe)
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id text NOT NULL UNIQUE,

  -- Event Details
  event_type text NOT NULL,
  api_version text,
  
  -- Related Objects
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_invoice_id text,
  stripe_payment_method_id text,

  -- Event Data
  event_data jsonb NOT NULL,
  raw_payload text,

  -- Processing
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'failed', 'skipped')),
  processed_at timestamptz,
  retry_count integer DEFAULT 0,
  max_retries integer DEFAULT 3,
  next_retry_at timestamptz,

  -- Error Tracking
  error_message text,
  error_details jsonb,

  -- Security
  signature_verified boolean DEFAULT false,
  source_ip inet,

  -- User mapping (for RLS)
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,

  received_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_stripe_id ON stripe_customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_status ON stripe_customers(status);

CREATE INDEX IF NOT EXISTS idx_stripe_products_active ON stripe_products(active);

CREATE INDEX IF NOT EXISTS idx_stripe_prices_product ON stripe_prices(stripe_product_id);
CREATE INDEX IF NOT EXISTS idx_stripe_prices_active ON stripe_prices(active);

CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_user_id ON stripe_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_customer ON stripe_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_status ON stripe_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_period_end ON stripe_subscriptions(current_period_end);

CREATE INDEX IF NOT EXISTS idx_stripe_invoices_user_id ON stripe_invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_customer ON stripe_invoices(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_subscription ON stripe_invoices(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_status ON stripe_invoices(status);
CREATE INDEX IF NOT EXISTS idx_stripe_invoices_created ON stripe_invoices(created);

CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_user_id ON stripe_payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_customer ON stripe_payment_methods(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_payment_methods_default ON stripe_payment_methods(is_default) WHERE is_default = true;

CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_type ON stripe_webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_status ON stripe_webhook_events(status);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_customer ON stripe_webhook_events(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_subscription ON stripe_webhook_events(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_next_retry ON stripe_webhook_events(next_retry_at) WHERE status = 'failed' AND retry_count < max_retries;
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_created ON stripe_webhook_events(created_at);

-- Enable Row Level Security
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Stripe Customers: Users see only their own
CREATE POLICY "Users view own stripe customer"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Stripe Products: Anyone can view active products
CREATE POLICY "Anyone can view active products"
  ON stripe_products FOR SELECT
  TO authenticated
  USING (active = true);

-- Stripe Prices: Anyone can view active prices
CREATE POLICY "Anyone can view active prices"
  ON stripe_prices FOR SELECT
  TO authenticated
  USING (active = true);

-- Stripe Subscriptions: Users see only their own
CREATE POLICY "Users view own subscriptions"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Stripe Invoices: Users see only their own
CREATE POLICY "Users view own invoices"
  ON stripe_invoices FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Stripe Payment Methods: Users see only their own
CREATE POLICY "Users view own payment methods"
  ON stripe_payment_methods FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Stripe Webhook Events: Users see only their own
CREATE POLICY "Users view own webhook events"
  ON stripe_webhook_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- System can insert webhook events
CREATE POLICY "System inserts webhook events"
  ON stripe_webhook_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Triggers for updated_at
CREATE TRIGGER update_stripe_customers_updated_at
  BEFORE UPDATE ON stripe_customers
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_products_updated_at
  BEFORE UPDATE ON stripe_products
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_prices_updated_at
  BEFORE UPDATE ON stripe_prices
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_subscriptions_updated_at
  BEFORE UPDATE ON stripe_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_invoices_updated_at
  BEFORE UPDATE ON stripe_invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_payment_methods_updated_at
  BEFORE UPDATE ON stripe_payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();

CREATE TRIGGER update_stripe_webhook_events_updated_at
  BEFORE UPDATE ON stripe_webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION update_integration_updated_at();
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
/*
  # Abuse Protection System for Free Score Submissions

  1. New Tables
    - `free_score_rate_limits`
      - Tracks email and IP-based rate limiting
      - Prevents repeat abuse with 30-day email limit
      - Prevents mass abuse with 24-hour IP limit

    - `free_score_abuse_logs`
      - Logs all suspicious activity
      - Tracks patterns: rapid submissions, similar names, same IPs
      - Enables admin monitoring and alerts

    - `csrf_tokens`
      - Stores valid CSRF tokens with expiry
      - Prevents cross-site request forgery attacks
      - Auto-expires after 1 hour

  2. Security
    - Enable RLS on all tables
    - Only authenticated users can read their own data
    - Service role required for writes (via edge functions)
    - Abuse logs only accessible to admins

  3. Indexes
    - Index on email, ip_address, and timestamps for fast lookups
    - Index on abuse flags for admin dashboards

  4. Functions
    - `check_email_rate_limit()` - Returns true if email can submit
    - `check_ip_rate_limit()` - Returns true if IP can submit
    - `log_abuse_attempt()` - Logs suspicious activity
    - `clean_expired_tokens()` - Removes old CSRF tokens
*/

-- Table for tracking rate limits by email and IP
CREATE TABLE IF NOT EXISTS free_score_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address inet NOT NULL,
  business_name text,
  location text,
  submission_count integer DEFAULT 1,
  first_submission_at timestamptz DEFAULT now(),
  last_submission_at timestamptz DEFAULT now(),
  next_allowed_at timestamptz DEFAULT (now() + interval '30 days'),
  is_blocked boolean DEFAULT false,
  block_reason text,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table for logging abuse attempts and suspicious activity
CREATE TABLE IF NOT EXISTS free_score_abuse_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  ip_address inet,
  abuse_type text NOT NULL,
  details jsonb DEFAULT '{}',
  user_agent text,
  referrer text,
  blocked boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Table for CSRF token management
CREATE TABLE IF NOT EXISTS csrf_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL,
  ip_address inet,
  expires_at timestamptz DEFAULT (now() + interval '1 hour'),
  used boolean DEFAULT false,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_email ON free_score_rate_limits(email);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip ON free_score_rate_limits(ip_address);
CREATE INDEX IF NOT EXISTS idx_rate_limits_last_submission ON free_score_rate_limits(last_submission_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_next_allowed ON free_score_rate_limits(next_allowed_at);
CREATE INDEX IF NOT EXISTS idx_abuse_logs_email ON free_score_abuse_logs(email);
CREATE INDEX IF NOT EXISTS idx_abuse_logs_ip ON free_score_abuse_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_abuse_logs_created ON free_score_abuse_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_abuse_logs_type ON free_score_abuse_logs(abuse_type);
CREATE INDEX IF NOT EXISTS idx_csrf_token ON csrf_tokens(token);
CREATE INDEX IF NOT EXISTS idx_csrf_expires ON csrf_tokens(expires_at);

-- Enable RLS
ALTER TABLE free_score_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_score_abuse_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE csrf_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for free_score_rate_limits
CREATE POLICY "Service role can manage rate limits"
  ON free_score_rate_limits
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view rate limits"
  ON free_score_rate_limits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- RLS Policies for free_score_abuse_logs
CREATE POLICY "Service role can manage abuse logs"
  ON free_score_abuse_logs
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Admins can view abuse logs"
  ON free_score_abuse_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- RLS Policies for csrf_tokens
CREATE POLICY "Service role can manage CSRF tokens"
  ON csrf_tokens
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Function to check if email can submit (1 per 30 days)
CREATE OR REPLACE FUNCTION check_email_rate_limit(p_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_rate_limit free_score_rate_limits;
  v_result jsonb;
BEGIN
  SELECT * INTO v_rate_limit
  FROM free_score_rate_limits
  WHERE email = p_email
  ORDER BY last_submission_at DESC
  LIMIT 1;

  IF v_rate_limit IS NULL THEN
    RETURN jsonb_build_object(
      'allowed', true,
      'reason', 'new_email'
    );
  END IF;

  IF v_rate_limit.is_blocked THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'blocked',
      'message', v_rate_limit.block_reason
    );
  END IF;

  IF v_rate_limit.next_allowed_at > now() THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'rate_limited',
      'next_allowed_at', v_rate_limit.next_allowed_at,
      'message', format('You can request another free score on %s', to_char(v_rate_limit.next_allowed_at, 'DD Mon YYYY'))
    );
  END IF;

  RETURN jsonb_build_object(
    'allowed', true,
    'reason', 'rate_limit_expired'
  );
END;
$$;

-- Function to check if IP can submit (3 per 24 hours)
CREATE OR REPLACE FUNCTION check_ip_rate_limit(p_ip inet)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_submission_count integer;
  v_oldest_submission timestamptz;
  v_next_allowed_at timestamptz;
BEGIN
  SELECT COUNT(*), MIN(last_submission_at)
  INTO v_submission_count, v_oldest_submission
  FROM free_score_rate_limits
  WHERE ip_address = p_ip
  AND last_submission_at > (now() - interval '24 hours');

  IF v_submission_count >= 3 THEN
    v_next_allowed_at := v_oldest_submission + interval '24 hours';

    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'ip_rate_limited',
      'submission_count', v_submission_count,
      'next_allowed_at', v_next_allowed_at,
      'message', format('Too many requests from your location. Please try again at %s', to_char(v_next_allowed_at, 'HH24:MI on DD Mon'))
    );
  END IF;

  RETURN jsonb_build_object(
    'allowed', true,
    'submission_count', v_submission_count
  );
END;
$$;

-- Function to log abuse attempts
CREATE OR REPLACE FUNCTION log_abuse_attempt(
  p_email text,
  p_ip inet,
  p_abuse_type text,
  p_details jsonb DEFAULT '{}',
  p_user_agent text DEFAULT NULL,
  p_referrer text DEFAULT NULL,
  p_blocked boolean DEFAULT true
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO free_score_abuse_logs (
    email,
    ip_address,
    abuse_type,
    details,
    user_agent,
    referrer,
    blocked
  ) VALUES (
    p_email,
    p_ip,
    p_abuse_type,
    p_details,
    p_user_agent,
    p_referrer,
    p_blocked
  )
  RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$;

-- Function to clean expired CSRF tokens (run periodically)
CREATE OR REPLACE FUNCTION clean_expired_csrf_tokens()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted_count integer;
BEGIN
  DELETE FROM csrf_tokens
  WHERE expires_at < now() OR (used = true AND used_at < (now() - interval '1 hour'));

  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
  RETURN v_deleted_count;
END;
$$;

-- Function to generate CSRF token
CREATE OR REPLACE FUNCTION generate_csrf_token(p_ip inet DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_token text;
BEGIN
  v_token := encode(gen_random_bytes(32), 'base64');

  INSERT INTO csrf_tokens (token, ip_address)
  VALUES (v_token, p_ip);

  RETURN v_token;
END;
$$;

-- Function to verify CSRF token
CREATE OR REPLACE FUNCTION verify_csrf_token(p_token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_token_record csrf_tokens;
BEGIN
  SELECT * INTO v_token_record
  FROM csrf_tokens
  WHERE token = p_token
  AND expires_at > now()
  AND used = false
  LIMIT 1;

  IF v_token_record IS NULL THEN
    RETURN false;
  END IF;

  UPDATE csrf_tokens
  SET used = true, used_at = now()
  WHERE id = v_token_record.id;

  RETURN true;
END;
$$;

-- Create a view for admin dashboard to monitor abuse
CREATE OR REPLACE VIEW abuse_summary AS
SELECT
  date_trunc('day', created_at) as date,
  abuse_type,
  COUNT(*) as attempt_count,
  COUNT(DISTINCT email) as unique_emails,
  COUNT(DISTINCT ip_address) as unique_ips
FROM free_score_abuse_logs
WHERE created_at > (now() - interval '30 days')
GROUP BY date_trunc('day', created_at), abuse_type
ORDER BY date DESC, attempt_count DESC;

GRANT ALL ON free_score_rate_limits TO service_role;
GRANT ALL ON free_score_abuse_logs TO service_role;
GRANT ALL ON csrf_tokens TO service_role;
GRANT SELECT ON abuse_summary TO authenticated;/*
  # Database Audit & Optimizations - April 2026
  
  Comprehensive review of the whoza.ai Supabase database.
  53 tables, 415 indexes, 305 RLS policies, 29 functions analyzed.
  
  ## Issues Found
  
  ### 1. Missing Composite Index on visibility_score_details (HIGH)
  The scoring dashboard frequently queries by business_id + score_date with is_free_preview filter.
  The existing index doesn't cover the free_preview filter, causing sequential scans.
  
  ### 2. analytics_events Missing Partitioning (HIGH)
  analytics_events will grow unbounded. No partitioning strategy implemented despite comment mentioning it.
  Recommend monthly partitioning or a retention policy.
  
  ### 3. free_score_submissions Missing Conversion Tracking Index (MEDIUM)
  No composite index for conversion funnel queries (converted_to_user + created_at).
  
  ### 4. rex_recommendations Missing Status Index (MEDIUM)
  The "one active recommendation per business" constraint requires efficient querying by business_id + status.
  
  ### 5. users Table Missing onboarding_completion Index (MEDIUM)
  Dashboard queries for incomplete onboarding profiles can't use an index.
  
  ## Optimizations Applied
  - Add composite indexes for common query patterns
  - Add analytics_events retention function
  - Add missing foreign key indexes
  - Add function for cleaning old analytics data
*/

-- ============================================================================
-- 1. VISIBILITY SCORE COMPOSITE INDEX
-- ============================================================================
-- Dashboard frequently queries: WHERE business_id = ? AND is_free_preview = false ORDER BY score_date DESC
CREATE INDEX IF NOT EXISTS idx_visibility_score_details_business_free_date 
  ON visibility_score_details(business_id, is_free_preview, score_date DESC);

-- ============================================================================
-- 2. ANALYTICS EVENTS RETENTION & PARTITIONING PREP
-- ============================================================================
-- Add partition key column for future monthly partitioning
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'analytics_events' AND column_name = 'partition_key'
  ) THEN
    ALTER TABLE analytics_events ADD COLUMN partition_key text 
      GENERATED ALWAYS AS (to_char(created_at, 'YYYY-MM')) STORED;
    
    CREATE INDEX IF NOT EXISTS idx_analytics_events_partition_key 
      ON analytics_events(partition_key);
  END IF;
END $$;

-- Create function to clean old analytics events (retain 12 months)
CREATE OR REPLACE FUNCTION clean_old_analytics_events()
RETURNS integer AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM analytics_events 
  WHERE created_at < NOW() - INTERVAL '12 months';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to clean old notification delivery logs (retain 6 months)
CREATE OR REPLACE FUNCTION clean_old_notification_logs()
RETURNS integer AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM notification_delivery_log 
  WHERE created_at < NOW() - INTERVAL '6 months';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 3. FREE SCORE CONVERSION FUNNEL INDEX
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_free_score_submissions_conversion_funnel 
  ON free_score_submissions(converted_to_user, created_at DESC) 
  WHERE converted_to_user = false;

-- ============================================================================
-- 4. REX RECOMMENDATIONS STATUS INDEX
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_rex_recommendations_business_status 
  ON rex_recommendations(business_id, status) 
  WHERE status = 'active';

-- ============================================================================
-- 5. USER ONBOARDING INDEX
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_users_subscription_status 
  ON users(subscription_status, created_at DESC);

-- ============================================================================
-- 6. PLATFORM METRICS DASHBOARD INDEX
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_platform_metrics_dashboard 
  ON platform_metrics(period_type, period_start DESC, period_end);

-- ============================================================================
-- 7. STRIPE WEBHOOK EVENTS STUCK JOB INDEX
-- ============================================================================
-- Find webhooks stuck in 'processing' state for too long
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_stuck 
  ON stripe_webhook_events(status, created_at) 
  WHERE status = 'processing';

-- ============================================================================
-- 8. NOTIFICATIONS STUCK QUEUE INDEX
-- ============================================================================
-- Find notifications stuck in pending/processing too long
CREATE INDEX IF NOT EXISTS idx_notifications_stuck 
  ON notifications(status, scheduled_for) 
  WHERE status IN ('pending', 'processing') AND scheduled_for < NOW() - INTERVAL '1 hour';

-- ============================================================================
-- 9. Add database health check function
-- ============================================================================
CREATE OR REPLACE FUNCTION get_database_health()
RETURNS TABLE (
  metric_name text,
  metric_value bigint,
  threshold bigint,
  status text
) AS $$
BEGIN
  -- Table row counts for key tables
  RETURN QUERY
  SELECT 
    'analytics_events_total_rows'::text,
    count(*)::bigint,
    1000000::bigint,
    CASE WHEN count(*) > 1000000 THEN 'warning' ELSE 'ok' END::text
  FROM analytics_events;
  
  RETURN QUERY
  SELECT 
    'pending_notifications'::text,
    count(*)::bigint,
    10000::bigint,
    CASE WHEN count(*) > 10000 THEN 'warning' ELSE 'ok' END::text
  FROM notifications WHERE status = 'pending';
  
  RETURN QUERY
  SELECT 
    'failed_webhooks'::text,
    count(*)::bigint,
    100::bigint,
    CASE WHEN count(*) > 100 THEN 'warning' ELSE 'ok' END::text
  FROM stripe_webhook_events WHERE status = 'failed';
  
  RETURN QUERY
  SELECT 
    'notification_delivery_logs_total'::text,
    count(*)::bigint,
    500000::bigint,
    CASE WHEN count(*) > 500000 THEN 'warning' ELSE 'ok' END::text
  FROM notification_delivery_log;
  
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 10. Add comment documentation
-- ============================================================================
COMMENT ON FUNCTION clean_old_analytics_events() IS 'Deletes analytics events older than 12 months. Run via pg_cron or edge function.';
COMMENT ON FUNCTION clean_old_notification_logs() IS 'Deletes notification delivery logs older than 6 months. Run via pg_cron or edge function.';
COMMENT ON FUNCTION get_database_health() IS 'Returns database health metrics for monitoring dashboard. Check for warning status items.';
