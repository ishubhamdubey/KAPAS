import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cartItems, cartCount, updateCartItem, removeFromCart, clearCart, isLoading } = useCart();

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.products) {
      return sum + item.products.discounted_price * item.quantity;
    }
    return sum;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#ff6b81] hover:bg-[#ff8fa3] text-white px-8 py-4 rounded-lg font-semibold transition-all"
          >
            Start Shopping
          </Link>
        </div>
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
          Continue Shopping
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <div className="w-24 h-1 bg-[#ff6b81]"></div>
          <p className="mt-4 text-gray-600 text-lg">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => {
                  if (!item.products) return null;

                  return (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-6">
                        <Link to={`/product/${item.product_id}`}>
                          <img
                            src={item.products.image_url}
                            alt={item.products.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </Link>

                        <div className="flex-1">
                          <Link to={`/product/${item.product_id}`}>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-[#ff6b81] transition-colors">
                              {item.products.name}
                            </h3>
                          </Link>

                          <div className="flex gap-4 mb-3 text-sm text-gray-600">
                            <span>Size: {item.selected_size}</span>
                            <span>Color: {item.selected_color}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateCartItem(item.id, item.quantity - 1)}
                                className="bg-gray-100 hover:bg-gray-200 p-2 rounded transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                className="bg-gray-100 hover:bg-gray-200 p-2 rounded transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center gap-6">
                              <span className="text-xl font-bold text-[#ff6b81]">
                                ₹{item.products.discounted_price * item.quantity}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {subtotal < 1000 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
                    Add ₹{1000 - subtotal} more to get FREE shipping!
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-[#ff6b81]">₹{total}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#ff6b81] hover:bg-[#ff8fa3] text-white py-4 rounded-lg font-semibold transition-all transform hover:scale-105 mb-4">
                Proceed to Checkout
              </button>

              <div className="text-center text-sm text-gray-600">
                <p>Secure checkout powered by Stripe</p>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">We Accept</h3>
                <p className="text-sm text-gray-600">
                  Credit Card, Debit Card, Net Banking, UPI, Wallets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
