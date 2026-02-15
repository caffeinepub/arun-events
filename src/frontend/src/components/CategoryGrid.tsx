import { useNavigate } from '@tanstack/react-router';
import { categories } from '../config/siteData';

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate({ to: `/category/${slug}` });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => handleCategoryClick(category.slug)}
          className="group flex flex-col items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 rounded-lg transition-all hover:scale-105"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm md:text-base font-semibold text-foreground text-center group-hover:text-primary transition-colors">
            {category.name}
          </p>
        </button>
      ))}
    </div>
  );
}
