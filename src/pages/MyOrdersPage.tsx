import { Link } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';

const MyOrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#ff6b81] hover:text-[#ff8fa3] mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-8">
            <Package className="w-8 h-8 text-[#ff6b81] mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          </div>

          <div className="text-center py-16">
            <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders. Start shopping now!</p>
            <Link to="/" className="inline-block bg-[#ff6b81] hover:bg-[#ff8fa3] text-white px-8 py-3 rounded-lg font-semibold transition-all">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
