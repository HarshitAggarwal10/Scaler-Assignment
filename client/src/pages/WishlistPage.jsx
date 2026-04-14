import useWishlistStore from '../stores/wishlistStore';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { items: wishlistItems } = useWishlistStore();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your wishlist!</p>
          <Link
            to="/"
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlistItems.length})</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
