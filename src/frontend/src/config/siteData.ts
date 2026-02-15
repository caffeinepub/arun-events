export const siteData = {
  brandName: 'Arun Events',
  serviceLocations: ['Panchkula', 'Chandigarh', 'Mohali', 'Zirakpur'],
  phone: '9696085369',
  whatsappLink: 'https://wa.me/919696085369',
};

export interface Category {
  slug: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: 'birthday',
    name: 'Birthday Decor',
    image: '/assets/generated/category-thumb-birthday.dim_800x800.png',
  },
  {
    slug: 'anniversary',
    name: 'Anniversary Decor',
    image: '/assets/generated/category-thumb-anniversary.dim_800x800.png',
  },
  {
    slug: 'welcome-baby',
    name: 'Welcome Baby',
    image: '/assets/generated/category-thumb-welcome-baby.dim_800x800.png',
  },
  {
    slug: 'baby-shower',
    name: 'Baby Shower',
    image: '/assets/generated/category-thumb-baby-shower.dim_800x800.png',
  },
  {
    slug: 'car-boot',
    name: 'Car Boot Decor',
    image: '/assets/generated/category-thumb-car-boot.dim_800x800.png',
  },
  {
    slug: 'naming-ceremony',
    name: 'Naming Ceremony',
    image: '/assets/generated/category-thumb-naming-ceremony.dim_800x800.png',
  },
  {
    slug: 'kids-birthday',
    name: 'Kids Birthday',
    image: '/assets/generated/category-thumb-kids-birthday.dim_800x800.png',
  },
  {
    slug: 'bachelor',
    name: 'Bachelor Decor',
    image: '/assets/generated/category-thumb-bachelor.dim_800x800.png',
  },
];
