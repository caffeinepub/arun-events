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

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

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
