import { useState } from 'react';
import { mockProducts, banners } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getSectionProducts = (category, count = 4) => {
    return (mockProducts[category] || []).slice(0, count);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        {/* Top Bar */}
        <div className="max-w-full px-4 py-2 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-xl font-bold text-yellow-500">🛒 Flipcart</div>
              <div className="text-xs text-gray-600">
                📍 134203 <span className="text-blue-600 cursor-pointer hover:underline">Select delivery location</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1 text-gray-700 hover:text-primary text-sm"
                >
                  👤 Harshit ▼
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-50">
                    <div className="py-2 px-3 border-b border-gray-200">
                      <h3 className="font-bold text-gray-800">Your Account</h3>
                    </div>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">👤 My Profile</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">📦 Orders</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">🎫 Coupons</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">💰 Supercoin</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">⭐ Flipkart Plus Zone</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">💳 Saved Cards & Wallet</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">📍 Saved Addresses</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">❤️ Wishlist</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">🎁 Gift Cards</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">🔔 Notifications</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm text-red-600 border-t border-gray-200 mt-2">🚪 Logout</button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="text-gray-700 hover:text-primary text-sm"
                >
                  More ▼
                </button>
                {showMoreMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-50">
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">🏪 Become a Seller</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">🔔 Notification Settings</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">☎️ 24x7 Customer Care</button>
                    <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-sm">📢 Advertise on Flipkart</button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-700 hover:text-primary cursor-pointer text-sm">
                🛒 <span>Cart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-full px-4 py-2 bg-white">
          <div className="max-w-7xl mx-auto">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="max-w-full px-4 py-2 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto pb-1">
            {['For You', 'Fashion', 'Mobiles', 'Beauty', 'Electronics', 'Home', 'Appliances', 'Toys, ba...', 'Food & H...', 'Auto Acc...', '2 Wheele...', 'Sports & ...', 'Books & ...', 'Furniture'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-primary whitespace-nowrap text-xs py-2"
              >
                <span className="text-2xl">{categoryIcons[cat] || '📦'}</span>
                <span className="text-xs">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Banner Carousel */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition group"
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="font-bold text-lg">{banner.title}</h3>
                    <p className="text-sm mt-2">{banner.description}</p>
                  </div>
                  <div className="text-right text-xs bg-gray-900 px-2 py-1 rounded w-fit ml-auto">AD</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still looking for these? */}
        <div className="mb-8 bg-blue-100 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Still looking for these?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {getSectionProducts('Electronics', 4).map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-3 text-center hover:shadow-md transition">
                <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-lg" />
                </div>
                <p className="text-xs font-semibold text-gray-800">{product.name}</p>
              </div>
            ))}
          </div>
        </div>

        {!selectedCategory ? (
          <>
            {/* Suggested For You Section 1 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Suggested For You</h2>
                <button className="text-gray-600 hover:text-primary font-bold">→</button>
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                  {mockProducts['Fashion']?.slice(0, 6).map((product) => (
                    <div key={product.id} className="w-48 bg-white rounded-lg shadow hover:shadow-lg transition">
                      <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                          ⭐ {product.rating}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-semibold text-gray-800 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-1">₹{product.price}</p>
                        <p className="text-xs text-blue-600 font-bold mt-2">Buy at ₹{Math.floor(product.price * 0.8)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested For You Section 2 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Suggested For You</h2>
                <button className="text-gray-600 hover:text-primary font-bold">→</button>
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                  {mockProducts['Beauty']?.slice(0, 6).map((product) => (
                    <div key={product.id} className="w-48 bg-white rounded-lg shadow hover:shadow-lg transition">
                      <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                          ⭐ {product.rating}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-semibold text-gray-800 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-1">₹{product.price}</p>
                        <p className="text-xs text-blue-600 font-bold mt-2">Buy at ₹{Math.floor(product.price * 0.8)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Shortcuts */}
            <div className="mb-8 bg-white rounded-lg p-6">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-2xl">🛒</div>
                  <p className="text-xs text-center font-semibold">Grocery</p>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">👦</div>
                  <p className="text-xs text-center font-semibold">For GenZ</p>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">🛒</div>
                  <p className="text-xs text-center font-semibold">Flipkart ...</p>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-2xl">🎬</div>
                  <p className="text-xs text-center font-semibold">Originals</p>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
                  <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">🎁</div>
                  <p className="text-xs text-center font-semibold">Gift Cards</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">{selectedCategory}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mockProducts[selectedCategory]?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            <div>
              <h3 className="font-bold text-white mb-3">ABOUT</h3>
              <ul className="text-sm space-y-2">
                <li className="cursor-pointer hover:text-white">Contact Us</li>
                <li className="cursor-pointer hover:text-white">About Us</li>
                <li className="cursor-pointer hover:text-white">Careers</li>
                <li className="cursor-pointer hover:text-white">Flipkart Stories</li>
                <li className="cursor-pointer hover:text-white">Press</li>
                <li className="cursor-pointer hover:text-white">Corporate Information</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">GROUP COMPANIES</h3>
              <ul className="text-sm space-y-2">
                <li className="cursor-pointer hover:text-white">Myntra</li>
                <li className="cursor-pointer hover:text-white">Cleartrip</li>
                <li className="cursor-pointer hover:text-white">Shopsy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">HELP</h3>
              <ul className="text-sm space-y-2">
                <li className="cursor-pointer hover:text-white">Payments</li>
                <li className="cursor-pointer hover:text-white">Shipping</li>
                <li className="cursor-pointer hover:text-white">Cancellation & Returns</li>
                <li className="cursor-pointer hover:text-white">FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">CONSUMER POLICY</h3>
              <ul className="text-sm space-y-2">
                <li className="cursor-pointer hover:text-white">Cancellation & Returns</li>
                <li className="cursor-pointer hover:text-white">Terms Of Use</li>
                <li className="cursor-pointer hover:text-white">Security</li>
                <li className="cursor-pointer hover:text-white">Privacy</li>
                <li className="cursor-pointer hover:text-white">Sitemap</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">Mail Us:</h3>
              <p className="text-sm">Flipkart Internet Private Limited</p>
              <p className="text-sm mt-4">Registered Office Address:</p>
              <p className="text-sm">Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village, Outer Ring Road, Bangalore, 560103</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-4 text-sm">
                <button className="hover:text-white">🏪 Become a Seller</button>
                <button className="hover:text-white">📢 Advertise</button>
                <button className="hover:text-white">🎁 Gift Cards</button>
                <button className="hover:text-white">❓ Help Center</button>
              </div>
              <div className="text-sm">© 2007-2026 Flipkart.com</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

