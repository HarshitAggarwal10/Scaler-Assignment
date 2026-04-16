import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiAward,
  FiGift,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import api from "../utils/api";
import useAuthStore from "../stores/authStore";
import Carousel2 from "../components/Carousel2";

// Add these shoe data and component inside HomePage.jsx

const mensShoesData = [
  {
    id: 1,
    label: "Red Tape",
    sublabel: "Best Selling Products",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    label: "Best Discounts",
    sublabel: "Min. 70% Off",
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    label: "Best Brands",
    sublabel: "Top Collection",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    label: "Top Rated",
    sublabel: "4 Stars and Above",
    image:
      "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-running-shoes-or-sneakers-on-a-transparent-background-png-image_14112954.png",
  },
];

const electronicsProducts = [
  {
    id: 1,
    title: 'Samsung 55" 4K Smart TV',
    price: 45999,
    originalPrice: 65999,
    discount: 30,
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
    rating: 4.5,
    upiPrice: 43699,
  },
  {
    id: 2,
    title: "iPhone 14 Pro Max - 256GB",
    price: 99999,
    originalPrice: 119999,
    discount: 17,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-max-deeppurple-select?wid=940&hei=1112&fmt=png-alpha&.v=1660753619946",
    rating: 4.8,
    upiPrice: 94999,
  },
  {
    id: 3,
    title: "Sony WH-1000XM4 Headphones",
    price: 24990,
    originalPrice: 29990,
    discount: 17,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.7,
    upiPrice: 23740,
  },
  {
    id: 4,
    title: "Samsung Galaxy S23 Ultra - 256GB",
    price: 124999,
    originalPrice: 149999,
    discount: 17,
    image:
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop",
    rating: 4.7,
    upiPrice: 118749,
  },
  {
    id: 5,
    title: "iPad Air 5th Gen - 64GB",
    price: 64999,
    originalPrice: 79999,
    discount: 19,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
    rating: 4.6,
    upiPrice: 61749,
  },
  {
    id: 6,
    title: "Canon EOS R5 Camera",
    price: 349999,
    originalPrice: 429999,
    discount: 19,
    image:
      "https://images.unsplash.com/photo-1606986628110-f5c2a4f79d55?w=400&h=400&fit=crop",
    rating: 4.9,
    upiPrice: 332499,
  },
  {
    id: 7,
    title: "JBL Charge 5 Speaker",
    price: 7999,
    originalPrice: 10999,
    discount: 27,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4.8,
    upiPrice: 7599,
  },
  {
    id: 8,
    title: "Lenovo ThinkPad X1",
    price: 89999,
    originalPrice: 119999,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1588872657840-90a6d9fa738d?w=400&h=400&fit=crop",
    rating: 4.5,
    upiPrice: 85499,
  },
  {
    id: 9,
    title: "Apple Watch Series 8",
    price: 39999,
    originalPrice: 49999,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.6,
    upiPrice: 37999,
  },
  {
    id: 10,
    title: "GoPro Hero 11",
    price: 39999,
    originalPrice: 49999,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.7,
    upiPrice: 37999,
  },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [recentSearchProducts, setRecentSearchProducts] = useState([]);
  const { isLoggedIn, user } = useAuthStore();
  const scrollRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  const cardWidth = 220;

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = cardWidth * 3;
    const newPos =
      dir === "right"
        ? Math.min(scrollPos + amount, el.scrollWidth - el.clientWidth)
        : Math.max(scrollPos - amount, 0);
    el.scrollTo({ left: newPos, behavior: "smooth" });
    setScrollPos(newPos);
  };

  const atStart = scrollPos === 0;
  const atEnd = scrollRef.current
    ? scrollPos >=
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 5
    : false;

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "";

    setSearchTerm(urlSearch);
    setSelectedCategory(urlCategory);

    if (urlSearch && isLoggedIn) {
      const recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]",
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
        localStorage.getItem("recentSearches") || "[]",
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

        <Carousel2 />

        <div className="bg-white mb-4 px-4 py-5 rounded-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Suggested For You
            </h2>
            <Link
              to="/?category=Electronics"
              className="bg-gray-900 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-700 transition shrink-0"
            >
              <FiChevronRight size={20} />
            </Link>
          </div>

          {/* Scroll Container */}
          <div className="relative">
            {/* Left Arrow */}
            {!atStart && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg w-9 h-9 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition"
                style={{ left: "-14px" }}
              >
                <FiChevronLeft size={18} className="text-gray-700" />
              </button>
            )}

            {/* Cards */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onScroll={(e) => setScrollPos(e.target.scrollLeft)}
            >
              {electronicsProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="shrink-0 group"
                  style={{ width: `${cardWidth}px` }}
                >
                  {/* Image */}
                  <div
                    className="relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100"
                    style={{ height: "280px" }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Rating Badge */}
                    {product.rating && (
                      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-1.5 py-0.5 flex items-center gap-1">
                        <span className="text-xs font-semibold text-gray-800">
                          {product.rating}
                        </span>
                        <FiStar
                          size={10}
                          className="text-yellow-500 fill-yellow-500"
                          style={{ fill: "#EAB308" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-2 px-0.5">
                    <p className="text-sm text-gray-800 font-medium truncate">
                      {product.title}
                    </p>

                    {/* Prices */}
                    <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
                      <span className="text-gray-400 line-through text-xs">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-gray-900 font-bold text-sm">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* UPI Offer */}
                    <p className="text-blue-600 text-xs mt-0.5 font-medium">
                      ₹{product.upiPrice.toLocaleString("en-IN")} with UPI offer
                      + more
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Arrow */}
            {!atEnd && (
              <button
                onClick={() => scroll("right")}
                className="absolute top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg w-9 h-9 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition"
                style={{ right: "-14px" }}
              >
                <FiChevronRight size={18} className="text-gray-700" />
              </button>
            )}
          </div>
        </div>

        <div
          className="mb-4 rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, #dce8f8 0%, #e8f0fb 100%)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Men's Sports Shoes For You
            </h2>
            <Link
              to="/?category=Shoes"
              className="bg-gray-900 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-700 transition shrink-0"
            >
              <FiChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mensShoesData.map((item) => (
              <Link
                key={item.id}
                to={`/?search=${item.sublabel}`}
                className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="h-44 overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="px-3 py-2">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800">
                    {item.sublabel}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

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
