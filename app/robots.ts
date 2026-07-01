import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers
      {
        userAgent: "*",
        allow: ["/", "/_next/static/"],
        disallow: [
          "/_next/",
          "/api/",
          "/admin/",
          "/portal/",
          "/checkout/",
          "/login/",
          "/sign-in/",
          "/dashboard/",
          "/cdn-cgi/",
          "/*.json$",
          "/*?nocache=",
        ],
      },
      // OpenAI
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      // Anthropic
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      // Google
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      // Bing
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "msnbot", allow: "/" },
      // Meta
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Meta-ExternalFetcher", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      // Apple
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      // ByteDance / TikTok
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "TikTokSpider", allow: "/" },
      // Naver
      { userAgent: "Naverbot", allow: "/" },
      { userAgent: "Yeti", allow: "/" },
      // DuckDuckGo
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "DuckDuckGo-Favicons-Bot", allow: "/" },
      // Common Crawl
      { userAgent: "CCBot", allow: "/" },
      // You.com
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "You.com-Bot", allow: "/" },
      // Imagesift
      { userAgent: "ImagesiftBot", allow: "/" },
      // Petal
      { userAgent: "PetalBot", allow: "/" },
      // Seznam
      { userAgent: "SeznamBot", allow: "/" },
      // Yandex
      { userAgent: "YandexBot", allow: "/" },
      // Sogou
      { userAgent: "Sogou web spider", allow: "/" },
      // Baidu
      { userAgent: "Baiduspider", allow: "/" },
    ],
    sitemap: "https://whoza.ai/sitemap.xml",
  }
}
