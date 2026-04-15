import { useState } from 'react';
import { mockProducts, banners } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getSectionProducts = (category, count = 4) => {
    return (mockProducts[category] || []).slice(0, count);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold text-primary">🛒 Flipcart</div>
              <div className="text-sm text-gray-600">
                📍 134203 <span className="text-blue-600 cursor-pointer">Select delivery location</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-primary">Login</button>
              <button className="text-gray-700 hover:text-primary">More</button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-primary">
                🛒 Cart
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Top Categories */}
          <div className="flex gap-6 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                !selectedCategory
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              For You
            </button>
            {['Fashion', 'Electronics', 'Home', 'Beauty', 'Sports'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Banner Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg mb-2">{banner.title}</h3>
              <p className="text-sm">{banner.description}</p>
              <div className="mt-4 text-right text-xs">AD</div>
            </div>
          ))}
        </div>

        {/* View Selected Category or Show Sections */}
        {selectedCategory ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">{selectedCategory}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mockProducts[selectedCategory]?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Section: Best Gadgets & Appliances */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Best Gadgets & Appliances</h2>
                <button className="text-gray-600 hover:text-primary">→</button>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {getSectionProducts('Electronics', 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>

            {/* Section: Home Decor & Furnishing */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Home Decor & Furnishing</h2>
                <button className="text-gray-600 hover:text-primary">→</button>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {getSectionProducts('Home', 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>

            {/* Section: Interesting Finds */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Interesting Finds</h2>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-lg p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {getSectionProducts('Fashion', 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>

            {/* Section: Top Picks of the Sale */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top Picks of the Sale</h2>
                <button className="text-gray-600 hover:text-primary">→</button>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {getSectionProducts('Sports', 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>

            {/* Section: Beauty & Personal Care */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Beauty & Personal Care</h2>
                <button className="text-gray-600 hover:text-primary">→</button>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {getSectionProducts('Beauty', 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>

            {/* Section: On Everybody's List */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">On Everybody's List</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Men shoes', discount: 'Min 50% Off', color: 'from-blue-100' },
                  { name: 'Printed Sarees & more', discount: 'Min 40% Off', color: 'from-purple-100' },
                  { name: 'V-Mart, Wrogn & more', discount: 'Under ₹299', color: 'from-green-100' },
                  { name: 'Watches', discount: 'Under ₹499', color: 'from-yellow-100' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-r ${item.color} to-white rounded-lg p-6 cursor-pointer hover:shadow-md transition`}
                  >
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.discount}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
