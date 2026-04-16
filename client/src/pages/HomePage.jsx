import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiTrendingUp, FiShoppingBag, FiUsers, FiAward, FiGift, FiStar } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import useAuthStore from '../stores/authStore';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [recentSearchProducts, setRecentSearchProducts] = useState([]);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    // Read search and category from URL parameters
    const urlSearch = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || '';
    
    setSearchTerm(urlSearch);
    setSelectedCategory(urlCategory);
    
    // Save search to recent searches
    if (urlSearch && isLoggedIn) {
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const filteredSearches = recentSearches.filter(s => s !== urlSearch);
      const newSearches = [urlSearch, ...filteredSearches].slice(0, 5); // Keep last 5 searches
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    }
    
    fetchCategories();
  }, [searchParams, isLoggedIn]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  // Fetch products for recent searches
  useEffect(() => {
    if (isLoggedIn) {
      fetchRecentSearchProducts();
    }
  }, [isLoggedIn]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/products/categories');
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = '/products?limit=100';
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      if (searchTerm) {
        url += `&search=${searchTerm}`;
      }
      const { data } = await api.get(url);
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentSearchProducts = async () => {
    try {
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      if (recentSearches.length === 0) {
        setRecentSearchProducts([]);
        return;
      }

      // Fetch products for each recent search
      const allProducts = [];
      for (const search of recentSearches) {
        try {
          const { data } = await api.get(`/products?search=${search}&limit=3`);
          if (data.products && data.products.length > 0) {
            allProducts.push({
              searchTerm: search,
              products: data.products.slice(0, 1), // Show first product for each search
            });
          }
        } catch (err) {
          console.error(`Error fetching products for search "${search}":`, err);
        }
      }
      setRecentSearchProducts(allProducts);
    } catch (error) {
      console.error('Error fetching recent search products:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const categoryIcons = {
    'Electronics': '🎧',
    'Fashion': '👕',
    'Beauty': '💄',
    'Home': '🏠',
    'Books': '📚',
    'Sports': '⚽',
    'Toys': '🧸',
    'Groceries': '🛒',
  };

  // "For You" recommendation items
  const forYouItems = [
    { id: 1, title: 'Best Sellers', icon: FiTrendingUp, color: 'text-blue-500' },
    { id: 2, title: 'New Arrivals', icon: FiShoppingBag, color: 'text-green-500' },
    { id: 3, title: 'Top Rated', icon: FiStar, color: 'text-yellow-500' },
    { id: 4, title: 'Special Offers', icon: FiGift, color: 'text-red-500' },
    { id: 5, title: 'Trending Now', icon: FiTrendingUp, color: 'text-purple-500' },
    { id: 6, title: 'Exclusive Deals', icon: FiAward, color: 'text-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Recent Searches Section - Only show when logged in */}
        {isLoggedIn && recentSearchProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Harshit, still looking for these?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSearchProducts.map((item) => (
                <Link
                  key={item.searchTerm}
                  to={`/?search=${item.searchTerm}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative h-48 bg-gradient-to-br from-purple-200 to-blue-200 overflow-hidden">
                    {item.products[0]?.image ? (
                      <img
                        src={item.products[0].image}
                        alt={item.searchTerm}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400 text-4xl">📦</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-700 capitalize">
                      {item.searchTerm}
                    </h3>
                    {item.products[0]?.category && (
                      <p className="text-sm text-gray-500">{item.products[0].category}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory ? selectedCategory : 'Products'} 
              <span className="text-lg text-gray-500 ml-2">({products.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 text-xl">No products found</p>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSearchTerm('');
                }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

