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
    image: '/assets/user-photos/balloon-decoration/IMG_9060.jpeg',
  },
  {
    slug: 'anniversary',
    name: 'Anniversary Decor',
    image: '/assets/user-photos/balloon-decoration/IMG_9116-1.jpeg',
  },
  {
    slug: 'welcome-baby',
    name: 'Welcome Baby',
    image: '/assets/user-photos/balloon-decoration/IMG_9118.jpeg',
  },
  {
    slug: 'baby-shower',
    name: 'Baby Shower',
    image: '/assets/user-photos/balloon-decoration/IMG_9116-2.jpeg',
  },
  {
    slug: 'car-boot',
    name: 'Car Boot Decor',
    image: '/assets/user-photos/balloon-decoration/IMG_9116-3.jpeg',
  },
  {
    slug: 'naming-ceremony',
    name: 'Naming Ceremony',
    image: '/assets/user-photos/balloon-decoration/IMG_9116-4.jpeg',
  },
  {
    slug: 'kids-birthday',
    name: 'Kids Birthday',
    image: '/assets/user-photos/balloon-decoration/IMG_9116-5.jpeg',
  },
  {
    slug: 'bachelor',
    name: 'Bachelor Decor',
    image: '/assets/user-photos/balloon-decoration/IMG_9135.png',
  },
];
