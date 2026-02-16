import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  ogImage?: string;
}

export function useSeo({ title, description, ogImage }: SeoOptions) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or update meta tags (excluding google-site-verification)
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      // Never touch the google-site-verification meta tag
      if (name === 'google-site-verification') {
        return;
      }

      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Manage canonical link dynamically
    const setCanonicalLink = () => {
      const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
      let canonicalElement = document.querySelector('link[rel="canonical"]');
      
      if (!canonicalElement) {
        canonicalElement = document.createElement('link');
        canonicalElement.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalElement);
      }
      
      canonicalElement.setAttribute('href', canonicalUrl);
    };

    // Set canonical link
    setCanonicalLink();

    // Standard meta tags
    setMetaTag('description', description);

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', 'website', true);
    
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') 
        ? ogImage 
        : `${window.location.origin}${ogImage}`;
      setMetaTag('og:image', fullImageUrl, true);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    
    if (ogImage) {
      const fullImageUrl = ogImage.startsWith('http') 
        ? ogImage 
        : `${window.location.origin}${ogImage}`;
      setMetaTag('twitter:image', fullImageUrl);
    }
  }, [title, description, ogImage]);
}
