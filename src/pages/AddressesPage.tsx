import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Plus } from 'lucide-react';

const AddressesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#ff6b81] hover:text-[#ff8fa3] mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-[#ff6b81] mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">My Addresses</h1>
            </div>
            <button className="flex items-center space-x-2 bg-[#ff6b81] hover:bg-[#ff8fa3] text-white px-4 py-2 rounded-lg font-semibold transition-all">
              <Plus className="w-5 h-5" />
              <span>Add New</span>
            </button>
          </div>

          <div className="text-center py-16">
            <MapPin className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Saved Addresses</h2>
            <p className="text-gray-600 mb-6">Add a delivery address for faster checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressesPage;
