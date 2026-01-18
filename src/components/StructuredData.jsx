import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StructuredData = () => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // Remove existing structured data scripts to avoid duplicates
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
    existingScripts.forEach(script => script.remove());

    // LocalBusiness Schema - Critical for local SEO and AI visibility
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://whoza.ai/#localbusiness",
      "name": "Whoza.ai",
      "alternateName": "Whoza",
      "description": "AI-powered visibility platform helping UK tradespeople get found in ChatGPT, Google AI, Perplexity, and other AI search engines. Rex, your AI employee, optimizes your online presence for maximum local visibility.",
      "url": "https://whoza.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://whoza.ai/favicon.svg",
        "width": "100",
        "height": "100"
      },
      "image": "https://whoza.ai/favicon.svg",
      "telephone": "+44-CONTACT",
      "email": "hello@whoza.ai",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB",
        "addressRegion": "England"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "addressCountry": "GB"
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "United Kingdom",
          "sameAs": "https://en.wikipedia.org/wiki/United_Kingdom"
        },
        {
          "@type": "City",
          "name": "London"
        },
        {
          "@type": "City",
          "name": "Manchester"
        },
        {
          "@type": "City",
          "name": "Birmingham"
        }
      ],
      "priceRange": "Free - £££",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "200",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://twitter.com/whozaai"
      ]
    };

    // ProfessionalService Schema - For service-based business
    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://whoza.ai/#service",
      "name": "Whoza.ai - AI Visibility for Tradespeople",
      "description": "Professional AI visibility optimization service for UK tradespeople. Get found in ChatGPT, Google AI, Perplexity, and other AI search engines.",
      "provider": {
        "@type": "Organization",
        "name": "Whoza.ai",
        "url": "https://whoza.ai"
      },
      "serviceType": "AI Marketing and Visibility Optimization",
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "audience": {
        "@type": "BusinessAudience",
        "name": "UK Tradespeople",
        "audienceType": "Plumbers, Electricians, Roofers, Builders, and 50+ trades"
      },
      "serviceOutput": {
        "@type": "Thing",
        "name": "Increased AI Visibility and Local Job Leads"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Visibility Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Free AI Visibility Score",
              "description": "Get your free AI visibility score and see how you rank in AI search engines"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Rex AI Employee",
              "description": "Your AI employee that optimizes your visibility across ChatGPT, Google AI, and more"
            }
          }
        ]
      }
    };

    // WebSite Schema with SearchAction - Helps AI understand site structure
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://whoza.ai/#website",
      "url": "https://whoza.ai",
      "name": "Whoza.ai",
      "description": "AI visibility platform for UK tradespeople",
      "publisher": {
        "@type": "Organization",
        "name": "Whoza.ai"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://whoza.ai/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Add all schemas to the page
    const schemas = [localBusinessSchema, professionalServiceSchema, websiteSchema];
    
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      const dynamicScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
      dynamicScripts.forEach(script => script.remove());
    };
  }, [path]);

  return null;
};

export default StructuredData;
