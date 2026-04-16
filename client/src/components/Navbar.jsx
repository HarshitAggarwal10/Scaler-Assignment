import { useState, useEffect } from 'react';
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
import api from '../utils/api';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { isLoggedIn, user, logout } = useAuthStore();
  const { items: cartItems, superCoins } = useCartStore();
  const navigate = useNavigate();

  // Fetch user orders when dropdown opens
  useEffect(() => {
    if (isUserMenuOpen && isLoggedIn) {
      fetchUserOrders();
    }
  }, [isUserMenuOpen, isLoggedIn]);

  const fetchUserOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setUserOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    const key = e.key || (e.type === 'click' ? 'Enter' : null);
    if ((key === 'Enter' || e.type === 'click') && searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
      setSearchInput('');
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
      {/* Top Bar - Logo & Location */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
              <FiShoppingCart className="text-yellow-500 text-2xl" />
              <span className="text-yellow-500">Flipcart</span>
            </Link>

            {/* Location & Supercoins Info - Centered area */}
            <div className="hidden md:flex items-center gap-6 text-xs text-gray-600 flex-1 justify-center">
              <div className="flex items-center gap-1">
                <span>📍 134203</span>
                <button className="text-blue-600 hover:underline cursor-pointer text-xs">
                  Select delivery location
                </button>
              </div>

              {isLoggedIn && (superCoins || 0) > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-linear-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <span className="text-xs font-bold text-yellow-700">₹{superCoins}</span>
                </div>
              )}
            </div>

            {/* Right section - User menu and more */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              {/* User Account Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm font-medium whitespace-nowrap"
                >
                  <FiUser size={16} />
                  {isLoggedIn ? (
                    <>
                      {user?.name?.split(' ')[0]}
                      <FiChevronDown size={14} />
                    </>
                  ) : (
                    <>
                      Login <FiChevronDown size={14} />
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
                          My Orders
                        </Link>
                        {userOrders && userOrders.length > 0 && (
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">Recent Orders</p>
                            {userOrders.slice(0, 2).map((order) => (
                              <button
                                key={order.id}
                                onClick={() => {
                                  setIsUserMenuOpen(false);
                                  navigate(`/order-confirmation/${order.id}`);
                                }}
                                className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-xs text-gray-600 truncate"
                                title={`Order #${order.id} - ₹${order.totalPrice}`}
                              >
                                Order #{order.id?.substring(0, 8)}... - ₹{order.totalPrice}
                              </button>
                            ))}
                          </div>
                        )}
                        <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          🎫 Coupons
                        </button>
                        <button className="block w-full text-left py-2 px-3 hover:bg-yellow-50 rounded text-sm text-yellow-600 font-semibold border-y border-yellow-200">
                          💰 SuperCoins: ₹{superCoins || 0}
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
                  className="text-gray-700 hover:text-blue-600 text-xs font-medium flex items-center gap-1 whitespace-nowrap"
                >
                  More <FiChevronDown size={14} />
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
                className="relative text-gray-700 hover:text-blue-600 transition hidden md:flex items-center gap-1 text-xs font-medium whitespace-nowrap"
              >
                <FiShoppingCart size={18} />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
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

        {/* Search Bar with Right-Side Controls */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 items-center">
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchSubmit}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
            />
            <button 
              onClick={handleSearchSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shrink-0"
            >
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
                <div className="flex items-center gap-2 py-2 px-2 bg-yellow-50 rounded border border-yellow-200">
                  <span className="text-sm font-semibold text-yellow-600">💰 SuperCoins: ₹{superCoins || 0}</span>
                </div>
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
