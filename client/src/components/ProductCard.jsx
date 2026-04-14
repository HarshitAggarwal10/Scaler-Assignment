import { Link } from 'react-router-dom';
import useCartStore from '../stores/cartStore';
import useWishlistStore from '../stores/wishlistStore';

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlistStore();

  const isInWishlist = wishlistItems.some((item) => item.id === product._id);

  const handleAddToCart = () => {
    addToCart({ id: product._id, ...product }, 1);
    alert('Added to cart!');
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({ id: product._id, ...product });
    }
  };

  const discount = product.discount || 20;
  const rating = product.rating || 4.5;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border border-gray-200">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md font-bold text-sm">
            -{discount}%
          </div>
        )}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 left-2 text-2xl transition ${
            isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          ❤️
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate hover:text-blue-600">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 my-2">
          <span className="text-sm font-semibold">⭐ {rating}</span>
          <span className="text-xs text-gray-500">({Math.floor(Math.random() * 1000)} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Category */}
        <p className="text-xs text-gray-600 mb-3 capitalize">{product.category}</p>

        {/* Stock Status */}
        <p className={`text-xs font-semibold mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-yellow-400 text-gray-900 font-bold py-2 px-3 rounded text-center hover:bg-yellow-500 transition text-sm"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-primary text-white font-bold py-2 px-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
