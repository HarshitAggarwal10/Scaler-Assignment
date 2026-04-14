import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import useCartStore from '../stores/cartStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-2xl">
            <span>🛒</span>
            <span>Flipcart</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search for products, brands, and more"
              className="w-full px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  navigate(`/?search=${e.target.value}`);
                }
              }}
            />
            <button className="bg-yellow-400 px-6 py-2 rounded-r-lg font-bold text-gray-800">
              Search
            </button>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <div className="hidden md:block text-center">
                  <p className="text-sm font-semibold">Hello, {user?.name?.split(' ')[0]}!</p>
                </div>

                <Link
                  to="/orders"
                  className="hover:text-yellow-300 transition text-sm md:text-base"
                >
                  Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-300 transition text-sm md:text-base"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-yellow-300 transition text-sm md:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hover:text-yellow-300 transition text-sm md:text-base"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link
              to="/wishlist"
              className="hover:text-yellow-300 transition text-sm md:text-base"
            >
              ❤️ Wishlist
            </Link>

            <Link to="/cart" className="relative hover:text-yellow-300 transition">
              <span className="text-xl">🛒</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-primary-dark pb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 mb-3 rounded text-gray-800 focus:outline-none"
            />
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-yellow-300 px-4 py-2">
                Home
              </Link>
              {isLoggedIn && (
                <>
                  <Link to="/orders" className="hover:text-yellow-300 px-4 py-2">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-yellow-300 px-4 py-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
