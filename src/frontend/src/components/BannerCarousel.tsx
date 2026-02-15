import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteMedia } from '../config/siteMedia';

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const banners = siteMedia.banners;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay effect - runs when not paused and there are 2+ banners
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;

    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext, banners.length]);

  if (banners.length === 0) {
    return null;
  }

  return (
    <section
      className="relative w-full bg-muted overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative aspect-[16/9] sm:aspect-[18/9] md:aspect-[20/9] lg:aspect-[21/9] max-h-[600px]">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner}
              alt={`Event decoration banner ${index + 1}`}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Navigation buttons */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-10"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-10"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  index === currentIndex
                    ? 'bg-primary w-6 sm:w-8'
                    : 'bg-white/60 hover:bg-white/80 w-2'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
