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
      
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {siteData.brandName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your special moments with our professional balloon decoration services. 
            From elegant balloon arches to creative themed setups, we create magical atmospheres 
            that make every celebration unforgettable.
          </p>
        </div>

        <CategoryGrid />
      </section>

      <section className="bg-accent/30 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Why Choose {siteData.brandName}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎈</div>
              <h3 className="text-xl font-semibold mb-2">Creative Balloon Designs</h3>
              <p className="text-muted-foreground">
                Stunning balloon arrangements and custom designs tailored to your event theme
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Professional Setup</h3>
              <p className="text-muted-foreground">
                Expert balloon decoration team ensuring perfect execution and timely installation
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Memorable Celebrations</h3>
              <p className="text-muted-foreground">
                Creating beautiful balloon decor that brings joy and lasting memories
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
