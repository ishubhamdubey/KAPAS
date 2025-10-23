import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#ff6b81] hover:text-[#ff8fa3] mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">FAQ</h1>
        <div className="w-24 h-1 bg-[#ff6b81] mb-6" />
        <div className="space-y-4 text-gray-700">
          <div>
            <h2 className="font-semibold">How do I place an order?</h2>
            <p>Browse products, pick your size/color, and click Add to Cart. Checkout from the cart page.</p>
          </div>
          <div>
            <h2 className="font-semibold">Do you offer Cash on Delivery?</h2>
            <p>Depending on your region, COD may be available at checkout if enabled.</p>
          </div>
          <div>
            <h2 className="font-semibold">When will my order ship?</h2>
            <p>Most orders ship within 1–3 business days. You’ll receive an email with tracking details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
