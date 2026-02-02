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
