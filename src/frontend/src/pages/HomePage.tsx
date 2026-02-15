import BannerCarousel from '../components/BannerCarousel';
import CategoryGrid from '../components/CategoryGrid';
import { useSeo } from '../hooks/useSeo';
import { siteData } from '../config/siteData';

export default function HomePage() {
  useSeo({
    title: `${siteData.brandName} - Top Balloon Decoration Services in ${siteData.serviceLocations.join(', ')}`,
    description: `Top balloon decoration services for all events - birthdays, anniversaries, baby showers, and more. Expert balloon arrangements and event decor serving ${siteData.serviceLocations.join(', ')}. Transform your celebrations with stunning balloon decorations by the top balloon decoration experts.`,
    ogImage: '/assets/generated/og-image.dim_1200x630.png',
  });

  return (
    <div className="min-h-screen">
      <BannerCarousel />
      
      <section className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {siteData.brandName}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Transform your special moments with stunning balloon decorations. Professional event decor services for all occasions.
          </p>
        </div>

        <CategoryGrid />
      </section>

      <section className="bg-muted/50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-8 sm:mb-10 md:mb-12">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="text-center p-4 sm:p-6">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎨</div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Creative Designs
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Unique and personalized balloon decoration designs tailored to your event theme
              </p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">⭐</div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Premium Quality
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                High-quality balloons and materials ensuring long-lasting and beautiful decorations
              </p>
            </div>

            <div className="text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚀</div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                On-Time Service
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Professional setup and on-time service for all your special occasions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
