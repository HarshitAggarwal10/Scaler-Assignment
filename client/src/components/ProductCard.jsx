import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import useCartStore from '../stores/cartStore';
import useWishlistStore from '../stores/wishlistStore';
import { showToast } from '../utils/toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlistStore();

  // Handle both old database format and new mock data format
  const productId = product._id || product.id;
  const productName = product.title || product.name;
  const productStock = product.stock !== undefined ? product.stock : 10;

  const isInWishlist = wishlistItems.some((item) => item.id === productId);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id: productId, ...product }, 1);
    showToast.success(`${productName} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(productId);
      showToast.info(`${productName} removed from wishlist`);
    } else {
      addToWishlist({ id: productId, ...product });
      showToast.success(`${productName} added to wishlist!`);
    }
  };

  const discount = product.discount ? (typeof product.discount === 'string' ? 
    (product.discount.includes('%') ? parseInt(product.discount) : 0) : product.discount) : 20;
  const rating = product.rating || 4.5;
  const imageUrl = product.image || product.images?.[0] || 'https://via.placeholder.com/200';

  return (
    <Link to={`/product/${productId}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-300">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded font-bold text-sm sm:text-base">
              -{discount}%
            </div>
          )}
          
          <button
            onClick={handleWishlist}
            className={`absolute top-2 left-2 p-2 rounded-full transition ${
              isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white bg-opacity-70 text-gray-600 hover:bg-red-500 hover:bg-opacity-100 hover:text-white'
            }`}
          >
            <FiHeart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          
          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 hover:text-blue-600 transition">
            {productName}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 my-2 text-xs sm:text-sm">
            <span className="bg-green-600 text-white px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
              ★ {rating}
            </span>
            <span className="text-gray-600">({Math.floor(Math.random() * 1000)})</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg sm:text-xl font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-xs sm:text-sm">
                ₹{product.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Category Badge */}
          <p className="text-xs text-gray-600 mb-2 capitalize bg-gray-100 inline-block px-2 py-1 rounded">
            {product.category || 'Product'}
          </p>

          {/* Stock Status */}
          <p className={`text-xs font-semibold mb-3 ${productStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {productStock > 0 ? `In Stock` : 'Out of Stock'}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={productStock === 0}
            className="w-full bg-blue-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <FiShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
