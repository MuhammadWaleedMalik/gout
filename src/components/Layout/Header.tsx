import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe, LogOut, Search, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { websiteInfo } from '../../data/website/info';

// Import language files statically
import enHeader from './en/header.json';
import zhHeader from './zh/header.json';
import jaHeader from './ja/header.json';
import esHeader from './es/header.json';

// Create a language map
const languageMap = {
  en: enHeader,
  zh: zhHeader,
  ja: jaHeader,
  es: esHeader,
};

interface HeaderContent {
  logoAlt: string;
  nav: {
    home: string;
    findings: string;
    beadStrings: string;
    pearlStrings: string;
    jewellery: string;
    beads: string;
    rocks: string;
    other: string;
    birthstones: string;
    myAccount: string;
    cart: string;
    login: string;
    signup: string;
    logout: string;
  };
  searchPlaceholder: string;
  languageSelector: {
    heading: string;
    changeLanguageLabel: string;
  };
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [pageContent, setPageContent] = useState<HeaderContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useAuth();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  // Mock cart count - in real app, get from context/API
  useEffect(() => {
    // Simulate cart items count
    const count = Math.floor(Math.random() * 5);
    setCartCount(count);
  }, []);

  // Set favicon dynamically
  useEffect(() => {
    const setFavicon = () => {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = websiteInfo?.favicon ?? '/favicon.ico';
    };

    setFavicon();
  }, []);

  // Load language content
  useEffect(() => {
    const loadContent = () => {
      setIsLoading(true);
      try {
        const content = languageMap[currentLanguage?.code as keyof typeof languageMap] ?? languageMap.en;
        setPageContent(content);
      } catch (err) {
        console.error(`Failed to load ${currentLanguage?.code} content:`, err);
        setPageContent(languageMap.en);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setTimeout(() => setIsLanguageOpen(false), 200);
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="h-16 flex items-center justify-center bg-blue-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="h-16 flex items-center justify-center bg-blue-500">
        <p className="text-sm font-semibold text-white">
          Content not available
        </p>
      </div>
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      {/* Top Bar - Language Selector */}
      <div className='bg-[#53A4F3] w-full h-12 flex justify-end items-center px-4'>
        <div className="relative">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center space-x-2 p-2 bg-[#E63271] rounded-full hover:bg-[#b62155] transition-colors text-white"
            aria-label={pageContent.languageSelector.changeLanguageLabel}
          >
            <Globe size={20} />
            <span className="text-sm font-medium hidden sm:inline">
              {currentLanguage?.flag ?? '🌐'} {currentLanguage?.name}
            </span>
            <span className="text-sm font-medium sm:hidden">
              {currentLanguage?.flag ?? '🌐'}
            </span>
          </button>
          {isLanguageOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border py-2 w-48 z-50"
            >
              <div className="px-4 py-2 text-sm font-semibold border-b text-black">
                {pageContent.languageSelector.heading}
              </div>
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center space-x-3 transition-colors ${currentLanguage?.code === lang.code ? 'bg-blue-50' : ''
                    }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-black">
                      {lang.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {lang.nativeName}
                    </span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo and Website Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={websiteInfo?.logo ?? '/logo.png'}
                alt={pageContent.logoAlt.replace('{websiteName}', websiteInfo?.name ?? 'Silver Hills Gems Rock Shop')}
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold tracking-tight text-black">
                {websiteInfo?.name ?? 'Silver Hills Gems Rock Shop'}
              </span>
            </Link>
          </div>

          {/* Center - Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-4 text-black text-sm font-medium">
            <Link to="/home" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.home}</Link>
            <span className="text-gray-300">◽</span>
            <Link to="/findings" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.findings}</Link>
            <span className="text-gray-300">◽</span>
            <Link to="/bead-strings" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.beadStrings}</Link>
            <span className="text-gray-300">◽</span>
            <Link to="/pearl-strings" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.pearlStrings}</Link>
            <span className="text-gray-300">◽</span>
            <Link to="/jewellery" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.jewellery}</Link>
            <span className="text-gray-300">◽</span>
            <Link to="/beads" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.beads}</Link>
            <span className="text-gray-300">◽</span>
            <Link to="/rocks" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.rocks}</Link>
            <span className="text-gray-300">◽</span>
            <Link to="/other" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.other}</Link>
            <span className="text-gray-300">◽</span>
            <Link to="/birthstones" className="hover:text-[#E63271] transition-colors px-2 py-1">{pageContent.nav.birthstones}</Link>
          </nav>

          {/* Right Side - User Actions & Cart (Desktop) */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-black hover:text-[#E63271] transition-colors relative p-2"
              title={pageContent.nav.cart}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">{pageContent.nav.cart}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E63271] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Actions */}
            {user?.isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to={user?.role === 'admin' ? "/admin" : "/my-account"}
                  className="flex items-center space-x-2 text-black hover:text-[#E63271] transition-colors"
                  title={pageContent.nav.myAccount}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-black hover:text-[#E63271] transition-colors"
                  title={pageContent.nav.logout}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium hidden lg:inline">{pageContent.nav.logout}</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-black text-black hover:bg-[#E63271] hover:text-white hover:border-[#E63271] transition-colors text-sm font-medium"
                >
                  {pageContent.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-[#E63271] text-white hover:bg-[#aa1247] transition-colors text-sm font-medium"
                >
                  {pageContent.nav.signup}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 text-black"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-3 space-y-1">
            {/* Mobile Navigation Links */}
            <Link
              to="/home"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.home}</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/findings"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.findings}</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/bead-strings"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.beadStrings}</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/pearl-strings"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.pearlStrings}</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/jewellery"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.jewellery}</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/beads"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.beads}</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/rocks"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.rocks}</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/other"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.other}</span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              to="/birthstones"
              className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex-1">{pageContent.nav.birthstones}</span>
              <span className="text-gray-400">→</span>
            </Link>
          </div>

          {/* Mobile User Actions */}
          <div className="px-4 py-3 border-t border-gray-200">
            <Link
              to="/cart"
              className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg mb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5" />
                <span>{pageContent.nav.cart}</span>
              </div>
              {cartCount > 0 && (
                <span className="bg-[#E63271] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {user?.isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'admin' ? "/admin" : "/my-account"}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>{pageContent.nav.myAccount}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{pageContent.nav.logout}</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  className="px-4 py-3 rounded-lg border border-gray-300 text-gray-900 text-center hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {pageContent.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 rounded-lg bg-[#E63271] text-white text-center hover:bg-[#aa1247]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {pageContent.nav.signup}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Language Selector */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">
              {pageContent.languageSelector.heading}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-colors ${currentLanguage?.code === lang.code
                      ? 'bg-blue-50 border-blue-200'
                      : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  <span className="text-lg mb-1">{lang.flag}</span>
                  <span className="text-xs font-medium text-gray-700">
                    {lang.code.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;