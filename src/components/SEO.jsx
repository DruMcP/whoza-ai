import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '../utils/seoConfig';

const SEO = () => {
  const location = useLocation();
  const baseUrl = 'https://whoza.ai';
  const path = location.pathname;
  const canonicalUrl = `${baseUrl}${path}`;

  const pageSEO = seoConfig[path] || seoConfig['/'];
  const { title, description, image } = pageSEO;

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
  }, [path, canonicalUrl, title, description, image, baseUrl]);

  return null;
};

export default SEO;
