import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiSearch,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiPackage,
  FiShoppingCart,
  FiHeart,
  FiGift,
  FiBell,
  FiCreditCard,
  FiMapPin,
  FiStar,
  FiShoppingBag,
  FiPhone,
  FiTrendingUp,
  FiTag,
} from "react-icons/fi";
import { FaMotorcycle, FaPlane, FaShoppingBag } from "react-icons/fa";
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

// Import logo
import flipkartLogoIcon from "../assets/home1.png";

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

  const userMenuItems = [
    { icon: FiUser, label: "My Profile", href: "/profile" },
    { icon: FiPackage, label: "Orders", href: "/orders" },
    { icon: FiTag, label: "Coupons", href: "/coupons" },
    { icon: FiStar, label: "Supercoin", href: "/supercoin" },
    { icon: FiTag, label: "Flipkart Plus Zone", href: "/plus" },
    { icon: FiCreditCard, label: "Saved Cards & Wallet", href: "/saved-cards" },
    { icon: FiMapPin, label: "Saved Addresses", href: "/saved-addresses" },
    { icon: FiHeart, label: "Wishlist", href: "/wishlist" },
    { icon: FiGift, label: "Gift Cards", href: "/gift-cards" },
    { icon: FiBell, label: "Notifications", href: "/notifications" },
  ];

  const moreMenuItems = [
    { icon: FiShoppingBag, label: "Become a Seller", href: "/seller" },
    {
      icon: FiBell,
      label: "Notification Settings",
      href: "/notification-settings",
    },
    { icon: FiPhone, label: "24x7 Customer Care", href: "/support" },
    { icon: FiTrendingUp, label: "Advertise on Flipkart", href: "/advertise" },
  ];

  const handleCategoryClick = (category) => {
    if (category === "All") {
      navigate("/");
    } else {
      navigate(`/?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      {/* FIRST ROW: Logo, Services, and Pincode */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Services together in one row */}
            <div className="flex items-center gap-4">
              {/* Logo - Rounded */}
              <Link to="/" className="shrink-0">
                <img
                  src={flipkartLogoIcon}
                  alt="Flipkart"
                  className="h-8 w-auto object-contain rounded-md"
                />
              </Link>

              {/* Services - Minutes, Travel, Grocery with Grey BG */}
              <div className="flex items-center gap-4">
                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors">
                    <FaMotorcycle className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-blue-600 font-medium">
                    Minutes
                  </span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors">
                    <FaPlane className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-blue-600 font-medium">
                    Travel
                  </span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors">
                    <FaShoppingBag className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-blue-600 font-medium">
                    Grocery
                  </span>
                </button>
              </div>
            </div>

            {/* Pincode with arrow - on the right side */}
            <div className="hidden md:flex items-center gap-1 text-gray-700 cursor-pointer shrink-0">
              <span className="font-medium text-sm">134203</span>
              <span className="text-blue-600 font-medium text-sm ml-1">
                Select delivery location
              </span>
              <span className="text-gray-400 text-sm ml-1">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECOND ROW: ENHANCED Search Bar and Right Side Icons */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="flex border-2 border-blue-500 rounded-lg bg-white hover:border-blue-600 transition-all duration-200 shadow-sm focus-within:shadow-md">
                <FiSearch className="absolute ml-4 text-blue-500 mt-3" size={18} />
                <input
                  type="text"
                  placeholder="Search for Products, Brands and More"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleSearchSubmit}
                  className="flex-1 px-12 py-3 outline-none text-sm placeholder-gray-400 rounded-lg bg-transparent"
                />
              </div>
            </div>

            {/* Right side icons - Login, More, Cart */}
            <div className="flex items-center gap-8 shrink-0">
              {/* User Account Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <FiUser size={20} />
                  <span className="text-sm font-medium">
                    {isLoggedIn ? user?.name?.split(" ")[0] : "Login"}
                  </span>
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="px-4 py-3 bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                      <h3 className="font-bold text-gray-800 text-sm">
                        Your Account
                      </h3>
                    </div>

                    {/* Menu Items */}
                    {isLoggedIn ? (
                      <div className="py-2">
                        {userMenuItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors duration-150 group/item"
                            >
                              <Icon
                                size={18}
                                className="text-gray-600 group-hover/item:text-blue-600 transition-colors"
                              />
                              <span className="group-hover/item:text-blue-600 transition-colors">
                                {item.label}
                              </span>
                            </Link>
                          );
                        })}

                        {/* Logout Divider */}
                        <div className="border-t border-gray-100 my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-sm transition-colors duration-150 group/item"
                        >
                          <FiLogOut
                            size={18}
                            className="text-red-600 group-hover/item:text-red-700"
                          />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    ) : (
                      <div className="py-2">
                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-blue-600 text-sm transition-colors duration-150 font-medium"
                        >
                          <FiUser size={18} />
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors duration-150"
                        >
                          <FiUser size={18} />
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* More Dropdown */}
              <div className="relative group hidden lg:block">
                <button
                  onClick={() => {
                    setIsMoreMenuOpen(!isMoreMenuOpen);
                    setIsUserMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span className="text-sm font-medium">More</span>
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isMoreMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* More Menu Dropdown */}
                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="px-4 py-3 bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                      <h3 className="font-bold text-gray-800 text-sm">More</h3>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {moreMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={index}
                            to={item.href}
                            onClick={() => setIsMoreMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors duration-150 group/item"
                          >
                            <Icon
                              size={18}
                              className="text-gray-600 group-hover/item:text-blue-600 transition-colors"
                            />
                            <span className="group-hover/item:text-blue-600 transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                <FiShoppingCart size={20} />
                <span className="text-sm font-medium hidden sm:inline">
                  Cart
                </span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold shadow-lg">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideInDown {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-in {
            animation: slideInDown 0.2s ease-out;
          }

          .fade-in {
            animation: fadeIn 0.2s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          /* Smooth hover effects */
          button:hover,
          a:hover {
            transition: all 0.2s ease-out;
          }

          /* Search bar focus effect */
          input:focus {
            border-color: #2563eb;
          }
        `}</style>
      </div>

      {/* THIRD ROW: Category Icons */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-9 min-w-max">
              {categories.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(item.category)}
                  className="flex flex-col items-center gap-1 group shrink-0"
                  title={item.category}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <span className="text-xs text-gray-700 group-hover:text-blue-600 font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
