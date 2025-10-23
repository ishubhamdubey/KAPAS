import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#ff6b81] hover:text-[#ff8fa3] mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
        <div className="w-24 h-1 bg-[#ff6b81] mb-6" />
        <p className="text-gray-700 leading-relaxed mb-4">
          We respect your privacy. We collect minimal data to provide our services (such as orders and customer support)
          and never sell your information. This page outlines what we collect, how we use it, and your choices.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Account and contact details for order updates and support</li>
          <li>Payment processing handled by trusted third parties</li>
          <li>Analytics to improve our product catalog and experience</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
