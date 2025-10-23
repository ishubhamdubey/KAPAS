import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, ChevronDown, Package, Heart, MapPin, Settings, LogOut, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = localStorage.getItem('user_email');
    setIsLoggedIn(!!checkAuth);
  }, [location]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_email');
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#ab031c] to-[#cf2040] text-white py-2 px-4 text-center text-sm md:text-base font-medium overflow-hidden">
        <div className="animate-pulse">
          🔥 Flat 30% OFF on all kurtis this festive season! Limited Time Offer 🔥
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white'
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-3xl md:text-4xl font-serif font-bold text-[#d2042d] tracking-wide hover:opacity-80 transition-opacity">
              KAPAS
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('categories')}
                className="text-gray-700 hover:text-[#ff6b81] transition-colors font-medium"
              >
                Categories
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-[#ff6b81] transition-colors font-medium"
              >
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <form onSubmit={handleSearch} className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search kurtis..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff6b81] focus:border-transparent"
                  />
                </div>
              </form>
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ff6b81] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <User className="w-6 h-6 text-gray-700" />
                  <ChevronDown className="w-4 h-4 text-gray-700 hidden md:block" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm text-gray-600">Welcome back!</p>
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {localStorage.getItem('user_email')}
                          </p>
                        </div>
                        <Link
                          to="/profile/orders"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <Package className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">My Orders</span>
                        </Link>
                        <Link
                          to="/profile/wishlist"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Wishlist</span>
                        </Link>
                        <Link
                          to="/profile/addresses"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <MapPin className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Addresses</span>
                        </Link>
                        <Link
                          to="/profile/settings"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Account Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-200 mt-2"
                        >
                          <LogOut className="w-5 h-5 text-red-600" />
                          <span className="text-red-600">Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm text-gray-600">Welcome to KAPAS</p>
                        </div>
                        <Link
                          to="/login"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-700 font-medium">Login</span>
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-700 font-medium">Sign Up</span>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('categories')}
                  className="text-gray-700 hover:text-[#ff6b81] transition-colors font-medium text-left"
                >
                  Categories
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-[#ff6b81] transition-colors font-medium text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
