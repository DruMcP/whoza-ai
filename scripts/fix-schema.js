const fs = require('fs');

const file = '/root/.openclaw/workspace/whoza-ai-v0/components/whoza/schema-markup.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix SoftwareApplication in HomepageSchema: remove aggregateRating, change provider to @id
content = content.replace(
  /"provider":\s*\{\s*"@type": "Organization",\s*"name": "whoza\.ai",\s*"url": "https:\/\/whoza\.ai",\s*"logo": "https:\/\/whoza\.ai\/logo\.png",\s*"foundingLocation": "Perth, Scotland, United Kingdom",\s*"address": \{\s*"@type": "PostalAddress",\s*"streetAddress": "6 Atholl Crescent",\s*"addressLocality": "Perth",\s*"addressRegion": "Scotland",\s*"postalCode": "PH1 5JN",\s*"addressCountry": "GB"\s*\},\s*"contactPoint": \{\s*"@type": "ContactPoint",\s*"contactType": "customer support",\s*"email": "support@whoza\.ai",\s*"telephone": "\+447463141750",\s*"availableLanguage": "English",\s*"areaServed": "GB"\s*\},\s*"sameAs": \[\s*"https:\/\/www\.linkedin\.com\/company\/whoza-ai"\s*\]\s*\},\s*"aggregateRating": \{\s*"@type": "AggregateRating",\s*"ratingValue": "4\.9",\s*"reviewCount": "5",\s*"bestRating": "5"\s*\},/s,
  '"provider": {\n        "@id": "https://whoza.ai/#organization"\n      },'
);

// 2. Remove the duplicate Organization node from HomepageSchema (keep LocalBusiness that follows)
const orgBlock = /\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "Organization",\s*"@id": "https:\/\/whoza\.ai\/#organization",\s*"name": "whoza\.ai",\s*"url": "https:\/\/whoza\.ai",\s*"logo": \{\s*"@type": "ImageObject",\s*"url": "https:\/\/whoza\.ai\/logo\.webp",\s*"width": 512,\s*"height": 512\s*\},\s*"sameAs": \[\s*"https:\/\/twitter\.com\/whozaai",\s*"https:\/\/www\.linkedin\.com\/company\/whoza-ai",\s*"https:\/\/www\.facebook\.com\/whozaai"\s*\],\s*"contactPoint": \{\s*"@type": "ContactPoint",\s*"email": "support@whoza\.ai",\s*"contactType": "customer service",\s*"areaServed": "GB",\s*"availableLanguage": \["English"\]\s*\},\s*"hasOfferCatalog": \{\s*"@type": "OfferCatalog",\s*"name": "AI Voice Agent Services",\s*"itemListElement": \[\s*\{\s*"@type": "Offer",\s*"itemOffered": \{\s*"@type": "Service",\s*"name": "AI Call Capture"\s*\}\s*\},\s*\{\s*"@type": "Offer",\s*"itemOffered": \{\s*"@type": "Service",\s*"name": "AI Review Capture"\s*\}\s*\},\s*\{\s*"@type": "Offer",\s*"itemOffered": \{\s*"@type": "Service",\s*"name": "AI Visibility Tracking"\s*\}\s*\}\s*\]\s*\},\s*"about": \{\s*"@type": "Thing",\s*"name": "AI Voice Agents for UK Tradespeople",\s*"description": "whoza\.ai provides AI-powered voice agents that answer missed calls, capture enquiries via WhatsApp, collect Google reviews, and track competitor visibility for UK tradespeople\."\s*\},\s*"mentions": \[\s*\{ "@type": "Thing", "name": "WhatsApp Business" \},\s*\{ "@type": "Thing", "name": "Google Reviews" \},\s*\{ "@type": "Thing", "name": "ChatGPT" \},\s*\{ "@type": "Thing", "name": "Perplexity" \},\s*\{ "@type": "Thing", "name": "Google AI Overviews" \}\s*\],\s*"foundingDate": "2024",\s*"founder": \{"@id": "https:\/\/whoza\.ai\/#dru-mcpherson"\},\s*"description": "AI-powered voice agent platform for UK tradespeople"\s*\},\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "LocalBusiness"/s;

content = content.replace(orgBlock, '{\n      "@context": "https://schema.org",\n      "@type": "LocalBusiness"');

// 3. Fix PricingSchema - remove aggregateRating from all 4 Products, change brand to @id
content = content.replace(
  /"brand": \{\s*"@type": "Brand",\s*"name": "whoza\.ai"\s*\},/g,
  '"brand": { "@id": "https://whoza.ai/#organization" },'
);

content = content.replace(
  /"aggregateRating": \{\s*"@type": "AggregateRating",\s*"ratingValue": "4\.8",\s*"reviewCount": "127",\s*"bestRating": "5",\s*"worstRating": "1"\s*\},/g,
  ''
);

// 4. Fix VideoSchema - change author and publisher to @id, fix potentialAction
content = content.replace(
  /"author": \{\s*"@type": "Organization",\s*"name": "Whoza\.ai",\s*"url": "https:\/\/whoza\.ai",\s*"logo": \{\s*"@type": "ImageObject",\s*"url": "https:\/\/whoza\.ai\/logo\.png",\s*"width": 512,\s*"height": 512,\s*\},\s*\},\s*"publisher": \{\s*"@type": "Organization",\s*"name": "Whoza\.ai",\s*"url": "https:\/\/whoza\.ai",\s*\},\s*"potentialAction": \{\s*"@type": "WatchAction",\s*"target": \{\s*"@type": "EntryPoint",\s*"urlTemplate": embedUrl,\s*"actionPlatform": \[\s*"http:\/\/schema\.org\/DesktopWebPlatform",\s*"http:\/\/schema\.org\/MobileWebPlatform",\s*\],\s*\},\s*"expectsAcceptanceOf": \{\s*"@type": "Offer",\s*"price": "0",\s*"priceCurrency": "GBP",\s*"availability": "https:\/\/schema\.org\/InStock",\s*\},\s*\},/s,
  '"author": { "@id": "https://whoza.ai/#organization" },\n    "publisher": { "@id": "https://whoza.ai/#organization" },\n    "potentialAction": {\n      "@type": "WatchAction",\n      "target": {\n        "@type": "EntryPoint",\n        "urlTemplate": embedUrl,\n        "actionPlatform": [\n          "http://schema.org/DesktopWebPlatform",\n          "http://schema.org/MobileWebPlatform",\n        ],\n      },\n      "actionAccessibilityRequirement": {\n        "@type": "ActionAccessSpecification",\n        "availability": "https://schema.org/Free",\n        "requiresSubscription": {\n          "@type": "MediaSubscription",\n          "name": "Free",\n        },\n      },\n    },'
);

fs.writeFileSync(file, content);
console.log('schema-markup.tsx updated successfully');
