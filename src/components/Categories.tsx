import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const categories = [
  {
    id: 1,
    name: 'Short Kurti',
    slug: 'short_kurti',
  image: encodeURI('images/fullsleeve_cream.png'),
  },
  {
    id: 2,
    name: 'Long Kurti',
    slug: 'long_kurti',
  image: encodeURI('images/category_longkurti.png'),
  },
  {
    id: 3,
    name: 'Frock',
    slug: 'frock',
  image: encodeURI('images/frock white.png'),
  },
  {
    id: 4,
    name: 'Full Sleeve Kurti',
    slug: 'full_sleeve',
  image: encodeURI('images/fullsleeve_red.png'),
  },
  {
    id: 5,
    name: 'Sleeveless Kurti',
    slug: 'sleeveless',
  image: encodeURI('images/category_sleevless.jpg'),
  },
  {
    id: 6,
    name: 'Backless Kurti',
    slug: 'backless',
  image: encodeURI('images/category_backless.png'),
  },
];

const Categories = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});
  // Fallback counts matching our local demo data on CategoryPage
  const sampleCounts: Record<string, number> = {
    short_kurti: 4,
    long_kurti: 4,
    frock: 4,
    full_sleeve: 4,
    sleeveless: 4,
    backless: 4,
  };

  useEffect(() => {
    const loadCounts = async () => {
      const entries = await Promise.all(
        categories.map(async (c) => {
          try {
            const { count } = await supabase
              .from('products')
              .select('id', { count: 'exact', head: true })
              .eq('category', c.slug);
            const final = count && count > 0 ? count : (sampleCounts[c.slug] ?? 0);
            return [c.slug, final] as const;
          } catch (e) {
            console.error('Count fetch failed for', c.slug, e);
            return [c.slug, sampleCounts[c.slug] ?? 0] as const;
          }
        })
      );
      setCounts(Object.fromEntries(entries));
    };
    loadCounts();
  }, []);

  return (
    <section id="categories" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-[#ff6b81] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Find the perfect style for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block"
            >
              <div className={`relative h-96 overflow-hidden ${category.slug === 'frock' ? 'bg-[#fff4e1]' : category.slug === 'full_sleeve' ? 'bg-[#f5ebd8]' : 'bg-gray-50'}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className={`w-full h-full ${['frock', 'short_kurti'].includes(category.slug) ? 'object-contain' : 'object-cover'} object-center ${category.slug === 'short_kurti' ? 'scale-110' : ''} ${category.slug === 'short_kurti' ? 'group-hover:scale-115' : 'group-hover:scale-110'} transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                <div className="absolute inset-0 bg-[#ff6b81] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-base opacity-90">{(counts[category.slug] ?? 0)} Products</p>
              </div>

              <div className="absolute top-6 right-6 bg-white text-[#ff6b81] px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
