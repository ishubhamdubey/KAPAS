import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase, Product } from '../lib/supabase';
import { getSampleProductById } from '../lib/sampleData';
import { Star, ShoppingCart, ArrowLeft, Truck, RotateCcw, Shield, Info, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import recommender from '../lib/recommender';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [pincode, setPincode] = useState('');
  const [pinResult, setPinResult] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<Array<{ product: Product; score?: number }>>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // safer supabase usage: don't rely on throwOnError
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (!error && data) {
          setProduct(data as Product);
          setSelectedColor((data.colors && data.colors[0]) ?? '');
          return;
        }
        // If not found in DB, try local samples
        if (id) {
          const sample = getSampleProductById(id);
          if (sample) {
            setProduct(sample);
            setSelectedColor((sample.colors && sample.colors[0]) ?? '');
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        if (id) {
          const sample = getSampleProductById(id);
          if (sample) {
            setProduct(sample);
            setSelectedColor((sample.colors && sample.colors[0]) ?? '');
          }
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (typeof product.id === 'string' && product.id.startsWith('sample-')) {
      alert('This is a demo preview. Add real products in Supabase to enable cart.');
      return;
    }
    try {
  await addToCart(product, selectedSize, selectedColor, 1);
      alert('Product added to cart successfully!');
    } catch {
      alert('Failed to add product to cart');
    }
  };

  // Note: Direct Buy Now flow replaced with Wishlist per requested layout

  const handleWishlist = () => {
    // Lightweight wishlist UX for now; navigate to wishlist page if desired
    if (typeof product?.id === 'string' && product.id.startsWith('sample-')) {
      alert('Demo preview: Wishlist is not enabled for sample items.');
      return;
    }
    navigate('/wishlist');
  };

  const handlePincodeCheck = () => {
    if (!pincode || pincode.length < 6) {
      setPinResult('Please enter a valid 6-digit PIN code.');
      return;
    }
    // Simulate simple estimation based on last digit
    const days = (Number(pincode[pincode.length - 1]) % 3) + 3; // 3-5 days
    setPinResult(`Estimated delivery: ${days}-day delivery available. Pay on Delivery: ${days % 2 === 0 ? 'Not available' : 'Available'}.`);
  };

  // Build recommender index and fetch product recommendations from sample data when product is ready
  useEffect(() => {
    if (!product) return;
    try {
      recommender.trainIndex();
      // recommender expects string id
      const recs = recommender.recommendForProduct(String(product.id), 6);
      // recs are { product, score }
      setRecommended(recs.map((r: any) => ({ product: r.product as Product, score: r.score })));
    } catch (err) {
      console.error('Recommender error:', err);
      setRecommended([]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <Link to="/" className="text-[#ff6b81] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Safe helpers to avoid runtime crashes when some product fields are missing
  const safeOriginal = Number(product.original_price ?? 0);
  const safeDiscounted = Number(product.discounted_price ?? safeOriginal);
  const discount = safeOriginal > 0 ? Math.round(((safeOriginal - safeDiscounted) / safeOriginal) * 100) : 0;

  const safeImg = product.image_url ?? '/images/placeholder.png';
  const safeColors = product.colors ?? [];
  const safeSizes = product.sizes ?? [];
  const safeRating = typeof product.rating === 'number' ? product.rating : 0;

  // Derived specs for structured description (guard category access)
  const readableCategory = (product.category ?? '')
    .split('_')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
  const sleeveLength = (product.category ?? '').includes('sleeveless')
    ? 'Sleeveless'
    : (product.category ?? '').includes('full')
    ? 'Full Sleeves'
    : 'Three-Quarter Sleeves';
  // const lengthSpec = product.category.includes('long')
  //   ? 'Calf length'
  //   : product.category.includes('frock')
  //   ? 'Knee length'
  //   : 'Hip length';
  // const packageContains = product.category.includes('kurti') ? '1 Kurti' : '1 Dress';

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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <img
                src={safeImg}
                alt={product.name ?? 'Product image'}
                className="w-full h-auto rounded-lg"
              />
              {/* Removed top-right discount pill; percent shown inline in price section */}
              {product.is_best_seller && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-4 py-2 rounded-full text-lg font-bold">
                  BEST SELLER
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>

              {/* Rating pill to match reference style */}
              <div className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 w-max mb-3 text-sm text-gray-800">
                <span className="font-semibold">{safeRating.toFixed(1)}</span>
                <Star className="w-4 h-4 text-green-600 fill-green-600" />
                <span className="text-gray-500">Ratings</span>
              </div>

              {/* Price row aligned like reference */}
              <div className="mb-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#ff6b81]">₹{safeDiscounted}</span>
                  <span className="text-xl text-gray-500 line-through">₹{safeOriginal}</span>
                  {discount > 0 && (
                    <span className="text-base text-black font-semibold">({discount}% OFF)</span>
                  )}
                </div>
              </div>
              <p className="text-sm text-green-700 font-medium mb-5">inclusive of all taxes</p>
              <div className="mb-6">
                <h3 className="uppercase text-sm tracking-wide font-semibold text-gray-800 mb-2">More Color</h3>
                <div className="flex gap-3">
                  {safeColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-12 h-12 rounded-md border transition-all flex items-center justify-center text-xs font-medium ${
                        selectedColor === color
                          ? 'border-[#ff6b81] ring-2 ring-[#ff6b81]/30'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                        title={color}
                    >
                      <span className="px-1 text-gray-700">{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Size row with Size Chart */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="uppercase text-sm tracking-wide font-semibold text-gray-800">Select Size</h3>
                  <button
                    onClick={() => alert('Size chart coming soon')}
                    className="text-sm font-semibold text-[#ff6b81] hover:text-[#ff8fa3]"
                  >
                    Size Chart
                  </button>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {safeSizes.map((size) => (
                    <div key={size} className="relative">
                      <button
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-full border-2 text-sm font-semibold transition-all ${
                          selectedSize === size
                            ? 'border-[#ff6b81] text-[#ff6b81]'
                            : 'border-gray-300 text-gray-800 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                      {/* {size === 'XL' && (
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-orange-600">3 left</span>
                      )} */}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity removed on PDP; will be managed on Cart page */}

              {/* Stock indicator intentionally removed on PDP */}

                      {/* Action buttons like reference */}
                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={handleAddToCart}
                          disabled={Number(product.stock_quantity ?? 0) === 0}
                          className="flex-1 bg-[#ff5171] hover:bg-[#ff6b81] text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={handleWishlist}
                          className="flex-1 bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
                        >
                          <Heart className="w-5 h-5" />
                          <span>Wishlist</span>
                        </button>
                      </div>

                      {/* Delivery Options with PIN code */}
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Truck className="w-5 h-5 text-gray-700" />
                          <h3 className="text-sm font-semibold text-gray-800">Delivery Options</h3>
                        </div>
                        <div className="flex gap-2 max-w-md">
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="Enter 6-digit pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6b81]"
                          />
                          <button
                            onClick={handlePincodeCheck}
                            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-semibold"
                          >
                            Check
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Please enter 6-digit PIN code to check delivery time & Pay on Delivery availability.</p>
                        {pinResult && <p className="text-sm text-gray-700 mt-2">{pinResult}</p>}
                      </div>

                      {/* Delivery / Returns / Payments info */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3 p-3 rounded-md bg-gray-50">
                          <Truck className="w-5 h-5 text-gray-700 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-gray-800">Fast Delivery</div>
                            <div className="text-xs text-gray-600">3-5 business days</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-md bg-gray-50">
                          <RotateCcw className="w-5 h-5 text-gray-700 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-gray-800">Easy Returns</div>
                            <div className="text-xs text-gray-600">10-day hassle-free</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-md bg-gray-50">
                          <Shield className="w-5 h-5 text-gray-700 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-gray-800">Secure Payments</div>
                            <div className="text-xs text-gray-600">100% protected checkout</div>
                          </div>
                        </div>
                      </div>

                      {/* Structured description blocks below primary actions */}
                      <div className="mt-8 border-t pt-6">
                        {/* Product Details */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h3>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Pure cotton straight {readableCategory.toLowerCase()}</li>
                            <li>All-over floral print</li>
                            <li>Round neck; three-quarter, regular sleeves</li>
                            <li>Woven 100% cotton</li>
                          </ul>
                        </div>

                        {/* Size & Fit */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Size & Fit</h3>
                          <p className="text-gray-700">Model shown is 5'8" and is wearing a size S.</p>
                        </div>

                        {/* Material & Care */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Material & Care</h3>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Pure cotton</li>
                            <li>Hand wash</li>
                          </ul>
                        </div>

                        {/* Specifications */}
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Specifications</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-gray-800">
                            <div>
                              <div className="text-xs uppercase tracking-wide text-gray-500">Neck</div>
                              <div className="font-medium">Round Neck</div>
                            </div>
                            <div>
                              <div className="text-xs uppercase tracking-wide text-gray-500">Weave Pattern</div>
                              <div className="font-medium">Regular</div>
                            </div>
                            <div>
                              <div className="text-xs uppercase tracking-wide text-gray-500">Sleeve Length</div>
                              <div className="font-medium">{sleeveLength}</div>
                            </div>
                            <div>
                              <div className="text-xs uppercase tracking-wide text-gray-500">Sleeve Styling</div>
                              <div className="font-medium">Regular Sleeves</div>
                            </div>
                            
                            <div>
                              <div className="text-xs uppercase tracking-wide text-gray-500">Hemline</div>
                              <div className="font-medium">Straight</div>
                            </div>
                            <div>
                              <div className="text-xs uppercase tracking-wide text-gray-500">Wash Care</div>
                              <div className="font-medium">Hand Wash</div>
                            </div>
                          </div>
                        </div>
                      </div>
            </div>
          </div>
          {/* Recommendations: You May Also Like */}
          {recommended && recommended.length > 0 && (
            <div className="px-8 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">You May Also Like</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommended.map(({ product: rec }) => {
                  const card = {
                    id: rec.id,
                    name: rec.name,
                    image: (rec as any).image_url || (rec as any).image || '/images/placeholder.png',
                    originalPrice: Number((rec as any).original_price ?? (rec as any).originalPrice ?? 0),
                    discountedPrice: Number((rec as any).discounted_price ?? (rec as any).discountedPrice ?? 0),
                    rating: typeof (rec as any).rating === 'number' ? (rec as any).rating : 0,
                  };
                  return (
                    <Link key={String(rec.id)} to={`/product/${rec.id}`} className="block">
                      <ProductCard product={card} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          {/* Additional notes */}
          <div className="px-8 pb-8">
            <div className="flex items-start gap-3 text-gray-600 bg-gray-50 p-4 rounded-md">
              <Info className="w-5 h-5 mt-0.5" />
              <p className="text-sm">Product images are for reference; slight variations in color may occur due to lighting and screen settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
