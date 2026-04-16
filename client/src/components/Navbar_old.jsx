import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi";
import useAuthStore from "../stores/authStore";
import useCartStore from "../stores/cartStore";
import api from "../utils/api";

// Import category icons from assets
import homeicon1 from "../assets/homeicon1.png";
import homeicon2 from "../assets/homeicon2.png";
import homeicon3 from "../assets/homeicon3.png";
import homeicon4 from "../assets/homeicon4.png";
import homeicon5 from "../assets/homeicon5.png";
import homeicon6 from "../assets/homeicon6.png";
import homeicon7 from "../assets/homeicon7.png";
import homeicon8 from "../assets/homeicon8.png";
import homeicon9 from "../assets/homeicon9.png";
import homeicon10 from "../assets/homeicon10.png";
import homeicon11 from "../assets/homeicon11.png";
import homeicon12 from "../assets/homeicon12.png";
import homeicon13 from "../assets/homeicon13.png";
import homeicon14 from "../assets/homeicon14.png";

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams] = useSearchParams();
  const { isLoggedIn, user, logout } = useAuthStore();
  const { items: cartItems, superCoins } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserMenuOpen && isLoggedIn) {
      fetchUserOrders();
    }
  }, [isUserMenuOpen, isLoggedIn]);

  const fetchUserOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setUserOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    const key = e.key || (e.type === "click" ? "Enter" : null);
    if ((key === "Enter" || e.type === "click") && searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    }
  };

  const categories = [
    { name: "For You", icon: homeicon1, category: "All" },
    { name: "Fashion", icon: homeicon2, category: "Fashion" },
    { name: "Mobiles", icon: homeicon3, category: "Electronics" },
    { name: "Beauty", icon: homeicon4, category: "Beauty" },
    { name: "Electronics", icon: homeicon5, category: "Electronics" },
    { name: "Home", icon: homeicon6, category: "Home" },
    { name: "Applian...", icon: homeicon7, category: "Appliances" },
    { name: "Toys, ba...", icon: homeicon8, category: "Toys" },
    { name: "Food & H...", icon: homeicon9, category: "Groceries" },
    { name: "Auto Acc...", icon: homeicon10, category: "Auto Accessories" },
    { name: "2 Wheele...", icon: homeicon11, category: "2 Wheelers" },
    { name: "Sports & ...", icon: homeicon12, category: "Sports" },
    { name: "Books & ...", icon: homeicon13, category: "Books" },
    { name: "Furniture", icon: homeicon14, category: "Furniture" },
  ];

  const handleCategoryClick = (category) => {
    if (category === "All") {
      navigate("/");
    } else {
      navigate(`/?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      {/* TOP SECTION - Logo, Services, Location, User Account */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-8">
            {/* LEFT: Logo - Blue Flipkart Badge */}
            <Link to="/" className="flex items-center shrink-0 hover:opacity-90 transition">
              <div className="bg-blue-600 text-white px-3 py-2 rounded font-bold text-sm">
                Flipkart
              </div>
            </Link>

            {/* CENTER-LEFT: Services */}
            <div className="hidden lg:flex items-center gap-8">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition text-xs">
                <span className="text-base">🛵</span>
                <span className="font-medium">Minutes</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition text-xs">
                <span className="text-base">✈️</span>
                <span className="font-medium">Travel</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition text-xs">
                <span className="text-base">🛒</span>
                <span className="font-medium">Grocery</span>
              </button>
            </div>

            {/* CENTER-RIGHT: Location with Arrow */}
            <div className="hidden sm:flex items-center gap-1 text-gray-700 hover:text-gray-900 transition cursor-pointer flex-1 justify-center">
              <span className="text-base">📍</span>
              <span className="font-medium text-xs">134203</span>
              <span className="text-blue-600 font-medium text-xs">Select delivery location</span>
              <span className="text-gray-400 text-xs ml-1">›</span>
            </div>

            {/* RIGHT: User Menu, More, Cart */}
            <div className="flex items-center gap-6 shrink-0">
              {/* User Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 text-sm font-medium transition"
                >
                  <FiUser size={18} />
                  {isLoggedIn ? (
                    <>
                      {user?.name?.split(" ")[0]}
                      <FiChevronDown size={16} />
                    </>
                  ) : (
                    <>
                      Login <FiChevronDown size={16} />
                    </>
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                    <div className="p-3 border-b border-gray-200 bg-gray-50">
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
                  className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1 transition"
                >
                  More <FiChevronDown size={16} />
                </button>
                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
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
                className="relative text-gray-700 hover:text-gray-900 transition flex items-center gap-2"
              >
                <FiShoppingCart size={20} />
                <span className="text-sm font-medium hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR SECTION */}
      <div className="bg-blue-50 py-3 px-6 border-b border-gray-100">
        <div className="mx-auto flex gap-3 justify-center">
          <div className="flex gap-2 flex-1 max-w-2xl">
            <div className="flex gap-2 flex-1 border border-gray-300 rounded bg-white">
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleSearchSubmit}
                className="flex-1 px-4 py-3 outline-none text-sm placeholder-gray-400"
              />
              <button
                onClick={handleSearchSubmit}
                className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY ICONS SECTION */}
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex gap-8 min-w-max justify-start">
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(item.category)}
                className="flex flex-col items-center gap-2 py-1 hover:text-blue-600 transition group flex-shrink-0"
                title={item.category}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
                />
                <span className="text-xs text-gray-700 group-hover:text-blue-600 font-medium whitespace-nowrap text-center">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
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
                      {user?.name?.split(" ")[0]}
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
                      <h3 className="font-bold text-gray-800 text-sm">
                        Your Account
                      </h3>
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
                            <p className="px-3 text-xs font-semibold text-gray-500 mb-2">
                              RECENT ORDERS
                            </p>
                            {userOrders.slice(0, 2).map((order) => (
                              <button
                                key={order.id}
                                onClick={() => {
                                  setIsUserMenuOpen(false);
                                  navigate(`/order-confirmation/${order.id}`);
                                }}
                                className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-xs text-gray-600 truncate"
                              >
                                Order #{order.id?.substring(0, 8)}... - ₹
                                {order.totalPrice}
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
      <div className="bg-white py-2 px-6 border-b border-gray-200">
        <div className="max-w-full flex gap-3">
          <div className="flex gap-2 flex-1 max-w-4xl">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleSearchSubmit}
              className="flex-1 px-4 py-3 border border-blue-400 rounded focus:outline-none focus:border-blue-600 text-sm"
            />
            <button
              onClick={handleSearchSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <FiSearch size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - Category Icons with Horizontal Scroll */}
      <div className="bg-white px-6 py-3 border-b border-gray-200">
        <div className="flex gap-6 min-w-max overflow-x-auto scrollbar-hide">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(item.category)}
              className="flex flex-col items-center gap-2 py-1 hover:text-blue-600 transition group flex-shrink-0"
              title={item.category}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-14 h-14 object-contain group-hover:scale-120 transition transform duration-200"
              />
              <span className="text-xs text-gray-700 group-hover:text-blue-600 font-medium whitespace-nowrap text-center leading-tight">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
