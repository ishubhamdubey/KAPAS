import { useEffect, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Product } from '../lib/supabase';
import { newArrivalsSamples } from '../lib/sampleData';
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('wishlist_ids');
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });

  const persistWishlist = (ids: Set<string>) => {
    localStorage.setItem('wishlist_ids', JSON.stringify(Array.from(ids)));
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      persistWishlist(next);
      return next;
    });
  };

  // Fallback sample products when DB has none (centralized)
  const sampleProducts: Product[] = useMemo(() => newArrivalsSamples, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(12)
          .throwOnError();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(sampleProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sampleProducts]);

  const handleAddToCart = async (product: Product) => {
    try {
      if (product.id.startsWith('sample-')) {
        alert('This is a demo preview. Add real products in Supabase to enable cart.');
        return;
      }
      await addToCart(product, 'M', product.colors[0], 1);
      alert('Product added to cart!');
    } catch {
      alert('Failed to add product to cart');
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <section id="new-arrivals" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="new-arrivals" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              New Arrivals
            </h2>
            <div className="w-20 h-1 bg-[#ff6b81]"></div>
          </div>
          <Link
            to="/category/all"
            className="text-[#ff6b81] hover:text-[#ff8fa3] font-semibold text-sm md:text-base transition-colors flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => {
              const discount = Math.round(
                ((product.original_price - product.discounted_price) / product.original_price) * 100
              );

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[280px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative overflow-hidden group/image">
                      <button
                        aria-label="Toggle wishlist"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
                        className={`absolute top-3 right-3 z-10 p-1 ${wishlistIds.has(product.id) ? 'text-red-500' : 'text-white hover:text-red-500'}`}
                      >
                        <Heart className="w-6 h-6" fill={wishlistIds.has(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-[350px] object-cover group-hover/image:scale-110 transition-transform duration-500"
                      />
                      {/* Rating + count chip (match CategoryPage style) */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm shadow-md rounded-md px-2.5 py-1.5 flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-gray-800">{product.rating.toFixed(1)}</span>
                        <Star className="w-3.5 h-3.5 text-teal-500 fill-teal-500" aria-hidden="true" />
                      </div>
                      {/* Removed top-right discount pill; percent now shown inline near price */}
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-1 hover:text-[#ff6b81] transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* rating row removed; using overlay chip on image */}

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl font-bold text-[#ff6b81]">
                        ₹{product.discounted_price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.original_price}
                      </span>
                      {discount > 0 && (
                        <span className="text-xs text-black font-semibold">({discount}% OFF)</span>
                      )}
                    </div>
                    {/* Sold row removed to match CategoryPage */}

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#ff6b81] hover:bg-[#ff8fa3] text-white py-2.5 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
