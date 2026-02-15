import { useParams, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useSeo } from '../hooks/useSeo';
import { siteMedia } from '../config/siteMedia';
import { categories, siteData } from '../config/siteData';
import Lightbox from '../components/Lightbox';
import { ChevronLeft } from 'lucide-react';

export default function CategoryGalleryPage() {
  const { slug } = useParams({ strict: false });
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const category = categories.find((cat) => cat.slug === slug);
  const images = category ? siteMedia.categoryGalleries[category.slug] || [] : [];

  useSeo({
    title: category
      ? `${category.name} Balloon Decoration - Arun Events`
      : 'Category Not Found - Arun Events',
    description: category
      ? `Browse our stunning ${category.name.toLowerCase()} balloon decoration gallery. Top balloon decoration services for all events in ${siteData.serviceLocations.join(', ')}. Professional balloon arrangements and creative designs.`
      : 'Category not found',
    ogImage: '/assets/generated/og-image.dim_1200x630.png',
  });

  useEffect(() => {
    if (!category) {
      // Redirect to home if category not found
      navigate({ to: '/' });
    }
  }, [category, navigate]);

  if (!category) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our beautiful {category.name.toLowerCase()} balloon decoration designs and creative setups
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎈</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Balloon Decoration Photos Coming Soon
            </h2>
            <p className="text-muted-foreground">
              We're currently updating our balloon decoration gallery. Check back soon for stunning photos!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all hover:scale-[1.02]"
              >
                <img
                  src={image}
                  alt={`${category.name} balloon decoration ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
          categoryName={category.name}
        />
      )}
    </div>
  );
}
