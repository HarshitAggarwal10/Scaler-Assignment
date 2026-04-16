import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import Loader from '../components/Loader';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/orders/${orderId}`);
      setOrder(data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Your order has been placed successfully</p>
          </div>

          {order && (
            <>
              <div className="bg-gray-50 p-6 rounded mb-8">
                <p className="text-center">
                  <strong>Order ID:</strong> <span className="font-mono">{order.id}</span>
                </p>
                <p className="text-center mt-2 text-gray-600">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Order Items</h2>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-3 border rounded">
                      <span>{item.title} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                <div className="bg-gray-50 p-4 rounded">
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded mb-8">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{order.tax}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Order Status</h2>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded font-semibold capitalize">
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Link
              to="/orders"
              className="flex-1 text-center bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View All Orders
            </Link>
            <Link
              to="/"
              className="flex-1 text-center border border-primary text-primary font-bold py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
