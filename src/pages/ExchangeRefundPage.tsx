import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExchangeRefundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#ff6b81] hover:text-[#ff8fa3] mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Exchange & Refund</h1>
        <div className="w-24 h-1 bg-[#ff6b81] mb-6" />
        <p className="text-gray-700 leading-relaxed mb-4">
          If you are not fully satisfied with your purchase, you can request an exchange or refund within 7 days
          of delivery, provided the item is unused with tags intact.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Eligible for exchange/refund within 7 days</li>
          <li>Items must be unworn and in original packaging</li>
          <li>Return shipping details will be provided upon request</li>
        </ul>
      </div>
    </div>
  );
};

export default ExchangeRefundPage;
