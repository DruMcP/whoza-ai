export function HomepageSchema() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://whoza.ai/#organization",
      "name": "whoza.ai",
      "url": "https://whoza.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://whoza.ai/logo.png",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://twitter.com/whozaai",
        "https://www.linkedin.com/company/whoza-ai",
        "https://www.facebook.com/whozaai"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "dru@whoz.ai",
        "contactType": "customer service",
        "areaServed": "GB",
        "availableLanguage": ["English"]
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Voice Agent Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Call Capture"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Review Capture"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Visibility Tracking"
            }
          }
        ]
      },
      "about": {
        "@type": "Thing",
        "name": "AI Voice Agents for UK Tradespeople",
        "description": "whoza.ai provides AI-powered voice agents that answer missed calls, capture enquiries via WhatsApp, collect Google reviews, and track competitor visibility for UK tradespeople."
      },
      "mentions": [
        { "@type": "Thing", "name": "WhatsApp Business" },
        { "@type": "Thing", "name": "Google Reviews" },
        { "@type": "Thing", "name": "ChatGPT" },
        { "@type": "Thing", "name": "Perplexity" },
        { "@type": "Thing", "name": "Google AI Overviews" }
      ],
      "foundingDate": "2024",
      "founder": {"@id": "https://whoza.ai/#dru-mcpherson"},
      "description": "AI-powered voice agent platform for UK tradespeople"
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://whoza.ai/#localbusiness",
      "name": "whoza.ai",
      "url": "https://whoza.ai",
      "logo": "https://whoza.ai/logo.png",
      "image": "https://whoza.ai/og-image.png",
      "description": "AI voice agents for UK tradespeople — answer missed calls 24/7, capture enquiries, collect reviews, and track competitors.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB",
        "addressRegion": "England"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.5074",
        "longitude": "-0.1278"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "priceRange": "££",
      "telephone": "+44-20-0000-0000",
      "email": "dru@whoz.ai",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "serviceType": "AI Call Handling Service",
      "knowsAbout": [
        "AI Voice Agents",
        "Call Handling",
        "Missed Call Recovery",
        "Lead Qualification",
        "Google Review Collection",
        "Competitor Analysis",
        "Plumbing",
        "Electrical Services",
        "HVAC",
        "Building Services",
        "Locksmith Services",
        "Roofing"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": "https://whoza.ai/#software",
      "name": "whoza.ai",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "59",
        "priceCurrency": "GBP",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://whoza.ai/pricing"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "24/7 AI call handling",
        "Instant WhatsApp alerts",
        "Lead qualification",
        "Google review collection",
        "Competitor tracking",
        "No contracts",
        "7-day free trial"
      ],
      "screenshot": {
        "@type": "ImageObject",
        "url": "https://whoza.ai/dashboard-screenshot.png"
      },
      "softwareVersion": "2025.1",
      "releaseNotes": "https://whoza.ai/changelog"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://whoza.ai/#service",
      "serviceType": "AI Call Handling for UK Tradespeople",
      "provider": {
        "@id": "https://whoza.ai/#organization"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "whoza.ai Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Starter Plan" },
            "price": "59",
            "priceCurrency": "GBP",
            "priceValidUntil": "2026-12-31"
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Growth Plan" },
            "price": "125",
            "priceCurrency": "GBP",
            "priceValidUntil": "2026-12-31"
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Pro Plan" },
            "price": "230",
            "priceCurrency": "GBP",
            "priceValidUntil": "2026-12-31"
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Scale Plan" },
            "price": "399",
            "priceCurrency": "GBP",
            "priceValidUntil": "2026-12-31"
          }
        ]
      },
      "termsOfService": "https://whoza.ai/terms"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://whoza.ai/#website",
      "url": "https://whoza.ai",
      "name": "whoza.ai",
      "publisher": {
        "@id": "https://whoza.ai/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://whoza.ai/blog/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://whoza.ai/#dru-mcpherson",
      "name": "Dru McPherson",
      "jobTitle": "Founder",
      "worksFor": {"@id": "https://whoza.ai/#organization"},
      "knowsAbout": ["Trade Business", "Plumbing", "AI Voice Agents", "Customer Service", "UK Tradespeople"],
      "description": "Dru McPherson is the founder of whoza.ai, a former trade business owner who built Katie the AI call handler for UK tradespeople.",
      "sameAs": ["https://www.linkedin.com/in/drumcpherson"],
      "url": "https://whoza.ai",
      "email": "dru@whoza.ai"
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://whoza.ai/#katie",
      "name": "Katie",
      "alternateName": "Katie by whoza.ai",
      "jobTitle": "AI Receptionist",
      "affiliation": { "@id": "https://whoza.ai/#organization" },
      "knowsAbout": ["Plumbing", "Electrical", "HVAC", "Building", "Roofing", "Customer Service", "Call Handling"],
      "description": "Katie is an AI voice agent that answers missed calls for UK tradespeople 24/7, qualifies customer enquiries, and sends them to WhatsApp for instant response."
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://whoza.ai/#mark",
      "name": "Mark",
      "alternateName": "Mark by whoza.ai",
      "jobTitle": "AI Receptionist",
      "affiliation": { "@id": "https://whoza.ai/#organization" },
      "knowsAbout": ["Plumbing", "Electrical", "HVAC", "Building", "Roofing", "Customer Service", "Call Handling"],
      "description": "Mark is an AI voice agent with a male voice that answers missed calls for UK tradespeople 24/7, qualifies customer enquiries, and sends them to WhatsApp for instant response."
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://whoza.ai/#claire",
      "name": "Claire",
      "alternateName": "Claire by whoza.ai",
      "jobTitle": "AI Review Collection Agent",
      "affiliation": { "@id": "https://whoza.ai/#organization" },
      "knowsAbout": ["Google Reviews", "Review Management", "Customer Feedback", "Reputation Management"],
      "description": "Claire is an AI review collection agent that automatically follows up after completed jobs to gather Google reviews and monitors competitor review activity."
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://whoza.ai/#rex",
      "name": "Rex",
      "alternateName": "Rex by whoza.ai",
      "jobTitle": "AI Visibility Agent",
      "affiliation": { "@id": "https://whoza.ai/#organization" },
      "knowsAbout": ["SEO", "Competitor Analysis", "AI Visibility", "ChatGPT Optimization", "Google AI Overviews"],
      "description": "Rex is an AI visibility and competitor tracking agent that analyses competitors monthly and delivers weekly action reports to improve ChatGPT, Google AI, and customer recommendations."
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How whoza.ai Works",
      "description": "Get set up with whoza.ai in 4 simple steps: We answer every call, book real enquiries, send them to your phone, and you accept or decline.",
      "totalTime": "PT30M",
      "supply": [
        { "@type": "HowToSupply", "name": "Your existing business phone number" }
      ],
      "tool": [
        { "@type": "HowToTool", "name": "WhatsApp" }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "We Answer Every Call",
          "text": "Customer calls, Katie or Mark answers within 3 seconds. No voicemail, no missed opportunity. 24/7 availability with natural conversation that understands trade terms.",
          "url": "https://whoza.ai/#how-it-works"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "We Book Real Enquiries",
          "text": "Katie gathers all the details: what they need, when they need it, where they are. Collects job requirements, confirms location and urgency, and filters time-wasters.",
          "url": "https://whoza.ai/#how-it-works"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "We Send Them to Your Phone",
          "text": "Qualified enquiry lands on your phone instantly. Customer name, job type, location, time, and value. Accept, decline, or callback in just 2 taps.",
          "url": "https://whoza.ai/#how-it-works"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "You Accept, Call Back or Decline",
          "text": "You control every job. The enquiry is captured instantly with full details sent to your phone. You only deal with real, qualified jobs.",
          "url": "https://whoza.ai/#how-it-works"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does Whoza cost in total?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You pay a monthly plan fee (Starter £59, Growth £125, Pro £230, Scale £399 — all +VAT). Each plan includes a set number of call handling minutes and booked enquiries. Additional enquiries beyond your included amount are charged per booking. Overage minutes are billed at £0.22 per minute. There are no hidden setup fees or long-term contracts."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — every new account starts with a 7-day free trial on the Starter plan. Your trial includes 20 minutes of call handling and up to 4 booked enquiries at no charge. No credit card required to start. If Whoza works for your business, your trial automatically converts to a paid plan. If not, you can cancel anytime during the trial with no charge."
          }
        },
        {
          "@type": "Question",
          "name": "What happens to my data if I cancel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can cancel anytime with one click. Your call recordings, customer data, and enquiry history are yours. We can export your data on request, and all stored data is deleted in line with GDPR requirements after cancellation."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can I get set up?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most tradespeople are fully set up in under 30 minutes. You'll forward your existing business number to your new whoza.ai number, customize your agent's greeting, connect your calendar, and you're live. No technical knowledge required."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if Katie can't handle a call?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Katie is trained to recognize when she needs to transfer to a human. For complex queries, emergencies, or if the customer specifically requests you, she'll take a message and notify you immediately via SMS and email. You can call them back within seconds."
          }
        },
        {
          "@type": "Question",
          "name": "Does it work with my existing phone number?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You simply forward your existing business number to your whoza.ai number. Your customers call the same number they always have — they just get answered every time instead of hitting voicemail."
          }
        },
        {
          "@type": "Question",
          "name": "What trades do you support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We support all trades including plumbers, electricians, builders, roofers, painters, landscapers, heating engineers, carpenters, tilers, plasterers, and more. Our agents are trained on trade-specific terminology and common customer queries for each profession."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data safe and compliant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We're fully compliant with all relevant data protection regulations. All call recordings and customer data are encrypted, stored in secure local data centers, and you maintain full control. You can delete any data at any time from your dashboard."
          }
        },
        {
          "@type": "Question",
          "name": "What if I want to cancel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cancel anytime — no contracts, no cancellation fees, no hassle. We're confident you'll stay because the system pays for itself many times over, but if it's not right for your business, you can cancel with one click from your dashboard."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "AudioObject",
      "name": "Hear Katie Answer a Real Customer Call",
      "description": "30-second demo of Katie, the AI voice agent for UK tradespeople, answering a real customer call about a leaky tap.",
      "contentUrl": "https://whoza.ai/audio/katie-demo.mp3",
      "encodingFormat": "audio/mpeg",
      "duration": "PT30S",
      "author": { "@id": "https://whoza.ai/#katie" },
      "publisher": { "@id": "https://whoza.ai/#organization" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://whoza.ai/"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".faq-question", ".how-it-works-step"]
    }
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

export function PricingSchema() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whoza.ai/" },
        { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://whoza.ai/pricing" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does whoza.ai cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "whoza.ai offers four plans: Starter at £59/month, Growth at £125/month, Pro at £230/month, and Scale at £399/month. All plans include a 7-day free trial and are on a monthly rolling basis with no long-term contracts."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a setup fee?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No setup fee. Your AI voice agent is configured and live within 30 minutes of signing up."
          }
        },
        {
          "@type": "Question",
          "name": "Can I change plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in the 7-day free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your 7-day free trial on the Starter plan includes: 20 minutes of AI call handling, up to 4 booked enquiries, full access to the WhatsApp delivery system, and the complete dashboard. This gives you enough time to see real results from actual customer calls. Fair usage applies — the trial is designed for genuine business evaluation, not extended free service."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a credit card for the free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No credit card required to start your 7-day free trial. You only add payment details when you choose to continue after the trial period."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "whoza.ai Starter Plan",
      "description": "AI call handling for small trade businesses. 0 included jobs, pay per booking.",
      "brand": { "@id": "https://whoza.ai/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "59",
        "priceCurrency": "GBP",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://whoza.ai/pricing",
        "description": "£59/month + VAT. 0 included jobs. £4.50 per job booked."
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "whoza.ai Growth Plan",
      "description": "AI call handling for growing trade businesses. 15 included jobs per month.",
      "brand": { "@id": "https://whoza.ai/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "125",
        "priceCurrency": "GBP",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://whoza.ai/pricing",
        "description": "£125/month + VAT. 15 included jobs. £3.25 per additional job."
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "whoza.ai Pro Plan",
      "description": "AI call handling for established trade businesses. 40 included jobs per month.",
      "brand": { "@id": "https://whoza.ai/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "230",
        "priceCurrency": "GBP",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://whoza.ai/pricing",
        "description": "£230/month + VAT. 40 included jobs. £2.75 per additional job."
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "whoza.ai Scale Plan",
      "description": "AI call handling for multi-person trade businesses. 100 included jobs per month.",
      "brand": { "@id": "https://whoza.ai/#organization" },
      "offers": {
        "@type": "Offer",
        "price": "399",
        "priceCurrency": "GBP",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://whoza.ai/pricing",
        "description": "£399/month + VAT. 100 included jobs. £2.25 per additional job."
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`schema-pricing-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
