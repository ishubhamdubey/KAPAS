import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discount = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Rating pill bottom-left */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm shadow-md rounded-md px-2.5 py-1.5 flex items-center gap-1.5">
          <span className="text-xs font-semibold text-gray-800">{product.rating.toFixed(1)}</span>
          <Star className="w-3.5 h-3.5 text-teal-500 fill-teal-500" />
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-800 mb-3 line-clamp-1 hover:text-[#ff6b81] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3">
          <span className="text-2xl font-bold text-[#ff6b81]">₹{product.discountedPrice}</span>
          <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          {discount > 0 && (
            <span className="text-sm text-black font-semibold ml-2">({discount}% OFF)</span>
          )}
        </div>

        <button
          onClick={() => onAddToCart ? onAddToCart(product) : undefined}
          className="w-full bg-[#ff6b81] hover:bg-[#ff8fa3] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-colors text-base"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
