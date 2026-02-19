import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '../utils/seoConfig';
import { injectSchema } from '../utils/schemaOrg';

const SEO = ({ schemas = [], noindex = false, title: propTitle, description: propDescription }) => {
  const location = useLocation();
  const baseUrl = 'https://whoza.ai';
  const path = location.pathname;
  const canonicalUrl = `${baseUrl}${path}`;

  const pageSEO = seoConfig[path] || seoConfig['/'];
  const title = propTitle || pageSEO.title;
  const description = propDescription || pageSEO.description;
  const { image } = pageSEO;

  useEffect(() => {
    if (schemas && schemas.length > 0) {
      schemas.forEach((schema, index) => {
        const scriptId = `schema-org-${index}`;
        let scriptElement = document.getElementById(scriptId);

        if (!scriptElement) {
          scriptElement = document.createElement('script');
          scriptElement.id = scriptId;
          scriptElement.type = 'application/ld+json';
          document.head.appendChild(scriptElement);
        }

        scriptElement.textContent = JSON.stringify(schema);
      });
    }
  }, [schemas]);

  useEffect(() => {
    let canonicalLink = document.querySelector("link[rel='canonical']");

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);

    if (title) {
      document.title = title;

      const ogTitle = document.querySelector("meta[property='og:title']");
      if (ogTitle) ogTitle.setAttribute('content', title);

      const twitterTitle = document.querySelector("meta[name='twitter:title']");
      if (twitterTitle) twitterTitle.setAttribute('content', title);
    }

    if (description) {
      const metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) metaDescription.setAttribute('content', description);

      const ogDescription = document.querySelector("meta[property='og:description']");
      if (ogDescription) ogDescription.setAttribute('content', description);

      const twitterDescription = document.querySelector("meta[name='twitter:description']");
      if (twitterDescription) twitterDescription.setAttribute('content', description);
    }

    if (image) {
      const fullImageUrl = `${baseUrl}${image}`;

      const ogImage = document.querySelector("meta[property='og:image']");
      if (ogImage) ogImage.setAttribute('content', fullImageUrl);

      const ogImageSecure = document.querySelector("meta[property='og:image:secure_url']");
      if (ogImageSecure) ogImageSecure.setAttribute('content', fullImageUrl);

      const twitterImage = document.querySelector("meta[name='twitter:image']");
      if (twitterImage) twitterImage.setAttribute('content', fullImageUrl);
    }

    const ogUrl = document.querySelector("meta[property='og:url']");
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    // Handle noindex
    let robotsMeta = document.querySelector("meta[name='robots']");
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    if (noindex) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      robotsMeta.setAttribute('content', 'index, follow');
    }
  }, [path, canonicalUrl, title, description, image, baseUrl, noindex]);

  return null;
};

export default SEO;
