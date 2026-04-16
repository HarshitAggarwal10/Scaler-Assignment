import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiTrendingUp, FiShoppingBag, FiUsers, FiAward, FiGift, FiStar } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Read search and category from URL parameters
    const urlSearch = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || '';
    
    setSearchTerm(urlSearch);
    setSelectedCategory(urlCategory);
    fetchCategories();
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

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

