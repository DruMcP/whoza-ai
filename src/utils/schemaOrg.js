/**
 * Comprehensive Schema.org structured data utility
 * Implements JSON-LD schemas for enhanced AI crawler discoverability
 */

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://whoza.ai';
}

/**
 * Generate WebSite schema with search action
 * @param {Object} config - Configuration object
 * @returns {Object} WebSite schema
 */
export function generateWebSiteSchema(config = {}) {
  const baseUrl = config.baseUrl || 'https://whoza.ai';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: config.name || 'Whoza - AI Visibility Platform for UK Tradespeople',
    description: config.description || 'Rex helps UK tradespeople improve their visibility in AI search results like ChatGPT, Google AI, and Perplexity. Get found by more customers through Entity Confidence Engineering™.',
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/competitor-analysis?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en-GB'
  };
}

/**
 * Generate Organization schema
 * @param {Object} config - Configuration object
 * @returns {Object} Organization schema
 */
export function generateOrganizationSchema(config = {}) {
  const baseUrl = config.baseUrl || 'https://whoza.ai';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Whoza',
    legalName: 'Whoza Limited',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': `${baseUrl}/#logo`,
      url: `${baseUrl}/production_logo.png`,
      contentUrl: `${baseUrl}/production_logo.png`,
      caption: 'Whoza Logo'
    },
    description: 'AI visibility platform helping UK tradespeople get found in ChatGPT, Google AI, and Perplexity through Entity Confidence Engineering™.',
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'GB'
      }
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'hello@whoza.ai',
      availableLanguage: ['English']
    },
    sameAs: [
      'https://twitter.com/whozaai',
      'https://linkedin.com/company/whoza'
    ]
  };
}

/**
 * Generate BreadcrumbList schema
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @param {string} baseUrl - Base URL
 * @returns {Object} BreadcrumbList schema
 */
export function generateBreadcrumbSchema(breadcrumbs, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url ? `${baseUrl}${crumb.url}` : undefined
    }))
  };
}

/**
 * Generate Article schema
 * @param {Object} article - Article data
 * @param {string} baseUrl - Base URL
 * @returns {Object} Article schema
 */
export function generateArticleSchema(article, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image ? `${baseUrl}${article.image}` : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: 'Whoza',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Whoza',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/production_logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${article.url}`
    }
  };
}

/**
 * Generate Person schema
 * @param {Object} person - Person data
 * @param {string} baseUrl - Base URL
 * @returns {Object} Person schema
 */
export function generatePersonSchema(person, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: person.organization || 'Whoza'
    },
    url: person.url ? `${baseUrl}${person.url}` : undefined,
    image: person.image,
    sameAs: person.socialLinks || []
  };
}

/**
 * Generate Product schema
 * @param {Object} product - Product data
 * @param {string} baseUrl - Base URL
 * @returns {Object} Product schema
 */
export function generateProductSchema(product, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Whoza'
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}${product.url}`,
      priceValidUntil: product.priceValidUntil,
      seller: {
        '@type': 'Organization',
        name: 'Whoza'
      }
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count
    } : undefined
  };
}

/**
 * Generate Service schema
 * @param {Object} service - Service data
 * @param {string} baseUrl - Base URL
 * @returns {Object} Service schema
 */
export function generateServiceSchema(service, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Whoza',
      url: baseUrl
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    serviceType: service.serviceType,
    offers: service.price ? {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'GBP'
    } : undefined
  };
}

/**
 * Generate FAQPage schema
 * @param {Array} faqs - Array of FAQ items
 * @param {string} baseUrl - Base URL
 * @returns {Object} FAQPage schema
 */
export function generateFAQPageSchema(faqs, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate HowTo schema
 * @param {Object} howTo - HowTo data
 * @param {string} baseUrl - Base URL
 * @returns {Object} HowTo schema
 */
export function generateHowToSchema(howTo, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image ? `${baseUrl}${step.image}` : undefined
    }))
  };
}

/**
 * Generate LocalBusiness schema
 * @param {Object} business - Business data
 * @param {string} baseUrl - Base URL
 * @returns {Object} LocalBusiness schema
 */
export function generateLocalBusinessSchema(business, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': business.type || 'LocalBusiness',
    name: business.name,
    image: business.image,
    '@id': business.id,
    url: business.url,
    telephone: business.telephone,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country || 'GB'
    },
    geo: business.geo ? {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude
    } : undefined,
    openingHoursSpecification: business.hours ? business.hours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes
    })) : undefined
  };
}

/**
 * Generate SoftwareApplication schema
 * @param {Object} app - Application data
 * @param {string} baseUrl - Base URL
 * @returns {Object} SoftwareApplication schema
 */
export function generateSoftwareApplicationSchema(app, baseUrl = 'https://whoza.ai') {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name || 'Rex - AI Visibility Assistant',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: app.price || '59',
      priceCurrency: 'GBP'
    },
    aggregateRating: app.rating ? {
      '@type': 'AggregateRating',
      ratingValue: app.rating.value,
      reviewCount: app.rating.count
    } : undefined,
    author: {
      '@type': 'Organization',
      name: 'Whoza',
      url: baseUrl
    }
  };
}

/**
 * Inject schema into page head
 * @param {Object|Array} schema - Schema object or array of schemas
 */
export function injectSchema(schema) {
  if (typeof window === 'undefined') return;

  const schemas = Array.isArray(schema) ? schema : [schema];

  schemas.forEach((schemaObj, index) => {
    const scriptId = `schema-org-${index}`;
    let scriptElement = document.getElementById(scriptId);

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schemaObj);
  });
}

/**
 * Generate comprehensive home page schemas
 * @param {string} baseUrl - Base URL
 * @returns {Array} Array of schemas
 */
export function generateHomePageSchemas(baseUrl = 'https://whoza.ai') {
  return [
    generateWebSiteSchema({ baseUrl }),
    generateOrganizationSchema({ baseUrl }),
    generateSoftwareApplicationSchema({
      name: 'Rex - AI Visibility Assistant',
      price: '59',
      rating: {
        value: '5.0',
        count: '15'
      }
    }, baseUrl)
  ];
}

/**
 * Generate pricing page schemas
 * @param {Array} plans - Array of pricing plans
 * @param {string} baseUrl - Base URL
 * @returns {Array} Array of schemas
 */
export function generatePricingPageSchemas(plans, baseUrl = 'https://whoza.ai') {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' }
  ], baseUrl);

  const products = plans.map(plan => generateProductSchema({
    name: plan.name,
    description: plan.description,
    price: plan.price,
    url: '/pricing',
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }, baseUrl));

  return [breadcrumbs, ...products];
}

/**
 * Generate VideoObject schema for LLM/SEO optimization
 * @param {Object} video - Video data
 * @param {string} video.name - Video title
 * @param {string} video.description - Video description
 * @param {string} video.thumbnailUrl - Thumbnail URL
 * @param {string} video.contentUrl - Direct video file URL
 * @param {string} video.uploadDate - ISO upload date
 * @param {string} video.duration - ISO 8601 duration (e.g., 'PT60S')
 * @param {string} baseUrl - Base URL
 * @returns {Object} VideoObject schema
 */
export function generateVideoObjectSchema(
  { name, description, thumbnailUrl, contentUrl, uploadDate, duration },
  baseUrl = 'https://whoza.ai'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: thumbnailUrl.startsWith('http') ? thumbnailUrl : `${baseUrl}${thumbnailUrl}`,
    contentUrl: contentUrl.startsWith('http') ? contentUrl : `${baseUrl}${contentUrl}`,
    uploadDate,
    duration,
    publisher: {
      '@type': 'Organization',
      name: 'Whoza.ai',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`
      }
    }
  };
}
