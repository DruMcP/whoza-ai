/**
 * Mapping of Entity Confidence Engineering™ pillars to relevant blog posts
 * Used for internal linking to build topical authority
 */

export const eceBlogMapping = {
  // Pillar 1: Business Identity
  1: {
    primaryPost: {
      slug: "how-ai-search-engines-choose-which-local-businesses-to-recommend",
      title: "How AI Search Engines Choose Which Local Businesses to Recommend",
      relevance: "Learn how AI evaluates business identity and Entity Confidence"
    },
    relatedPosts: [
      {
        slug: "what-is-ai-visibility-and-why-uk-tradespeople-need-it-in-2026",
        title: "What is AI Visibility and Why UK Tradespeople Need It in 2026"
      }
    ]
  },
  
  // Pillar 2: Prove Your Qualifications
  2: {
    primaryPost: {
      slug: "how-ai-search-engines-choose-which-local-businesses-to-recommend",
      title: "How AI Search Engines Choose Which Local Businesses to Recommend",
      relevance: "Discover how credentials build trust with AI search engines"
    },
    relatedPosts: []
  },
  
  // Pillar 3: Online Presence
  3: {
    primaryPost: {
      slug: "the-ultimate-guide-to-google-business-profile-optimization-for-ai-search-2026",
      title: "The Ultimate Guide to Google Business Profile Optimization for AI Search (2026)",
      relevance: "Master the most important element of your online presence"
    },
    relatedPosts: [
      {
        slug: "why-your-business-isnt-showing-up-in-chatgpt-recommendations-and-how-to-fix-it",
        title: "Why Your Business Isn't Showing Up in ChatGPT Recommendations (And How to Fix It)"
      }
    ]
  },
  
  // Pillar 4: Reviews & Ratings
  4: {
    primaryPost: {
      slug: "how-ai-search-engines-choose-which-local-businesses-to-recommend",
      title: "How AI Search Engines Choose Which Local Businesses to Recommend",
      relevance: "See how reviews impact AI recommendations"
    },
    relatedPosts: []
  },
  
  // Pillar 5: Show Your Expertise
  5: {
    primaryPost: {
      slug: "how-to-create-an-faq-page-that-ai-can-find-and-reference",
      title: "How to Create an FAQ Page That AI Can Find and Reference",
      relevance: "Learn how to showcase your expertise for AI search"
    },
    relatedPosts: [
      {
        slug: "how-uk-tradespeople-can-get-found-on-chatgpt-and-ai-search-in-2026",
        title: "How UK Tradespeople Can Get Found on ChatGPT and AI Search in 2026"
      }
    ]
  }
};

/**
 * Get blog post link for a specific ECE pillar
 * @param {number} pillarId - The ECE pillar number (1-5)
 * @returns {object} - Primary post slug and title
 */
export function getPrimaryPostForPillar(pillarId) {
  return eceBlogMapping[pillarId]?.primaryPost || null;
}

/**
 * Get all related posts for a specific ECE pillar
 * @param {number} pillarId - The ECE pillar number (1-5)
 * @returns {array} - Array of related post objects
 */
export function getRelatedPostsForPillar(pillarId) {
  return eceBlogMapping[pillarId]?.relatedPosts || [];
}
