export const seoConfig = {
  '/': {
    title: 'AI for Tradespeople | Whoza.ai - Get More Local Jobs with Rex',
    description: 'Rex is your AI employee helping UK tradespeople get found in ChatGPT, Google AI & more. Boost your AI visibility and get more local jobs.',
    image: '/og-image.png'
  },
  '/how-it-works': {
    title: 'How It Works | Whoza.ai - AI Employee for Tradespeople',
    description: 'Learn how Rex, your AI employee, helps tradespeople improve visibility on Google, ChatGPT, and AI search tools with weekly actionable tasks.',
    image: '/og-image.png'
  },
  '/pricing': {
    title: 'Pricing | Whoza.ai - Affordable AI Marketing for Tradespeople',
    description: 'Simple, transparent pricing for tradespeople. Monitor from £19/month, Improve from £59/month. No contracts, cancel anytime. GDPR compliant.',
    image: '/og-image.png'
  },
  '/trust': {
    title: 'Trust & Security | Whoza.ai - GDPR Compliant AI for Trades',
    description: 'Learn why UK tradespeople trust Whoza.ai. GDPR compliant, secure data handling, and human-approved tasks for peace of mind.',
    image: '/og-image.png'
  },
  '/case-studies': {
    title: 'Case Studies | Whoza.ai - Real Results for UK Tradespeople',
    description: 'See how plumbers, electricians, roofers and other tradespeople are getting more local jobs through improved AI visibility with Rex.',
    image: '/og-image.png'
  },
  '/free-score': {
    title: 'Free Visibility Confidence Score™ | Whoza.ai - Check Your Online Presence',
    description: 'Get your free Visibility Confidence Score™ in 60 seconds. See how likely your trade business is to be named and recommended on ChatGPT, Google AI, and Perplexity.',
    image: '/og-image.png'
  },
  '/start': {
    title: 'Get Started | Whoza.ai - Start Getting More Local Jobs Today',
    description: 'Create your free Whoza.ai account and let Rex help your trade business get found by more local customers on AI search tools.',
    image: '/og-image.png'
  },
  '/privacy': {
    title: 'Privacy Policy | Whoza.ai - Your Data is Protected',
    description: 'Read our privacy policy to learn how we protect your data. GDPR compliant AI marketing platform for UK tradespeople.',
    image: '/og-image.png'
  },
  '/terms': {
    title: 'Terms of Service | Whoza.ai - Fair Terms for Tradespeople',
    description: 'Review our terms of service. Transparent, fair terms for UK tradespeople using our AI marketing platform.',
    image: '/og-image.png'
  },
  '/portal': {
    title: 'Portal | Whoza.ai - Your AI Marketing Dashboard',
    description: 'Access your Whoza.ai portal to view tasks, track visibility improvements, and manage your AI marketing strategy.',
    image: '/og-image.png'
  },
  '/tasks': {
    title: 'Tasks | Whoza.ai - Your Weekly Visibility Tasks',
    description: 'View and complete your weekly visibility tasks from Rex. Simple actions to improve your AI search presence.',
    image: '/og-image.png'
  },
  '/reports': {
    title: 'Reports | Whoza.ai - Track Your AI Visibility Growth',
    description: 'View detailed reports on your AI visibility improvements and track how your trade business is performing in AI search results.',
    image: '/og-image.png'
  },
  '/blog': {
    title: 'AI Visibility Blog for UK Tradespeople | Whoza.ai',
    description: 'Expert guides on AI visibility, Answer Engine Optimization (AEO), and digital marketing for UK plumbers, electricians, builders, and tradespeople.',
    image: '/og-image.png'
  }
};

// Dynamic SEO update function for location pages and other dynamic content
export const updateSEO = ({ title, description, keywords, url, type = 'website', image = '/og-image.png' }) => {
  // Update title
  if (title) {
    document.title = title;
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('name', 'twitter:title', title);
  }

  // Update description
  if (description) {
    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('name', 'twitter:description', description);
  }

  // Update keywords
  if (keywords) {
    updateMetaTag('name', 'keywords', keywords);
  }

  // Update URL
  if (url) {
    updateMetaTag('property', 'og:url', url);
    updateLinkTag('canonical', url);
  }

  // Update type
  if (type) {
    updateMetaTag('property', 'og:type', type);
  }

  // Update image
  if (image) {
    const fullImageUrl = image.startsWith('http') ? image : `https://whoza.ai${image}`;
    updateMetaTag('property', 'og:image', fullImageUrl);
    updateMetaTag('name', 'twitter:image', fullImageUrl);
  }
};

// Helper function to update or create meta tags
const updateMetaTag = (attribute, attributeValue, content) => {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

// Helper function to update or create link tags
const updateLinkTag = (rel, href) => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (element) {
    element.setAttribute('href', href);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute('href', href);
    document.head.appendChild(element);
  }
};
