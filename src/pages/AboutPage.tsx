import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#ff6b81] hover:text-[#ff8fa3] mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About KAPAS</h1>
        <div className="w-24 h-1 bg-[#ff6b81] mb-6" />
        <p className="text-gray-700 leading-relaxed">
          KAPAS is dedicated to curating elegant, comfortable ethnic wear that blends tradition with modern style.
          We focus on carefully crafted designs across kurtis and dresses, bringing you quality fabrics and timeless silhouettes.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
