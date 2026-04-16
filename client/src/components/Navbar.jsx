import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart,
  FiHeart,
  FiMenu,
  FiSearch,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiPackage,
  FiYoutube,
} from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import useAuthStore from '../stores/authStore';
import useCartStore from '../stores/cartStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSearchSubmit = (e, searchTerm) => {
    if (e.key === 'Enter' && searchTerm) {
      navigate(`/?search=${searchTerm}`);
      setIsMobileMenuOpen(false);
    }
  };

  const categoryIcons = {
    'For You': '🏠',
    'Fashion': '👕',
    'Mobiles': '📱',
    'Beauty': '💄',
    'Electronics': '🎧',
    'Home': '🏠',
    'Appliances': '🍳',
    'Toys': '🧸',
    'Food & H...': '🍔',
    'Auto Acc...': '🚗',
    '2 Wheele...': '🏍️',
    'Sports & ...': '⚽',
    'Books & ...': '📚',
    'Furniture': '🛋️',
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <FiShoppingCart className="text-yellow-500 text-2xl" />
              <span className="text-yellow-500">Flipcart</span>
            </Link>

            {/* Left section - Location */}
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-600">
              <span>📍 134203</span>
              <button className="text-blue-600 hover:underline cursor-pointer">
                Select delivery location
              </button>
            </div>

            {/* Right section - User menu and more */}
            <div className="flex items-center gap-4">
              {/* User Account Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm font-medium"
                >
                  <FiUser size={16} />
                  {isLoggedIn ? (
                    <>
                      {user?.name?.split(' ')[0]}
                      <FiChevronDown size={16} />
                    </>
                  ) : (
                    <>
                      Login <FiChevronDown size={16} />
                    </>
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl p-3 z-50 border border-gray-100">
                    <div className="py-2 px-3 border-b border-gray-200">
                      <h3 className="font-bold text-gray-800 text-sm">Your Account</h3>
                    </div>
                    {isLoggedIn ? (
                      <>
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          <FiUser className="inline mr-2" size={16} />
                          My Profile
                        </button>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700"
                        >
                          <FiPackage className="inline mr-2" size={16} />
                          Orders
                        </Link>
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          🎫 Coupons
                        </button>
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          💰 Supercoin
                        </button>
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          ⭐ Flipcart Plus Zone
                        </button>
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          💳 Saved Cards & Wallet
                        </button>
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          📍 Saved Addresses
                        </button>
                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700"
                        >
                          <FiHeart className="inline mr-2" size={16} />
                          Wishlist
                        </Link>
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          🎁 Gift Cards
                        </button>
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          🔔 Notifications
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-red-600 border-t border-gray-200 mt-2 font-semibold"
                        >
                          <FiLogOut className="inline mr-2" size={16} />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-blue-600 font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700"
                        >
                          New Customer? Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* More Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setIsMoreMenuOpen(!isMoreMenuOpen);
                    setIsUserMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
                >
                  More <FiChevronDown size={16} />
                </button>
                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl p-3 z-50 border border-gray-100">
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                      🏪 Become a Seller
                    </button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                      🔔 Notification Settings
                    </button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                      📞 24x7 Customer Care
                    </button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                      📢 Advertise on Flipcart
                    </button>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-blue-600 transition hidden md:flex items-center gap-1 text-sm font-medium"
              >
                <FiShoppingCart size={18} />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-xl text-gray-700"
              >
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  navigate(`/?search=${e.target.value}`);
                }
              }}
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FiSearch size={20} />
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-2 border-t border-gray-100 hidden md:block">
          <div className="flex gap-8 overflow-x-auto pb-1">
            {['For You', 'Fashion', 'Mobiles', 'Beauty', 'Electronics', 'Home', 'Appliances', 'Toys', 'Food & H...', 'Auto Acc...', '2 Wheele...', 'Sports & ...', 'Books & ...', 'Furniture'].map((cat) => (
              <button
                key={cat}
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 whitespace-nowrap text-xs py-2 transition"
              >
                <span className="text-2xl">{categoryIcons[cat] || '📦'}</span>
                <span className="text-xs">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 pb-4">
          <div className="px-4 py-3 space-y-3">
            {isLoggedIn && (
              <div className="text-sm font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Hello, {user?.name?.split(' ')[0]}!
              </div>
            )}

            {isLoggedIn ? (
              <>
                <Link
                  to="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-gray-700 hover:text-blue-600 py-2"
                >
                  <FiPackage className="inline mr-2" size={16} />
                  Orders
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-gray-700 hover:text-blue-600 py-2"
                >
                  <FiHeart className="inline mr-2" size={16} />
                  Wishlist
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-sm text-red-600 hover:text-red-700 py-2 font-semibold border-t border-gray-200 pt-3"
                >
                  <FiLogOut className="inline mr-2" size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-blue-600 font-semibold py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm text-gray-700 hover:text-blue-600 py-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
