const fs = require('fs');

const file = '/root/.openclaw/workspace/whoza-ai-v0/components/whoza/schema-markup.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix SoftwareApplication provider and remove aggregateRating
// The provider block spans multiple lines - let's use a simpler approach
const providerStart = content.indexOf('"provider": {\n        "@type": "Organization",');
if (providerStart !== -1) {
  const providerEnd = content.indexOf('"aggregateRating": {', providerStart);
  if (providerEnd !== -1) {
    const aggregateEnd = content.indexOf('"description": "AI voice agents answer', providerEnd);
    if (aggregateEnd !== -1) {
      const before = content.substring(0, providerStart);
      const after = content.substring(aggregateEnd);
      content = before + '"provider": {\n        "@id": "https://whoza.ai/#organization"\n      },\n      ' + after;
    }
  }
}

// 2. Fix Pricing Products - change brand to @id and remove aggregateRating
// Replace all "brand" blocks in Product schemas
content = content.replace(
  /"brand":\s*\{\s*"@type": "Brand",\s*"name": "whoza\.ai"\s*\}/g,
  '"brand": { "@id": "https://whoza.ai/#organization" }'
);

// Remove all aggregateRating blocks in Product schemas (the ones with 4.8/127)
content = content.replace(
  /,\s*"aggregateRating":\s*\{\s*"@type": "AggregateRating",\s*"ratingValue": "4\.8",\s*"reviewCount": "127",\s*"bestRating": "5",\s*"worstRating": "1"\s*\}/g,
  ''
);

// 3. Fix VideoSchema
content = content.replace(
  /"author":\s*\{\s*"@type": "Organization",\s*"name": "Whoza\.ai",\s*"url": "https:\/\/whoza\.ai",\s*"logo":\s*\{\s*"@type": "ImageObject",\s*"url": "https:\/\/whoza\.ai\/logo\.png",\s*"width": 512,\s*"height": 512,\s*\},\s*\},/,
  '"author": { "@id": "https://whoza.ai/#organization" },'
);

content = content.replace(
  /"publisher":\s*\{\s*"@type": "Organization",\s*"name": "Whoza\.ai",\s*"url": "https:\/\/whoza\.ai",\s*\},/,
  '"publisher": { "@id": "https://whoza.ai/#organization" },'
);

// Fix potentialAction in VideoSchema
content = content.replace(
  /"potentialAction":\s*\{\s*"@type": "WatchAction",\s*"target":\s*\{\s*"@type": "EntryPoint",\s*"urlTemplate": embedUrl,\s*"actionPlatform":\s*\[\s*"http:\/\/schema\.org\/DesktopWebPlatform",\s*"http:\/\/schema\.org\/MobileWebPlatform",\s*\],\s*\},\s*"expectsAcceptanceOf":\s*\{\s*"@type": "Offer",\s*"price": "0",\s*"priceCurrency": "GBP",\s*"availability": "https:\/\/schema\.org\/InStock",\s*\},\s*\},/,
  `"potentialAction": {
      "@type": "WatchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": embedUrl,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      "actionAccessibilityRequirement": {
        "@type": "ActionAccessSpecification",
        "availability": "https://schema.org/Free",
        "requiresSubscription": {
          "@type": "MediaSubscription",
          "name": "Free",
        },
      },
    },`
);

fs.writeFileSync(file, content);
console.log('schema-markup.tsx updated');

// Verify
const after = fs.readFileSync(file, 'utf8');
const remainingAgg = (after.match(/"aggregateRating":/g) || []).length;
console.log('Remaining aggregateRating count:', remainingAgg);
