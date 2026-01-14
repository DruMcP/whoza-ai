/*
  # Seed Integration Providers

  1. Seeds
    - Stripe (payment) - Active
    - Google Business Profile (business_tools) - Coming Soon
    - Facebook Business (social_media) - Coming Soon
    - Instagram Business (social_media) - Coming Soon
    - LinkedIn Company (social_media) - Coming Soon
    - Twitter/X Business (social_media) - Coming Soon
    - HubSpot (crm) - Coming Soon
    - Mailchimp (email) - Coming Soon
    - Slack (communication) - Coming Soon
    - Google Analytics (analytics) - Coming Soon
    - Trustpilot (reviews) - Coming Soon

  2. Important Notes
    - Only Stripe is active initially
    - Others marked as coming_soon for roadmap visibility
    - OAuth configurations populated for reference
    - Webhook URLs will be set to actual edge function URLs
*/

-- Insert integration providers
INSERT INTO integration_providers (
  name, 
  display_name, 
  description, 
  logo_url, 
  category, 
  status,
  api_base_url,
  api_version,
  rate_limit_per_minute,
  requires_oauth,
  oauth_authorize_url,
  oauth_token_url,
  oauth_scopes,
  features,
  webhook_support,
  webhook_url,
  documentation_url,
  support_url,
  terms_url
) VALUES

-- Stripe (Active - Priority)
(
  'stripe',
  'Stripe',
  'Subscription billing, payment processing, and revenue management',
  '/integrations/stripe-logo.svg',
  'payment',
  'active',
  'https://api.stripe.com',
  'v1',
  100,
  false, -- Uses API keys
  null,
  null,
  null,
  '{"subscription_management": true, "payment_processing": true, "invoicing": true, "customer_portal": true, "usage_based_billing": true, "tax_calculation": true}'::jsonb,
  true,
  '/functions/v1/process-stripe-webhook',
  'https://stripe.com/docs/api',
  'https://support.stripe.com',
  'https://stripe.com/legal'
),

-- Google Business Profile (Coming Soon - Priority 2)
(
  'google_business_profile',
  'Google Business Profile',
  'Sync business profile data, reviews, and insights from Google',
  '/integrations/google-logo.svg',
  'business_tools',
  'coming_soon',
  'https://mybusinessbusinessinformation.googleapis.com',
  'v1',
  100,
  true,
  'https://accounts.google.com/o/oauth2/v2/auth',
  'https://oauth2.googleapis.com/token',
  ARRAY['https://www.googleapis.com/auth/business.manage'],
  '{"profile_sync": true, "review_management": true, "insights": true, "post_management": true, "photo_management": true}'::jsonb,
  false,
  null,
  'https://developers.google.com/my-business',
  'https://support.google.com/business',
  'https://developers.google.com/my-business/terms'
),

-- Facebook Business (Coming Soon)
(
  'facebook_business',
  'Facebook Business',
  'Manage Facebook business page, posts, and analytics',
  '/integrations/facebook-logo.svg',
  'social_media',
  'coming_soon',
  'https://graph.facebook.com',
  'v18.0',
  200,
  true,
  'https://www.facebook.com/v18.0/dialog/oauth',
  'https://graph.facebook.com/v18.0/oauth/access_token',
  ARRAY['pages_show_list', 'pages_read_engagement', 'pages_manage_posts', 'pages_manage_metadata'],
  '{"page_management": true, "post_publishing": true, "analytics": true, "messaging": true}'::jsonb,
  true,
  '/functions/v1/process-facebook-webhook',
  'https://developers.facebook.com/docs/graph-api',
  'https://developers.facebook.com/support',
  'https://www.facebook.com/legal/terms'
),

-- Instagram Business (Coming Soon)
(
  'instagram_business',
  'Instagram Business',
  'Manage Instagram business account, posts, and engagement',
  '/integrations/instagram-logo.svg',
  'social_media',
  'coming_soon',
  'https://graph.facebook.com',
  'v18.0',
  200,
  true,
  'https://www.facebook.com/v18.0/dialog/oauth',
  'https://graph.facebook.com/v18.0/oauth/access_token',
  ARRAY['instagram_basic', 'instagram_manage_insights', 'instagram_manage_comments', 'instagram_content_publish'],
  '{"post_publishing": true, "story_publishing": true, "analytics": true, "comment_management": true}'::jsonb,
  true,
  '/functions/v1/process-instagram-webhook',
  'https://developers.facebook.com/docs/instagram-api',
  'https://developers.facebook.com/support',
  'https://www.facebook.com/legal/terms'
),

-- LinkedIn Company (Coming Soon)
(
  'linkedin_company',
  'LinkedIn Company',
  'Manage LinkedIn company page and professional content',
  '/integrations/linkedin-logo.svg',
  'social_media',
  'coming_soon',
  'https://api.linkedin.com',
  'v2',
  100,
  true,
  'https://www.linkedin.com/oauth/v2/authorization',
  'https://www.linkedin.com/oauth/v2/accessToken',
  ARRAY['r_organization_social', 'w_organization_social', 'rw_organization_admin'],
  '{"post_publishing": true, "analytics": true, "follower_insights": true}'::jsonb,
  false,
  null,
  'https://docs.microsoft.com/en-us/linkedin',
  'https://www.linkedin.com/help/linkedin',
  'https://www.linkedin.com/legal/user-agreement'
),

-- Twitter/X Business (Coming Soon)
(
  'twitter_business',
  'Twitter/X Business',
  'Manage Twitter/X account, tweets, and engagement',
  '/integrations/twitter-logo.svg',
  'social_media',
  'coming_soon',
  'https://api.twitter.com',
  '2',
  50,
  true,
  'https://twitter.com/i/oauth2/authorize',
  'https://api.twitter.com/2/oauth2/token',
  ARRAY['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
  '{"tweet_publishing": true, "analytics": true, "engagement_tracking": true}'::jsonb,
  true,
  '/functions/v1/process-twitter-webhook',
  'https://developer.twitter.com/en/docs',
  'https://developer.twitter.com/en/support',
  'https://twitter.com/en/tos'
),

-- HubSpot (Coming Soon)
(
  'hubspot',
  'HubSpot',
  'Sync customer data and track interactions with HubSpot CRM',
  '/integrations/hubspot-logo.svg',
  'crm',
  'coming_soon',
  'https://api.hubapi.com',
  'v3',
  100,
  true,
  'https://app.hubspot.com/oauth/authorize',
  'https://api.hubapi.com/oauth/v1/token',
  ARRAY['crm.objects.contacts.read', 'crm.objects.companies.read', 'crm.objects.deals.read'],
  '{"contact_sync": true, "company_sync": true, "deal_tracking": true}'::jsonb,
  true,
  '/functions/v1/process-hubspot-webhook',
  'https://developers.hubspot.com/docs/api/overview',
  'https://help.hubspot.com',
  'https://legal.hubspot.com/terms-of-service'
),

-- Mailchimp (Coming Soon)
(
  'mailchimp',
  'Mailchimp',
  'Sync email lists and track campaign performance',
  '/integrations/mailchimp-logo.svg',
  'email',
  'coming_soon',
  'https://api.mailchimp.com',
  '3.0',
  120,
  true,
  'https://login.mailchimp.com/oauth2/authorize',
  'https://login.mailchimp.com/oauth2/token',
  ARRAY['campaigns:read', 'lists:read', 'audience:read'],
  '{"list_sync": true, "campaign_analytics": true, "subscriber_management": true}'::jsonb,
  true,
  '/functions/v1/process-mailchimp-webhook',
  'https://mailchimp.com/developer',
  'https://mailchimp.com/contact',
  'https://mailchimp.com/legal/terms'
),

-- Slack (Coming Soon)
(
  'slack',
  'Slack',
  'Receive notifications and alerts in Slack channels',
  '/integrations/slack-logo.svg',
  'communication',
  'coming_soon',
  'https://slack.com/api',
  'v1',
  60,
  true,
  'https://slack.com/oauth/v2/authorize',
  'https://slack.com/api/oauth.v2.access',
  ARRAY['chat:write', 'channels:read', 'groups:read'],
  '{"notifications": true, "alerts": true, "bot_commands": true}'::jsonb,
  true,
  '/functions/v1/process-slack-webhook',
  'https://api.slack.com/docs',
  'https://slack.com/help',
  'https://slack.com/terms-of-service'
),

-- Google Analytics (Coming Soon)
(
  'google_analytics',
  'Google Analytics',
  'Track website traffic and user behavior',
  '/integrations/google-analytics-logo.svg',
  'analytics',
  'coming_soon',
  'https://analyticsdata.googleapis.com',
  'v1beta',
  100,
  true,
  'https://accounts.google.com/o/oauth2/v2/auth',
  'https://oauth2.googleapis.com/token',
  ARRAY['https://www.googleapis.com/auth/analytics.readonly'],
  '{"traffic_data": true, "conversion_tracking": true, "user_behavior": true}'::jsonb,
  false,
  null,
  'https://developers.google.com/analytics',
  'https://support.google.com/analytics',
  'https://marketingplatform.google.com/about/analytics/terms/us'
),

-- Trustpilot (Coming Soon)
(
  'trustpilot',
  'Trustpilot',
  'Aggregate and manage reviews from Trustpilot',
  '/integrations/trustpilot-logo.svg',
  'reviews',
  'coming_soon',
  'https://api.trustpilot.com',
  'v1',
  60,
  true,
  'https://authenticate.trustpilot.com',
  'https://api.trustpilot.com/v1/oauth/oauth-business-users-for-applications/accesstoken',
  ARRAY['review:read'],
  '{"review_aggregation": true, "response_management": true, "rating_tracking": true}'::jsonb,
  true,
  '/functions/v1/process-trustpilot-webhook',
  'https://developers.trustpilot.com',
  'https://support.trustpilot.com',
  'https://legal.trustpilot.com/end-user-terms-and-conditions'
)

ON CONFLICT (name) DO NOTHING;
