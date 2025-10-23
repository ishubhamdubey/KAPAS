import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase, Product } from '../lib/supabase';
import { Star, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const categoryNames: { [key: string]: string } = {
  short_kurti: 'Short Kurtis',
  long_kurti: 'Long Kurtis',
  frock: 'Frocks',
  full_sleeve: 'Full Sleeve Kurtis',
  sleeveless: 'Sleeveless Kurtis',
  backless: 'Backless Kurtis',
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('wishlist_ids');
      const arr: string[] = raw ? JSON.parse(raw) : [];
      return new Set(arr);
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

  // Local demo data shown only when no products are found in Supabase
  const sampleProducts = useMemo(() => {
    const now = new Date().toISOString();
    const make = (
      id: string,
      name: string,
      cat: string,
      image: string,
      original: number,
      discounted: number,
      rating = 4.4,
      sold = 120
    ): Product => ({
      id,
      name,
      description: 'Sample product for preview. Add real products in Supabase to enable cart.',
      category: cat,
      image_url: image,
      original_price: original,
      discounted_price: discounted,
      rating,
      sold_count: sold,
      stock_quantity: 50,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Cream', 'Red', 'Black'],
      is_featured: false,
      is_best_seller: false,
      created_at: now,
      updated_at: now,
    });

    const byCat: Record<string, Product[]> = {
      short_kurti: [
        make('sample-short-1', 'Aanya Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1399, 999),
        make('sample-short-2', 'Naira Cotton Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1599, 1199),
        make('sample-short-3', 'Ira Printed Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1299, 899),
        make('sample-short-4', 'Myra Everyday Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1499, 1099),
      ],
      long_kurti: [
        make('sample-long-1', 'Anika Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1999, 1499),
        make('sample-long-2', 'Siya Flared Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1899, 1399),
        make('sample-long-3', 'Dia Straight Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1799, 1299),
        make('sample-long-4', 'Rhea Anarkali Kurti', 'long_kurti', '/images/category_longkurti.png', 2199, 1699),
      ],
      frock: [
        make('sample-frock-1', 'Zara Summer Frock', 'frock', '/images/frock white.png', 1699, 1199),
        make('sample-frock-2', 'Kiara Floral Frock', 'frock', '/images/frock white.png', 1599, 1099),
        make('sample-frock-3', 'Mira Casual Frock', 'frock', '/images/frock white.png', 1499, 999),
        make('sample-frock-4', 'Tara Party Frock', 'frock', '/images/frock white.png', 1999, 1499),
      ],
      full_sleeve: [
        make('sample-full-1', 'Nysa Full Sleeve Kurti', 'full_sleeve', '/images/fullsleeve_red.png', 1699, 1199),
        make('sample-full-2', 'Aarvi Solid Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1599, 1099),
        make('sample-full-3', 'Kaira Work Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1899, 1399),
        make('sample-full-4', 'Reva Rayon Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1499, 999),
      ],
      sleeveless: [
        make('sample-sleeveless-1', 'Pihu Sleeveless Kurti', 'sleeveless', '/images/category_sleevless.jpg', 1399, 999),
        make('sample-sleeveless-2', 'Riya Summer Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1499, 1099),
        make('sample-sleeveless-3', 'Isha Flowy Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1599, 1199),
        make('sample-sleeveless-4', 'Sara Chic Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1699, 1299),
      ],
      backless: [
        make('sample-backless-1', 'Avni Backless Kurti', 'backless', '/images/category_backless.png', 1899, 1399),
        make('sample-backless-2', 'Tanishi Elegant Backless', 'backless', '/images/category_backless.png', 1999, 1499),
        make('sample-backless-3', 'Misha Festive Backless', 'backless', '/images/category_backless.png', 1799, 1299),
        make('sample-backless-4', 'Nisha Casual Backless', 'backless', '/images/category_backless.png', 1699, 1199),
      ],
    };
    return byCat;
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('category', category)
          .order('sold_count', { ascending: false })
          .throwOnError();
        const fallback = (category && sampleProducts[category]) || [];
        setProducts((data && data.length > 0 ? data : fallback) as Product[]);
      } catch (err) {
        console.error('Error fetching products:', err);
        const fallback = (category && sampleProducts[category]) || [];
        setProducts(fallback as Product[]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  const handleAddToCart = async (product: Product) => {
    try {
      if (product.id.startsWith('sample-')) {
        alert('This is a demo item. Add real products in Supabase to enable cart.');
        return;
      }
      await addToCart(product, 'M', product.colors[0], 1);
      alert('Product added to cart!');
    } catch {
      alert('Failed to add product to cart');
    }
  };

  const handleBuyNow = async (product: Product) => {
    if (product.id.startsWith('sample-')) {
      alert('This is a demo preview. Add real products in Supabase to enable checkout.');
      return;
    }
    try {
      await addToCart(product, 'M', product.colors[0], 1);
      navigate('/cart');
    } catch {
      alert('Could not proceed to checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-[#ff6b81] hover:text-[#ff8fa3] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {categoryNames[category || ''] || 'Products'}
          </h1>
          <div className="w-24 h-1 bg-[#ff6b81]"></div>
          <p className="mt-4 text-gray-600 text-lg">
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => {
              const discount = Math.round(
                ((product.original_price - product.discounted_price) / product.original_price) * 100
              );

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative overflow-hidden group">
                      {/* Wishlist button */}
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
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Rating + count chip */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm shadow-md rounded-md px-2.5 py-1.5 flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-gray-800">{product.rating.toFixed(1)}</span>
                        <Star className="w-3.5 h-3.5 text-teal-500 fill-teal-500" aria-hidden="true" />
                      </div>
                      {discount > 0 && (
                        <div className="absolute top-4 right-4 bg-[#ff6b81] text-white px-3 py-1 rounded-full text-sm font-bold">
                          {discount}% OFF
                        </div>
                      )}
                      {product.is_best_seller && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                          BEST SELLER
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="px-4 pt-4 pb-2">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 hover:text-[#ff6b81] transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* rating row removed; using overlay chip on image */}

                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-2xl font-bold text-[#ff6b81]">
                          ₹{product.discounted_price}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{product.original_price}
                        </span>
                      </div>
                      <span className={`text-sm ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.id.startsWith('sample-')}
                        className={`flex-1 ${product.id.startsWith('sample-') ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="flex-1 bg-[#ff6b81] hover:bg-[#ff8fa3] text-white py-2 rounded-lg font-semibold text-center transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
