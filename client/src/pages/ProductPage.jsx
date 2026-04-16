import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Loader from '../components/Loader';
import useCartStore from '../stores/cartStore';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/products/${id}`);
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Product not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="w-full">
              {/* Main Image Display */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images && product.images.length > 0 ? product.images[currentImageIndex] : product.image}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Image Navigation */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    >
                      ❮
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    >
                      ❯
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 object-cover rounded border-2 transition ${
                        currentImageIndex === idx ? 'border-blue-500' : 'border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover rounded" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold">{product.rating}/5</span>
              <span className="text-gray-600">({Math.floor(Math.random() * 1000)} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="line-through text-gray-500 text-xl">
                      ₹{product.originalPrice}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Specifications</h3>
                <div className="bg-gray-100 p-4 rounded">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-semibold">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              <p className={`text-lg font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </p>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-4 py-2 rounded font-bold"
                >
                  −
                </button>
                <span className="text-2xl font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="bg-gray-200 px-4 py-2 rounded font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition disabled:bg-gray-400"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                Buy Now
              </button>
            </div>

            {/* Seller Info */}
            <div className="mt-6 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">
                <strong>Sold by:</strong> {product.seller || 'Flipcart'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
