import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FashionChatbot from './components/FashionChatbot';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyOrdersPage from './pages/MyOrdersPage';
import WishlistPage from './pages/WishlistPage';
import AddressesPage from './pages/AddressesPage';
import SettingsPage from './pages/SettingsPage';
import DebugPage from './pages/DebugPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ExchangeRefundPage from './pages/ExchangeRefundPage';
import FAQPage from './pages/FAQPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    // Use Vite's BASE_URL so the router works when the app is served from a sub-path
    // (GitHub Pages repo site uses /<repo>/). import.meta.env.BASE_URL is set from Vite's `base`.
    <Router basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-1">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile/orders" element={<MyOrdersPage />} />
              <Route path="/profile/wishlist" element={<WishlistPage />} />
              <Route path="/profile/addresses" element={<AddressesPage />} />
              <Route path="/profile/settings" element={<SettingsPage />} />
              <Route path="/debug" element={<DebugPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/exchange-refund" element={<ExchangeRefundPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </main>
          <Footer />
          <FashionChatbot />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
