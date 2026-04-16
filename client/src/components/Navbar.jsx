import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiUser, FiLogOut, FiPackage } from 'react-icons/fi';
import useAuthStore from '../stores/authStore';
import useCartStore from '../stores/cartStore';
import api from '../utils/api';

// Import category icons from assets
import homeicon1 from '../assets/homeicon1.png';
import homeicon2 from '../assets/homeicon2.png';
import homeicon3 from '../assets/homeicon3.png';
import homeicon4 from '../assets/homeicon4.png';
import homeicon5 from '../assets/homeicon5.png';
import homeicon6 from '../assets/homeicon6.png';
import homeicon7 from '../assets/homeicon7.png';
import homeicon8 from '../assets/homeicon8.png';
import homeicon9 from '../assets/homeicon9.png';
import homeicon10 from '../assets/homeicon10.png';
import homeicon11 from '../assets/homeicon11.png';
import homeicon12 from '../assets/homeicon12.png';
import homeicon13 from '../assets/homeicon13.png';
import homeicon14 from '../assets/homeicon14.png';

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchParams] = useSearchParams();
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
    }
  };

  // Category mapping with icons
  const categories = [
    { name: 'For You', icon: homeicon1, category: 'All' },
    { name: 'Fashion', icon: homeicon2, category: 'Fashion' },
    { name: 'Mobiles', icon: homeicon3, category: 'Electronics' },
    { name: 'Beauty', icon: homeicon4, category: 'Beauty' },
    { name: 'Electronics', icon: homeicon5, category: 'Electronics' },
    { name: 'Home', icon: homeicon6, category: 'Home' },
    { name: 'Appliances', icon: homeicon7, category: 'Appliances' },
    { name: 'Toys', icon: homeicon8, category: 'Toys' },
    { name: 'Food & H...', icon: homeicon9, category: 'Groceries' },
    { name: 'Auto Acc...', icon: homeicon10, category: 'Auto Accessories' },
    { name: '2 Wheele...', icon: homeicon11, category: '2 Wheelers' },
    { name: 'Sports & ...', icon: homeicon12, category: 'Sports' },
    { name: 'Books & ...', icon: homeicon13, category: 'Books' },
    { name: 'Furniture', icon: homeicon14, category: 'Furniture' },
  ];

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      navigate('/');
    } else {
      navigate(`/?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow">
      {/* TOP SECTION - Logo, Location, Services, User Account */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-8">
            
            {/* LEFT: Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-sm">
                Flipcart
              </div>
            </Link>

            {/* CENTER-LEFT: Services (Minutes, Travel, Grocery) */}
            <div className="hidden lg:flex items-center gap-6 text-xs text-gray-700">
              <button className="flex items-center gap-1 hover:text-blue-600 transition">
                <span>🚚</span>
                <span>Minutes</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600 transition">
                <span>✈️</span>
                <span>Travel</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600 transition">
                <span>🛒</span>
                <span>Grocery</span>
              </button>
            </div>

            {/* CENTER-RIGHT: Location & SuperCoins */}
            <div className="hidden md:flex items-center gap-4 text-xs text-gray-600">
              <button className="flex items-center gap-1 hover:text-blue-600 transition">
                <span>📍</span>
                <span>134203</span>
                <span className="text-blue-600 font-medium">Select delivery location</span>
              </button>
              
              {isLoggedIn && (superCoins || 0) > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded border border-yellow-200">
                  <span className="font-bold text-yellow-700">₹{superCoins}</span>
                </div>
              )}
            </div>

            {/* RIGHT: User Menu, More, Cart */}
            <div className="flex items-center gap-4 shrink-0">
              
              {/* User Account Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm font-medium transition"
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
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="font-bold text-gray-800 text-sm">Your Account</h3>
                    </div>
                    {isLoggedIn ? (
                      <div className="p-2">
                        <button className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                          <FiUser className="inline mr-2" size={14} />
                          My Profile
                        </button>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700 block"
                        >
                          <FiPackage className="inline mr-2" size={14} />
                          My Orders
                        </Link>
                        {userOrders?.length > 0 && (
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <p className="px-3 text-xs font-semibold text-gray-500 mb-2">RECENT ORDERS</p>
                            {userOrders.slice(0, 2).map((order) => (
                              <button
                                key={order.id}
                                onClick={() => {
                                  setIsUserMenuOpen(false);
                                  navigate(`/order-confirmation/${order.id}`);
                                }}
                                className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-xs text-gray-600 truncate"
                              >
                                Order #{order.id?.substring(0, 8)}... - ₹{order.totalPrice}
                              </button>
                            ))}
                          </div>
                        )}
                        <button className="w-full text-left py-2 px-3 hover:bg-yellow-50 rounded text-sm text-yellow-600 font-semibold border-t mt-2">
                          💰 SuperCoins: ₹{superCoins || 0}
                        </button>
                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700 block"
                        >
                          ❤️ Wishlist
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-red-600 border-t mt-2 font-semibold"
                        >
                          <FiLogOut className="inline mr-2" size={14} />
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="p-2">
                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-blue-600 font-semibold block"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700 block"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* More Dropdown */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => {
                    setIsMoreMenuOpen(!isMoreMenuOpen);
                    setIsUserMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium flex items-center gap-1 transition"
                >
                  More <FiChevronDown size={14} />
                </button>
                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
                    <button className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                      🏪 Become a Seller
                    </button>
                    <button className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-gray-700">
                      📞 Customer Care
                    </button>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-blue-600 transition text-sm font-medium flex items-center gap-1"
              >
                🛒
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION - Search Bar */}
      <div className="bg-white py-3 px-6 border-b border-gray-200">
        <div className="max-w-full flex gap-3">
          <div className="flex gap-2 flex-1 max-w-4xl">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchSubmit}
              className="flex-1 px-4 py-2 border border-blue-400 rounded focus:outline-none text-sm"
            />
            <button 
              onClick={handleSearchSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <FiSearch size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - Category Icons */}
      <div className="bg-white px-6 py-2 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-8 min-w-max">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(item.category)}
              className="flex flex-col items-center gap-1 py-2 hover:text-blue-600 transition group"
              title={item.category}
            >
              <img 
                src={item.icon} 
                alt={item.name} 
                className="w-12 h-12 object-contain group-hover:scale-110 transition"
              />
              <span className="text-xs text-gray-700 group-hover:text-blue-600 font-medium whitespace-nowrap text-center">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
