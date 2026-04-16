import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiAward,
  FiGift,
  FiStar,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import api from "../utils/api";
import useAuthStore from "../stores/authStore";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [recentSearchProducts, setRecentSearchProducts] = useState([]);
  const { isLoggedIn, user } = useAuthStore(); // ✅ added user here

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "";

    setSearchTerm(urlSearch);
    setSelectedCategory(urlCategory);

    if (urlSearch && isLoggedIn) {
      const recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
      );
      const filteredSearches = recentSearches.filter((s) => s !== urlSearch);
      const newSearches = [urlSearch, ...filteredSearches].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
    }

    fetchCategories();
  }, [searchParams, isLoggedIn]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchRecentSearchProducts();
    }
  }, [isLoggedIn]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/products/categories");
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = "/products?limit=100";
      if (selectedCategory) url += `&category=${selectedCategory}`;
      if (searchTerm) url += `&search=${searchTerm}`;
      const { data } = await api.get(url);
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentSearchProducts = async () => {
    try {
      const recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
      );
      if (recentSearches.length === 0) {
        setRecentSearchProducts([]);
        return;
      }

      const allProducts = [];
      for (const search of recentSearches) {
        try {
          const { data } = await api.get(`/products?search=${search}&limit=3`);
          if (data.products && data.products.length > 0) {
            allProducts.push({
              searchTerm: search,
              products: data.products.slice(0, 1),
            });
          }
        } catch (err) {
          console.error(`Error fetching products for search "${search}":`, err);
        }
      }
      setRecentSearchProducts(allProducts);
    } catch (error) {
      console.error("Error fetching recent search products:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Carousel />
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* Recent Searches Section */}
        {isLoggedIn && recentSearchProducts.length > 0 && (
          <div
            className="mb-8 rounded-2xl p-6"
            style={{
              background:
                "linear-gradient(135deg, #e8eaf6 0%, #e3f2fd 50%, #ede7f6 100%)",
            }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {user?.name?.split(" ")[0]}, still looking for these?
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recentSearchProducts.map((item) => (
                <Link
                  key={item.searchTerm}
                  to={`/?search=${item.searchTerm}`}
                  className="bg-white rounded-xl overflow-hidden shrink-0 hover:shadow-md transition-shadow cursor-pointer"
                  style={{ width: "200px" }}
                >
                  <div className="h-44 overflow-hidden flex items-center justify-center bg-white">
                    {item.products[0]?.image ? (
                      <img
                        src={item.products[0].image}
                        alt={item.searchTerm}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="text-gray-400 text-4xl">📦</span>
                    )}
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-sm text-gray-600 capitalize">
                      {item.searchTerm}
                    </p>
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
              {selectedCategory ? selectedCategory : "Products"}
              <span className="text-lg text-gray-500 ml-2">
                ({products.length})
              </span>
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
                  setSelectedCategory("");
                  setSearchTerm("");
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