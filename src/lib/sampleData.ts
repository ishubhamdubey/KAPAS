import { Product } from './supabase';

// Centralized sample product data used across components and detail pages

const now = new Date().toISOString();

const make = (
  id: string,
  name: string,
  category: string,
  image: string,
  orig: number,
  disc: number,
  rating: number,
  sold: number,
  flags?: { featured?: boolean; bestSeller?: boolean; description?: string }
): Product => ({
  id,
  name,
  description:
    flags?.description || 'Sample product for preview. Add real products in Supabase to enable cart.',
  category,
  image_url: image,
  original_price: orig,
  discounted_price: disc,
  rating,
  sold_count: sold,
  stock_quantity: 50,
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Cream', 'Red', 'Black'],
  is_featured: !!flags?.featured,
  is_best_seller: !!flags?.bestSeller,
  created_at: now,
  updated_at: now,
});

export const newArrivalsSamples: Product[] = [
  make(
    'sample-na-1',
    'Floral Print Short Kurti',
    'short_kurti',
    '/images/category_sleevless.jpg',
    1999,
    1399,
    4.5,
    210,
    { featured: true, description: 'Sample new arrival. Add real products in Supabase to enable cart.' }
  ),
  make(
    'sample-na-2',
    'Elegant Long Kurti',
    'long_kurti',
    '/images/category_longkurti.png',
    2999,
    2099,
    4.8,
    345,
    { featured: true, description: 'Sample new arrival. Add real products in Supabase to enable cart.' }
  ),
  make(
    'sample-na-3',
    'Party Wear Frock',
    'frock',
    '/images/frock white.png',
    3499,
    2449,
    4.9,
    423,
    { featured: true, description: 'Sample new arrival. Add real products in Supabase to enable cart.' }
  ),
  make(
    'sample-na-4',
    'Designer Full Sleeve Kurti',
    'full_sleeve',
    '/images/fullsleeve_red.png',
    2799,
    1959,
    4.7,
    234,
    { featured: true, description: 'Sample new arrival. Add real products in Supabase to enable cart.' }
  ),
  make(
    'sample-na-5',
    'Designer Sleeveless Kurti',
    'sleeveless',
    '/images/category_sleevless.jpg',
    2399,
    1679,
    4.6,
    212,
    { featured: true, description: 'Sample new arrival. Add real products in Supabase to enable cart.' }
  ),
];

export const bestSellersSamples: Product[] = [
  make('sample-bs-1', 'Top Rated Long Kurti', 'long_kurti', '/images/category_longkurti.png', 2899, 1999, 4.8, 560, {
    bestSeller: true,
    description: 'Sample best seller. Add real products in Supabase to enable cart.',
  }),
  make('sample-bs-2', 'Best Seller Frock', 'frock', '/images/frock white.png', 3299, 2349, 4.9, 610, {
    bestSeller: true,
    description: 'Sample best seller. Add real products in Supabase to enable cart.',
  }),
  make(
    'sample-bs-3',
    'Popular Full Sleeve Kurti',
    'full_sleeve',
    '/images/fullsleeve_red.png',
    2599,
    1899,
    4.7,
    480,
    {
      bestSeller: true,
      description: 'Sample best seller. Add real products in Supabase to enable cart.',
    }
  ),
  make(
    'sample-bs-4',
    'Trending Sleeveless Kurti',
    'sleeveless',
    '/images/category_sleevless.jpg',
    2199,
    1599,
    4.6,
    430,
    {
      bestSeller: true,
      description: 'Sample best seller. Add real products in Supabase to enable cart.',
    }
  ),
  make('sample-bs-5', 'Backless Party Kurti', 'backless', '/images/category_backless.png', 2799, 1999, 4.8, 520, {
    bestSeller: true,
    description: 'Sample best seller. Add real products in Supabase to enable cart.',
  }),
];

export const categorySamples: Record<string, Product[]> = {
  short_kurti: [
    make('sample-short-1', 'Aanya Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1399, 999, 4.4, 120),
    make('sample-short-2', 'Naira Cotton Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1599, 1199, 4.4, 120),
    make('sample-short-3', 'Ira Printed Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1299, 899, 4.4, 120),
    make('sample-short-4', 'Myra Everyday Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1499, 1099, 4.4, 120),
  ],
  long_kurti: [
    make('sample-long-1', 'Anika Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1999, 1499, 4.4, 120),
    make('sample-long-2', 'Siya Flared Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1899, 1399, 4.4, 120),
    make('sample-long-3', 'Dia Straight Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1799, 1299, 4.4, 120),
    make('sample-long-4', 'Rhea Anarkali Kurti', 'long_kurti', '/images/category_longkurti.png', 2199, 1699, 4.4, 120),
  ],
  frock: [
    make('sample-frock-1', 'Zara Summer Frock', 'frock', '/images/frock white.png', 1699, 1199, 4.4, 120),
    make('sample-frock-2', 'Kiara Floral Frock', 'frock', '/images/frock white.png', 1599, 1099, 4.4, 120),
    make('sample-frock-3', 'Mira Casual Frock', 'frock', '/images/frock white.png', 1499, 999, 4.4, 120),
    make('sample-frock-4', 'Tara Party Frock', 'frock', '/images/frock white.png', 1999, 1499, 4.4, 120),
  ],
  full_sleeve: [
    make('sample-full-1', 'Nysa Full Sleeve Kurti', 'full_sleeve', '/images/fullsleeve_red.png', 1699, 1199, 4.4, 120),
    make('sample-full-2', 'Aarvi Solid Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1599, 1099, 4.4, 120),
    make('sample-full-3', 'Kaira Work Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1899, 1399, 4.4, 120),
    make('sample-full-4', 'Reva Rayon Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1499, 999, 4.4, 120),
  ],
  sleeveless: [
    make('sample-sleeveless-1', 'Pihu Sleeveless Kurti', 'sleeveless', '/images/category_sleevless.jpg', 1399, 999, 4.4, 120),
    make('sample-sleeveless-2', 'Riya Summer Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1499, 1099, 4.4, 120),
    make('sample-sleeveless-3', 'Isha Flowy Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1599, 1199, 4.4, 120),
    make('sample-sleeveless-4', 'Sara Chic Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1699, 1299, 4.4, 120),
  ],
  backless: [
    make('sample-backless-1', 'Avni Backless Kurti', 'backless', '/images/category_backless.png', 1899, 1399, 4.4, 120),
    make('sample-backless-2', 'Tanishi Elegant Backless', 'backless', '/images/category_backless.png', 1999, 1499, 4.4, 120),
    make('sample-backless-3', 'Misha Festive Backless', 'backless', '/images/category_backless.png', 1799, 1299, 4.4, 120),
    make('sample-backless-4', 'Nisha Casual Backless', 'backless', '/images/category_backless.png', 1699, 1199, 4.4, 120),
  ],
};

export const getSampleProductById = (id: string): Product | undefined => {
  const fromNew = newArrivalsSamples.find((p) => p.id === id);
  if (fromNew) return fromNew;
  const fromBest = bestSellersSamples.find((p) => p.id === id);
  if (fromBest) return fromBest;
  for (const arr of Object.values(categorySamples)) {
    const found = arr.find((p) => p.id === id);
    if (found) return found;
  }
  return undefined;
};
