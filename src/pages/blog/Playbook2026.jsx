import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Blog.css';

function Playbook2026() {
  // Add structured data for the playbook
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "The UK Trades Business Playbook for AI Search Visibility in 2026",
      "description": "A comprehensive, evidence-based playbook for UK plumbers, electricians, and tradespeople to achieve visibility in AI search. Learn the 90-day transformation timeline, technical schema implementation, and authority-building strategies.",
      "image": "https://whoza.ai/blog-images/ai_search_visibility.jpg",
      "datePublished": "2026-01-31",
      "dateModified": "2026-01-31",
      "author": {
        "@type": "Organization",
        "name": "Whoza.ai Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Whoza.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://whoza.ai/whoza-logo.png"
        }
      }
    };

    let schemaScript = document.getElementById('playbook-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'playbook-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);

    return () => {
      const script = document.getElementById('playbook-schema');
      if (script) script.remove();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>The UK Trades Business Playbook for AI Search Visibility in 2026 | Whoza.ai</title>
        <meta name="description" content="A comprehensive, evidence-based playbook for UK plumbers, electricians, and tradespeople to achieve visibility in AI search. Learn the 90-day transformation timeline, technical schema implementation, and authority-building strategies to dominate ChatGPT, Google AI, and Perplexity recommendations." />
        <link rel="canonical" href="https://whoza.ai/blog/uk-trades-business-playbook-ai-search-visibility-2026" />
      </Helmet>

      <main className="blog-post-page playbook-page" role="main">
        {/* Breadcrumb */}
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/blog" itemProp="item"><span itemProp="name">Blog</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" aria-current="page">UK Trades Business Playbook 2026</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>
        </div>

        {/* Playbook Header */}
        <header className="playbook-header">
          <div className="container">
            <div className="playbook-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Free Playbook from Whoza.ai
            </div>
            <h1>The UK Trades Business Playbook for AI Search Visibility in 2026</h1>
            <div className="post-meta-header">
              <span className="post-category">AI Visibility</span>
              <span className="post-date">31 January 2026</span>
              <span className="post-read-time">35 min read</span>
            </div>
            <p className="playbook-lead">
              The way customers find local trades is undergoing its most significant shift in a decade. Traditional Google searches are declining as users turn to AI assistants like ChatGPT, Siri, and Google AI for immediate, conversational answers. This comprehensive playbook provides a scientific, evidence-based framework with a 90-day transformation timeline for UK plumbers, electricians, locksmiths, and other trades to achieve visibility in this new AI-driven landscape.
            </p>
          </div>
        </header>

        {/* Playbook Content */}
        <article className="playbook-content">
          <div className="container">
            
            {/* Table of Contents */}
            <aside className="playbook-toc">
              <h2>What You Will Learn:</h2>
              <ul>
                <li><a href="#part-1">The Critical Threat: Why 2026 is the Inflection Point</a></li>
                <li><a href="#part-2">The AI Recommendation Engine: How AI Chooses Businesses</a></li>
                <li><a href="#part-3">The 90-Day Transformation Timeline</a></li>
                <li><a href="#technical">Technical Blueprints: Schema Markup Implementation</a></li>
                <li><a href="#scorecard">Progress Tracking Scorecard</a></li>
              </ul>
            </aside>

            {/* Part 1 */}
            <section id="part-1" className="playbook-section">
              <h2>Part 1: The Critical Context - Why 2026 is the Inflection Point</h2>
              
              <p>The shift from traditional search to AI-driven discovery is not speculative—it is measurable and accelerating. Gartner, a leading global research firm, has verified a startling prediction: <strong>by 2026, traditional search engine volume will drop by 25%</strong> as users shift to AI chatbots and virtual agents.</p>

              <p>However, this headline figure requires nuance for tradespeople. The decline is not uniform across all sectors. For emergency trades like plumbers, electricians, and locksmiths, the risk is particularly acute. A stunning <strong>58% of consumers have already used generative AI tools for product and service recommendations</strong>, and the volume of AI-referred customer sessions skyrocketed by 527% between January and May 2025 alone.</p>

              <figure className="playbook-image">
                <img src="/blog-images/ai_search_visibility.jpg" alt="An infographic showing the rise of AI search visibility and its importance for businesses" loading="lazy" />
                <figcaption>AI search visibility is no longer a futuristic concept but a present-day necessity for business growth.</figcaption>
              </figure>

              <p>For UK trades, this represents an existential threat combined with an unprecedented opportunity. A homeowner experiencing a burst pipe at 11 PM no longer just opens Google and scrolls through a list of blue links. They are increasingly likely to ask Siri, ChatGPT, or Perplexity: <strong>"Who's the best emergency plumber near me right now?"</strong></p>

              <p>If your business lacks a consistent and authoritative digital presence across the knowledge bases these AI systems rely on, you are algorithmically invisible—no matter if you have twenty years of five-star service under your belt.</p>

              <h3>The Trust Paradox: Why AI Recommendations Convert</h3>

              <p>It's easy to be skeptical of a new technology, but the data shows a clear trend in consumer behavior. Research from the 2025 Consumer Adoption of AI Report reveals a fascinating "Trust Paradox":</p>

              <blockquote>
                41% of consumers trust generative AI search results <strong>more</strong> than paid search advertisements, while only 15% trust AI less than search ads.
              </blockquote>

              <p>Simultaneously, <strong>79% of consumers using AI tools report increased confidence in their purchase decisions</strong>. For trades businesses, this is a critical insight: a recommendation from an AI assistant carries higher conversion intent than a traditional pay-per-click (PPC) ad. When an AI says your business is the answer, customers are more likely to believe it and take action.</p>
            </section>

            {/* Part 2 */}
            <section id="part-2" className="playbook-section">
              <h2>Part 2: The Definitive Q&A on AI Visibility for Trades</h2>
              
              <p>This section provides research-backed answers to the most pressing questions UK trades businesses have about getting found in the new age of AI search.</p>

              <div className="faq-item">
                <h3>Q1: How do I actually get my business recommended by ChatGPT and AI assistants?</h3>
                
                <p><strong>The Scientific Answer:</strong></p>

                <p>AI assistants recommend local businesses through a process called <strong>Retrieval-Augmented Generation (RAG)</strong>. In simple terms, when a user asks a question, the AI doesn't "know" the answer intuitively. Instead, it performs a rapid, real-time search across its indexed sources (like Bing, Apple Maps, and business directories) and then "augments" its response with the information it retrieves.</p>

                <p>For your business to be recommended, you must satisfy four algorithmic confidence thresholds:</p>

                <ol>
                  <li><strong>Entity Verification</strong>: The AI cross-references your business's Name, Address, and Phone number (NAP) across multiple high-authority sources. Inconsistent data (e.g., "Smith Plumbing Ltd" vs. "Smith Plumbing Limited") creates "entity fragmentation," which causes AI systems to lose confidence and ignore your business.</li>
                  <li><strong>Proximity Confirmation</strong>: For location-based queries ("near me"), the AI pulls geospatial data from Apple Maps, Google Business Profile, and Bing Places. If your service area isn't clearly defined on these platforms, you won't be considered.</li>
                  <li><strong>Semantic Relevance</strong>: Your website content must match the conversational intent of user queries. You need pages that directly answer questions like, "Who fixes boilers at midnight in Leeds?" not just pages optimized for the old keyword "boiler repair Leeds."</li>
                  <li><strong>Authority Signaling</strong>: AI models are programmed to prioritize sources that demonstrate Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T), especially for high-stakes emergency services where quality and reliability are paramount.</li>
                </ol>

                <div className="quick-win">
                  <strong>Quick Win:</strong> Audit your business name, address, and phone number across Google, Bing, Apple Maps, Yell, and Checkatrade. Ensure they are <strong>100% identical</strong> everywhere.
                </div>

                <figure className="playbook-image">
                  <img src="/blog-images/local_business_schema.png" alt="A diagram showing how different data sources feed into an AI to provide a local business recommendation" loading="lazy" />
                  <figcaption>Consistent data across multiple platforms is the foundation of AI visibility.</figcaption>
                </figure>
              </div>

              <div className="faq-item">
                <h3>Q2: Does Bing Places really matter if everyone uses Google?</h3>
                
                <p><strong>The Critical Answer:</strong></p>

                <p>Yes, absolutely. For AI visibility, <strong>Bing Places for Business is non-negotiable</strong>. This is because ChatGPT's live web browsing capability relies heavily on Bing's search infrastructure. When ChatGPT needs to find a real-time answer to "who is the best emergency electrician in Manchester," it is effectively querying the Bing search engine.</p>

                <p>If your business is not listed, verified, and optimized on Bing Places, you are invisible to a huge portion of real-time AI recommendations.</p>

                <p><strong>The Data</strong>: Research on AI citation sources consistently shows that ChatGPT and Microsoft Copilot draw disproportionately from Bing-indexed local business data compared to general web crawling.</p>

                <div className="action-item">
                  <strong>Action Item:</strong> Treat your Bing Places profile with the same importance as your Google Business Profile. Ensure your service areas are precisely mapped, your business categories are correct, and you have uploaded high-quality, geotagged photos.
                </div>

                <figure className="playbook-image">
                  <img src="/blog-images/chatgpt_brand_visibility.png" alt="A chart from Ahrefs showing the correlation of different factors with ChatGPT and AI mentions" loading="lazy" />
                  <figcaption>Data shows a strong correlation between Bing optimization and visibility in AI-powered search tools.</figcaption>
                </figure>
              </div>

              <div className="faq-item">
                <h3>Q3: Is setting up an Apple Business Connect profile really necessary for a local trade?</h3>
                
                <p><strong>The Straight Answer:</strong></p>

                <p>It is absolutely essential. Think about how many of your customers own an iPhone. When they use Siri to ask, "Find a 24/7 electrician near me," where do you think Siri gets its answers? It looks exclusively at <strong>Apple Maps</strong>. If your business isn't on Apple Maps, you are completely invisible to every Siri user in your area.</p>

                <p>Consider these figures: a significant <strong>70% of home service enquiries now originate from mobile devices</strong>, and a growing number of people are using voice search for convenience. With millions of iPhones, iPads, and HomePods in UK homes, being absent from Apple's ecosystem is like having your shop doors closed to a massive portion of your potential customers.</p>

                <figure className="playbook-image">
                  <img src="/blog-images/voice_search_ai.jpg" alt="An illustration of a voice assistant microphone with sound waves" loading="lazy" />
                  <figcaption>Voice search on devices like the iPhone is powered by Apple Maps. If you're not listed, you don't exist.</figcaption>
                </figure>

                <div className="pro-tip">
                  <strong>Pro Tip:</strong> Optimising for Apple Business Connect is not just about being listed. Use the platform to draw your precise service area on the map, add attributes like "Emergency Services" and "24/7 Availability," and upload high-resolution photos of your work. Apple's AI uses image recognition to judge the quality and relevance of your business.
                </div>
              </div>

              <div className="faq-item">
                <h3>Q4: What is the single fastest, most impactful thing I can do for AI visibility?</h3>
                
                <p><strong>The Evidence-Based Answer:</strong></p>

                <p>The quickest technical win is to build a dedicated "Emergency Services" page on your website and add <strong>FAQPage schema</strong> to it. Schema is a type of code that you add to your website to help search engines and AI understand your content better. It's like adding labels to your information so a machine can read it perfectly.</p>

                <p>Research analysing millions of AI citations found that content using FAQPage schema appears <strong>3.2 times more frequently</strong> in Google's AI Overviews and is one of the most cited formats across all major AI assistants.</p>

                <p>Here is a simple, AI-friendly page structure:</p>

                <ul>
                  <li><strong>Main Heading (H1)</strong>: Emergency Plumber in Manchester — 24/7 Call-Outs</li>
                  <li><strong>Direct Answer Paragraph (under the H1)</strong>: A short, 50-word summary. <em>"We provide 24-hour emergency plumbing services across Manchester, with average response times of 45 minutes. Call [Your Number] for immediate assistance."</em></li>
                  <li><strong>Question Subheading (H2)</strong>: "How quickly can you respond to an emergency in M20?"</li>
                  <li><strong>Answer</strong>: A direct time estimate and factors affecting speed.</li>
                  <li><strong>Question Subheading (H2)</strong>: "What counts as a plumbing emergency?"</li>
                  <li><strong>Answer</strong>: A clear, bulleted list of qualifying issues.</li>
                </ul>

                <p>Once this content is on your page, you (or your web developer) must add the corresponding FAQPage schema code in the background. This code must match the visible text exactly.</p>

                <div className="common-mistake">
                  <strong>Common Mistake:</strong> Many businesses add schema markup that is invisible on the page. AI systems and Google view this as a deceptive practice and will penalise you for it. The code must always match the content your customers can see.
                </div>
              </div>

              <div className="faq-item">
                <h3 id="technical">Q5: Which types of schema markup are mandatory for a trades business?</h3>
                
                <p><strong>The Technical Specification:</strong></p>

                <p>Schema can feel complicated, so let's simplify it into three tiers. Focus on getting Tier 1 right before moving on.</p>

                <h4>Tier 1 – The Essentials (Do These Immediately)</h4>

                <ol>
                  <li><strong>LocalBusiness Schema</strong>: This is the most important one. It tells AI assistants who you are, what you do, where you are, and when you're open. You must include your address, telephone, openingHoursSpecification (crucial for 24/7 services), and geo coordinates. If you have a specific trade, use a subtype like Plumber or Electrician.</li>
                  <li><strong>FAQPage Schema</strong>: As discussed above, this is for all your question-and-answer content. It is critical for getting quoted by voice search and AI assistants.</li>
                  <li><strong>HowTo Schema</strong>: Perfect for content that gives instructions, like a page on "How to turn off your stopcock before we arrive." This increases the chances of your business being cited for process-based queries.</li>
                </ol>

                <figure className="playbook-image">
                  <img src="/blog-images/gbp_optimization.png" alt="An example of a Google Business Profile, which is powered by LocalBusiness schema" loading="lazy" />
                  <figcaption>Your Google Business Profile is a visual representation of your LocalBusiness schema and is vital for local AI search.</figcaption>
                </figure>

                <h4>Tier 2 – High Impact (Your Next Step)</h4>

                <ol start="4">
                  <li><strong>Organization Schema</strong>: This goes on your homepage and establishes your business as a formal entity. Use it to link to your social media profiles and trade association memberships (like the Gas Safe Register). This builds trust and authority.</li>
                  <li><strong>Service Schema</strong>: This allows you to define each service you offer (e.g., "Boiler Repair," "Emergency Leak Fix") and specify the exact postcodes or towns you serve for that particular job.</li>
                </ol>

                <h4>Tier 3 – Competitive Advantage (To Get Ahead)</h4>

                <ol start="6">
                  <li><strong>VideoObject Schema</strong>: If you use videos on your site (and you should!), marking them up with schema helps AI understand their content. YouTube is the single most-cited source in AI responses, so making your videos easy for AI to parse is a powerful strategy.</li>
                </ol>

                <div className="bottom-line">
                  <strong>The Bottom Line:</strong> Schema markup is the language of AI. By structuring your data correctly, you are spoon-feeding AI assistants the exact information they need to trust and recommend your business.
                </div>
              </div>

              <div className="faq-item">
                <h3>Q6: Do customer reviews still matter for AI, or is that old SEO thinking?</h3>
                
                <p><strong>The Scientific Answer:</strong></p>

                <p>Reviews are more important than ever, but AI systems analyse them in a much more sophisticated way than traditional search engines. It's not just about having a high star rating; AI models look at:</p>

                <ul>
                  <li><strong>Review Velocity</strong>: A steady stream of new reviews signals that your business is active and healthy.</li>
                  <li><strong>Semantic Content</strong>: The AI reads the text of the reviews, looking for mentions of specific services and locations. A review that says, <em>"They fixed my Worcester boiler in Headingley within 30 minutes"</em> is incredibly valuable because it reinforces your expertise in a specific service and location.</li>
                  <li><strong>Platform Diversity</strong>: Having great reviews on Google is good, but having them spread across Google, Facebook, and UK-specific platforms like Checkatrade and TrustATrader is far better. It creates a powerful cross-validation signal that AI trusts.</li>
                </ul>

                <p><strong>The 2026 Standard</strong>: Recent studies on local AI visibility show that AI assistants are <strong>72% more likely to recommend businesses with a 4.8-star or higher rating across multiple platforms</strong> compared to those with a high rating on just a single site.</p>

                <div className="action-plan">
                  <strong>Action Plan:</strong> Make a concerted effort to get detailed reviews on Checkatrade and TrustATrader. These platforms are highly trusted in the UK and their data is frequently used by Bing, which in turn feeds ChatGPT. When you respond to reviews, be sure to naturally include keywords, for example: <em>"Thank you for choosing us for your emergency boiler repair in Leeds. We're glad we could get it sorted for you quickly."</em>
                </div>

                <figure className="playbook-image">
                  <img src="/blog-images/emergency_plumber.jpg" alt="A picture of an emergency plumber working on a boiler, representing a trusted tradesperson" loading="lazy" />
                  <figcaption>Positive reviews detailing specific jobs build immense trust with both customers and AI.</figcaption>
                </figure>
              </div>

              <div className="faq-item">
                <h3>Q7: Should I create separate pages for every town I serve?</h3>
                
                <p><strong>The Entity-Based Answer:</strong></p>

                <p>This is a common point of confusion. Creating dozens of nearly identical "doorway pages" is indeed spam and will get you penalised. However, creating high-quality, geographically distinct service pages is an incredibly powerful strategy for AI visibility.</p>

                <p>The key is <strong>substantive differentiation</strong>. Each location page must offer unique value. Here is a checklist for creating compliant and effective location pages:</p>

                <ul>
                  <li><strong>Unique Local Context</strong>: Don't just say you serve a town. Mention specific neighbourhoods, local landmarks, or common issues in the area (e.g., <em>"We have extensive experience with the Victorian-era plumbing common in the terraced houses of Headingley."</em>)</li>
                  <li><strong>Service Area Specificity</strong>: Define the exact postcodes you cover, not just a generic "Leeds area."</li>
                  <li><strong>Localised Social Proof</strong>: Embed reviews from customers in that specific location.</li>
                  <li><strong>Localised Data</strong>: If you can, provide specific data, such as <em>"Our average arrival time to Horsforth is just 22 minutes."</em></li>
                  <li><strong>Local Scenarios</strong>: Address issues unique to the area, such as <em>"Specialised flood response for properties near the River Aire."</em></li>
                </ul>

                <div className="schema-enhancement">
                  <strong>Schema Enhancement:</strong> When building these pages, use the Service schema and set the areaServed property to a specific Place entity (the town name with its geo-coordinates). This is far more powerful than just using plain text.
                </div>
              </div>
            </section>

            {/* Part 3 */}
            <section id="part-3" className="playbook-section">
              <h2>Part 3: The 90-Day AI Visibility Transformation Timeline</h2>
              
              <p>Building genuine AI visibility is not a quick fix—it's a strategic, month-by-month elevation of your digital authority. This 90-day timeline is designed to align with how AI systems actually build trust in businesses: through consistent, high-quality signals over time.</p>

              <p>This structured approach mirrors whoza.ai's core methodology of taking businesses from low or no AI visibility to becoming the go-to recommendation in their local area. Each month builds on the previous one, creating compounding improvements that AI assistants recognise and reward.</p>

              <div className="timeline-month">
                <h3>Month 1 (Days 1-30): Foundation - Entity Consistency & Technical Infrastructure</h3>
                
                <p><strong>The Goal</strong>: Establish your business as a verified, trustworthy entity across all platforms that AI systems query.</p>

                <h4>Week 1: The Entity Audit</h4>
                <ul className="checklist">
                  <li>Conduct a comprehensive NAP audit: Check your Name, Address, and Phone number across Google Business Profile, Bing Places for Business, Apple Business Connect, Yell, Thomson Local, Checkatrade, TrustATrader, and Rated People.</li>
                  <li>Document all inconsistencies: Create a spreadsheet noting every variation in your business name, address format, or phone number.</li>
                  <li>Claim all unclaimed listings: Search for your business on every major platform and claim any profiles you don't yet control.</li>
                  <li>Standardise your business description: Write one definitive 150-word description of your business that includes your core services, service area, and unique selling points. This will be used consistently across all platforms.</li>
                </ul>

                <div className="why-this-matters">
                  <strong>Why This Matters:</strong> AI systems cross-reference your business information across dozens of sources. Even small inconsistencies (like "Ltd" vs "Limited") create "entity fragmentation," causing AI to lose confidence in your business identity.
                </div>

                <h4>Week 2: Platform Optimisation</h4>
                <ul className="checklist">
                  <li>Update Google Business Profile: Ensure your NAP is correct, add all relevant service categories, upload 10+ high-quality photos, and define your service area precisely using postcodes.</li>
                  <li>Optimise Bing Places for Business: Mirror your Google profile exactly. Add the same categories, photos, and service area. Remember: Bing feeds ChatGPT.</li>
                  <li>Set up Apple Business Connect: Create or claim your listing, draw your service area on the map, add attributes like "Emergency Services" and "24/7 Availability," and upload high-resolution photos.</li>
                  <li>Update directory profiles: Ensure Yell, Checkatrade, and TrustATrader all have your standardised NAP and description.</li>
                </ul>

                <div className="pro-tip">
                  <strong>Pro Tip:</strong> Take photos of your work in progress, your team, and your vehicles with location services enabled on your phone. The geotags help AI systems verify your service area.
                </div>

                <h4>Week 3: Technical Schema Implementation</h4>
                <ul className="checklist">
                  <li>Implement LocalBusiness schema: Add this to your homepage with your precise geo coordinates, address, telephone, openingHoursSpecification (include 24/7 if applicable), and priceRange.</li>
                  <li>Add Organization schema: Include sameAs links pointing to all your verified directory profiles, social media accounts, and trade association memberships (e.g., Gas Safe Register, NICEIC).</li>
                  <li>Validate your schema: Use Google's Rich Results Test and Schema Markup Validator to ensure zero errors. AI systems penalise incorrect markup.</li>
                  <li>Submit your sitemap to Bing Webmaster Tools: This is critical for ChatGPT indexing. If Bing doesn't know about your pages, ChatGPT can't recommend you.</li>
                </ul>

                <div className="common-mistake">
                  <strong>Common Mistake:</strong> Adding schema markup that doesn't match your visible page content. This is flagged as "cloaking" and will harm your visibility.
                </div>

                <h4>Week 4: Month 1 Review & Measurement</h4>
                <ul className="checklist">
                  <li>Run your first AI visibility audit: Use a free tool like Geoptie or manually test 10 priority prompts (e.g., "emergency plumber near me in [your city]", "best electrician in [your area]") across ChatGPT, Perplexity, and Google AI.</li>
                  <li>Document your baseline: Record whether your business appears, how it's described, and what competitors are being recommended instead.</li>
                  <li>Check Bing Webmaster Tools: Look at your impressions and clicks. Increases here often precede AI visibility gains.</li>
                  <li>Review Google Search Console: Check for any schema errors or warnings.</li>
                </ul>

                <p><strong>Month 1 Expected Outcome</strong>: Your business is now a verified, consistent entity across all major platforms. AI systems can confidently identify who you are, where you are, and what you do. You've laid the technical foundation for all future visibility gains.</p>
              </div>

              <div className="timeline-month">
                <h3>Month 2 (Days 31-60): Authority - Content Optimisation & Review Building</h3>
                
                <p><strong>The Goal</strong>: Create AI-quotable content and build the trust signals that make AI assistants confident in recommending you.</p>

                <h4>Week 5: Emergency Services Page Creation</h4>
                <ul className="checklist">
                  <li>Build a dedicated "Emergency Services" landing page: This should be a new page on your website specifically designed for AI citation.</li>
                  <li>Use the "Direct Answer First" format: Start with a 50-word paragraph that directly answers "What emergency services do you provide?" Include your phone number and average response time.</li>
                  <li>Add 10 location-specific FAQs: Questions like "How quickly can you respond to an emergency in [postcode]?" and "What counts as a plumbing emergency?" with direct, factual answers.</li>
                  <li>Implement FAQPage schema: Add the structured data markup that matches your visible FAQ content exactly.</li>
                </ul>

                <div className="why-this-works">
                  <strong>Why This Works:</strong> Research shows that content with FAQPage schema appears 3.2 times more frequently in AI responses. You're making it effortless for AI to quote you.
                </div>

                <h4>Week 6: Service Page Rewrites</h4>
                <ul className="checklist">
                  <li>Identify your top 3 service pages: These are likely "Boiler Repair," "Emergency Plumbing," "Electrical Installation," or similar core offerings.</li>
                  <li>Rewrite each page for conversational AI: Start each page with a direct answer to the question "What is [service]?" in 40-60 words. Follow with supporting details, pricing guidance, and local specifics.</li>
                  <li>Add HowTo schema to instructional content: If you have content like "What to do before we arrive" or "How to turn off your stopcock," mark it up with HowTo schema.</li>
                  <li>Include local context: Mention specific neighbourhoods, postcodes, or local landmarks to strengthen your geographic relevance.</li>
                </ul>

                <h4>Week 7: Strategic Review Acquisition</h4>
                <ul className="checklist">
                  <li>Request 5 detailed reviews on Checkatrade or TrustATrader: Reach out to your best recent customers and ask them to leave a review that mentions the specific service and location (e.g., "They fixed my Worcester boiler in Headingley within 2 hours").</li>
                  <li>Respond to all existing reviews: Reply to every review (good or bad) with a professional response that naturally includes keywords. Example: <em>"Thank you for choosing us for your emergency boiler repair in Leeds."</em></li>
                  <li>Implement AggregateRating schema: Once you have 50+ reviews, add this schema to your homepage to display your star rating in search results.</li>
                  <li>Diversify your review platforms: Aim for reviews on at least 3 platforms (Google, Checkatrade, Facebook) to create cross-validation signals.</li>
                </ul>

                <div className="the-2026-standard">
                  <strong>The 2026 Standard:</strong> AI assistants are 72% more likely to recommend businesses with 4.8+ star ratings across multiple platforms compared to single-platform high ratings.
                </div>

                <h4>Week 8: Month 2 Review & Optimisation</h4>
                <ul className="checklist">
                  <li>Re-test your AI visibility: Run the same 10 priority prompts you tested in Month 1. Document any improvements in citation frequency or description quality.</li>
                  <li>Analyse which content is being cited: If your emergency page or specific FAQs are being quoted, double down on that format for other services.</li>
                  <li>Check your review velocity: Ensure you're getting at least 2-3 new reviews per month. Steady acquisition signals business health to AI.</li>
                  <li>Update your website's "Last Updated" timestamps: Add or update timestamps on your key pages to signal freshness.</li>
                </ul>

                <p><strong>Month 2 Expected Outcome</strong>: You now have AI-optimised content that directly answers the questions customers ask. Your review profile demonstrates active, high-quality service. AI systems have more reasons to trust and recommend you.</p>
              </div>

              <div className="timeline-month">
                <h3>Month 3 (Days 61-90): Expansion - Geographic Coverage & Competitive Advantage</h3>
                
                <p><strong>The Goal</strong>: Dominate your local area by creating comprehensive geographic coverage and implementing advanced schema that competitors lack.</p>

                <h4>Week 9: Location-Specific Page Development</h4>
                <ul className="checklist">
                  <li>Identify your top 5 service towns/areas: These should be the locations where you do the most work or want to grow.</li>
                  <li>Create substantive location pages: For each area, build a page with unique local context (e.g., "We have extensive experience with Victorian-era plumbing in Headingley's terraced houses"), specific postcodes covered, local customer reviews, and average response times to that area.</li>
                  <li>Add Service schema with areaServed: Use structured data to define each service and the specific geographic areas you cover, with geo-coordinates for each location.</li>
                  <li>Avoid doorway page penalties: Ensure each page has at least 300 words of unique, valuable content. Generic, thin pages will harm your visibility.</li>
                </ul>

                <div className="schema-enhancement">
                  <strong>Schema Enhancement:</strong> Setting areaServed to specific Place entities (town names with geo-coordinates) is far more powerful than plain text for AI understanding.
                </div>

                <h4>Week 10: Video & Multimedia Content</h4>
                <ul className="checklist">
                  <li>Create 3 short educational videos: Topics like "How to spot a gas leak," "What to do in a plumbing emergency," or "How we respond to emergency call-outs." Aim for 2-3 minutes each.</li>
                  <li>Upload to YouTube: YouTube is the single most-cited source in AI responses. Optimise video titles and descriptions with local keywords.</li>
                  <li>Embed videos on your website: Add them to relevant service pages and mark them up with VideoObject schema, including description, uploadDate, and contentUrl.</li>
                  <li>Add video transcripts: AI systems can parse text more easily than video, so providing transcripts increases citation probability.</li>
                </ul>

                <div className="competitive-advantage">
                  <strong>Competitive Advantage:</strong> Most trades businesses don't use video. By doing so, you're accessing a citation source that your competitors are ignoring.
                </div>

                <h4>Week 11: Advanced Schema & Authority Signals</h4>
                <ul className="checklist">
                  <li>Add BreadcrumbList schema: Help AI understand your site structure by marking up your navigation breadcrumbs.</li>
                  <li>Implement Event schema (if applicable): If you offer emergency availability or special promotions, mark these up as events.</li>
                  <li>Link to trade association profiles: Ensure your Gas Safe Register, NICEIC, or FMB membership is linked from your website and included in your Organization schema.</li>
                  <li>Create a "Press & Recognition" page: Document any awards, certifications, or media mentions. AI systems use these as authority signals.</li>
                </ul>

                <h4>Week 12: Final Month Review & Strategic Planning</h4>
                <ul className="checklist">
                  <li>Conduct a comprehensive 90-day AI visibility audit: Test all 10 priority prompts again and compare results to Month 1 and Month 2.</li>
                  <li>Measure citation frequency improvements: Document how often your business is now being recommended compared to your baseline.</li>
                  <li>Analyse competitor positioning: See which competitors are still outranking you and identify what they're doing differently.</li>
                  <li>Plan your next 90 days: Based on what's working, decide whether to focus on more location pages, additional video content, or deeper schema implementation.</li>
                  <li>Consider professional tools: If you're seeing strong results, invest in a dedicated GEO tracking tool like Geoptie, ZipTie, or Profound for ongoing monitoring.</li>
                </ul>

                <p><strong>Month 3 Expected Outcome</strong>: You've established comprehensive geographic coverage, implemented advanced schema that competitors lack, and created multimedia content that AI systems prefer to cite. You're now positioned as a local authority in your trade.</p>
              </div>
            </section>

            {/* Transformation Timeline */}
            <section className="playbook-section">
              <h2>The 90-Day Transformation: What to Expect</h2>
              
              <h3>Realistic Timeline for Results</h3>

              <p><strong>Weeks 1-4 (Month 1)</strong>: You're building the foundation. Don't expect dramatic visibility changes yet. AI systems need time to re-crawl and re-evaluate your entity.</p>

              <p><strong>Weeks 5-8 (Month 2)</strong>: You should start seeing your business mentioned in AI responses, particularly for highly specific queries like "emergency [trade] in [your exact postcode]."</p>

              <p><strong>Weeks 9-12 (Month 3)</strong>: Your citation frequency should increase noticeably. You may start appearing for broader queries like "best [trade] in [city]" as AI systems recognise your comprehensive coverage and authority.</p>

              <p><strong>Beyond 90 Days</strong>: Continued monthly improvements compound. Businesses that maintain this level of optimisation typically see 3-5x increases in AI-referred traffic within 6 months.</p>
            </section>

            {/* Why 90 Days */}
            <section className="playbook-section">
              <h2>Why 90 Days? The Science of AI Trust</h2>
              
              <p>AI systems don't make instant decisions about which businesses to recommend. They evaluate trust signals over time:</p>

              <ul>
                <li><strong>Entity Consistency</strong>: Takes 2-4 weeks for AI to re-crawl and verify your updated NAP across platforms.</li>
                <li><strong>Content Freshness</strong>: AI systems prioritise recently updated content, which is why Month 2's content work is crucial.</li>
                <li><strong>Review Velocity</strong>: A sudden spike in reviews looks suspicious. Steady acquisition over 8-12 weeks signals genuine business health.</li>
                <li><strong>Schema Validation</strong>: Search engines and AI systems re-evaluate structured data on a monthly crawl cycle.</li>
              </ul>

              <p>The 90-day timeline respects these algorithmic realities whilst providing a structured path to measurable improvements each month.</p>
            </section>

            {/* Scorecard */}
            <section id="scorecard" className="playbook-section">
              <h2>Progress Tracking: Your 90-Day Scorecard</h2>
              
              <p>Use this simple scorecard to track your progress:</p>

              <div className="scorecard-table">
                <table>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Month 1 Baseline</th>
                      <th>Month 2 Progress</th>
                      <th>Month 3 Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>AI Citation Count</strong> (out of 10 test prompts)</td>
                      <td>___ / 10</td>
                      <td>___ / 10</td>
                      <td>___ / 10</td>
                    </tr>
                    <tr>
                      <td><strong>Platforms with Verified Listings</strong></td>
                      <td>___ / 8</td>
                      <td>___ / 8</td>
                      <td>___ / 8</td>
                    </tr>
                    <tr>
                      <td><strong>Schema Types Implemented</strong></td>
                      <td>___ / 6</td>
                      <td>___ / 6</td>
                      <td>___ / 6</td>
                    </tr>
                    <tr>
                      <td><strong>Total Reviews (All Platforms)</strong></td>
                      <td>___</td>
                      <td>___</td>
                      <td>___</td>
                    </tr>
                    <tr>
                      <td><strong>Average Star Rating</strong></td>
                      <td>___</td>
                      <td>___</td>
                      <td>___</td>
                    </tr>
                    <tr>
                      <td><strong>AI-Optimised Content Pages</strong></td>
                      <td>___</td>
                      <td>___</td>
                      <td>___</td>
                    </tr>
                    <tr>
                      <td><strong>Bing Webmaster Tools Impressions</strong></td>
                      <td>___</td>
                      <td>___</td>
                      <td>___</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* CTA Section */}
            <section className="playbook-cta-section">
              <div className="playbook-cta-card">
                <h2>Need Help Staying on Track?</h2>
                <p>Following this 90-day timeline requires discipline, technical knowledge, and ongoing monitoring. whoza.ai is built specifically to automate this process for UK trades businesses.</p>
                <p>We handle the technical complexity of schema implementation, monitor your AI visibility across all major platforms, and provide month-by-month guidance to ensure you're always progressing. Our platform is designed around this exact methodology: taking businesses from low or no AI visibility to becoming the trusted local authority in their area.</p>
                <Link to="/free-score" className="cta-button-large">
                  Get Your Free AI Visibility Score
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </section>

            {/* FAQs */}
            <section className="playbook-faqs">
              <h2>Frequently Asked Questions</h2>
              
              <div className="faq-grid">
                <div className="faq-card">
                  <h3>How is this different from traditional SEO?</h3>
                  <p>Traditional SEO focuses on ranking in search results pages. AI visibility (AEO/GEO) focuses on becoming the single recommended answer that AI assistants provide. It requires entity consistency, structured data, and conversational content rather than keyword optimization.</p>
                </div>

                <div className="faq-card">
                  <h3>Do I need to be technical to implement this?</h3>
                  <p>The foundational work (NAP consistency, platform optimization) requires no technical skills. Schema implementation does require some technical knowledge or a web developer. whoza.ai automates the technical complexity for you.</p>
                </div>

                <div className="faq-card">
                  <h3>How much does this cost to implement?</h3>
                  <p>The platform optimizations (Google, Bing, Apple) are free. Schema implementation costs vary depending on whether you do it yourself or hire a developer (typically £200-500 one-time). whoza.ai includes automated schema implementation in all plans.</p>
                </div>

                <div className="faq-card">
                  <h3>Will this work for my specific trade?</h3>
                  <p>Yes. This methodology works for all local service businesses: plumbers, electricians, locksmiths, builders, roofers, HVAC technicians, and more. The principles of entity consistency and authority building are universal.</p>
                </div>

                <div className="faq-card">
                  <h3>How do I know if it's working?</h3>
                  <p>Test your business name and service queries in ChatGPT, Perplexity, and Google AI monthly. Track your Bing Webmaster Tools impressions. Monitor review acquisition velocity. Use the 90-Day Scorecard provided in this playbook.</p>
                </div>
              </div>
            </section>

          </div>
        </article>

        {/* Footer CTA */}
        <section className="blog-cta">
          <div className="container">
            <div className="cta-card">
              <h2>Ready to Transform Your AI Visibility?</h2>
              <p>Get your free AI visibility score and see where you stand today. whoza.ai provides the tools, automation, and guidance to implement this entire playbook for your business.</p>
              <Link to="/free-score" className="cta-button">
                Get Free Score
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Playbook2026;
