import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      // Delay to allow Home to mount before scrolling
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#6b0404] text-white">
      <div className="container mx-auto px-4 py-12">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div>
            <h3 className="text-3xl font-serif font-bold mb-4">KAPAS</h3>
            <p className="text-white/90 mb-4">
              Your destination for elegant and comfortable ethnic wear. We bring you the finest collection of kurtis and traditional clothing.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => goToSection('new-arrivals')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToSection('best-sellers')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToSection('categories')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => goToSection('videos')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Videos
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/90 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/90 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/exchange-refund" className="text-white/90 hover:text-white transition-colors">Exchange & Refund</Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/90 hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <a
                  href="mailto:support@kapas.in"
                  className="text-white/90 hover:text-white transition-colors"
                >
                  support@kapas.in
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/90">+91 8409948830</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/90">
                  123 Fashion Street, Mumbai, Maharashtra, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/90">
            All rights reserved © KAPAS 2025
          </p>
          <p className="text-white/80 text-sm mt-2">
            Made with love for women who love fashion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
