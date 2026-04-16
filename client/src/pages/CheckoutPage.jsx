import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdLocationOn, MdLocationPin } from 'react-icons/md';
import useCartStore from '../stores/cartStore';
import useAuthStore from '../stores/authStore';
import api from '../utils/api';
import DeliveryAddressSidebar from '../components/DeliveryAddressSidebar';
import OrderConfirmationModal from '../components/OrderConfirmationModal';
import { showToast } from '../utils/toast';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, addSuperCoins, superCoins } = useCartStore();
  const { isLoggedIn, user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pinCode: user?.address?.zipCode || '',
    paymentMethod: 'upi',
  });
  const [loading, setLoading] = useState(false);
  const [useSuperCoins, setUseSuperCoins] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to proceed with checkout.</p>
          <Link
            to="/login"
            className="block text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add items to your cart before checkout.</p>
          <Link
            to="/"
            className="block text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setFormData((prev) => ({
      ...prev,
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
    }));
    setSidebarOpen(false);
    showToast.success('Address selected successfully');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.street || !formData.city || !formData.pinCode) {
      showToast.error('Please fill all required fields');
      return;
    }

    // Prepare order data for confirmation modal
    const orderToConfirm = {
      items: items,
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
      },
      paymentMethod: formData.paymentMethod,
      finalTotal: finalTotal,
      superCoinsDiscount: useSuperCoins ? Math.min(superCoins || 0, finalTotal) : 0,
    };

    setPendingOrderData(orderToConfirm);
    setShowConfirmationModal(true);
  };

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);

      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: pendingOrderData.shippingAddress,
        paymentMethod: pendingOrderData.paymentMethod,
        totalAmount: useSuperCoins ? finalTotal - (superCoins || 0) : finalTotal,
        superCoinsUsed: useSuperCoins ? superCoins : 0,
      };

      const { data } = await api.post('/orders', orderData);

      if (data.success || data.order) {
        // Award SuperCoins (5% of order value)
        const coinsEarned = Math.floor(finalTotal * 0.05);
        addSuperCoins(coinsEarned);

        clearCart();
        setShowConfirmationModal(false);
        showToast.success(`Order placed successfully! You earned ${coinsEarned} SuperCoins`);
        
        // Use the order ID from the response
        const orderId = data.order?.id || data.order?._id || data.orderId || 'unknown';
        setTimeout(() => {
          navigate(`/order-confirmation/${orderId}`);
        }, 1500);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      showToast.error(error.response?.data?.message || 'Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const shipping = totalPrice > 500 ? 0 : 40;
  const tax = Math.round(totalPrice * 0.05);
  let finalTotal = totalPrice + shipping + tax;
  
  let discountAmount = 0;
  if (useSuperCoins && superCoins > 0) {
    discountAmount = Math.min(superCoins, finalTotal);
    finalTotal = Math.max(0, finalTotal - discountAmount);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <OrderConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirmOrder}
        onCancel={() => setShowConfirmationModal(false)}
        orderData={pendingOrderData}
        loading={loading}
      />

      <DeliveryAddressSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectAddress={handleSelectAddress}
      />

      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Location - Flipkart Style */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MdLocationPin className="text-blue-600" size={24} />
                  Delivery Address
                </h2>

                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="w-full flex items-center justify-between p-4 border-2 border-dashed border-blue-500 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 transition"
                >
                  <span className="flex items-center gap-2">
                    <MdLocationOn size={20} />
                    {selectedAddress
                      ? `${selectedAddress.pinCode} - ${selectedAddress.city}`
                      : 'Select delivery location'}
                  </span>
                  <span>→</span>
                </button>

                {selectedAddress && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-gray-800">{selectedAddress.name}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.street}</p>
                    <p className="text-sm text-gray-600">
                      {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">📱 {selectedAddress.phone}</p>
                  </div>
                )}
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      maxLength="10"
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2">Street Address *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="House No., Building Name"
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-2">Pin Code *</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    maxLength="6"
                    onChange={handleChange}
                    required
                    placeholder="6-digit pin code"
                    className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* SuperCoins Section */}
              {(superCoins || 0) > 0 && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={useSuperCoins}
                        onChange={(e) => setUseSuperCoins(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 accent-yellow-500"
                      />
                      <div>
                        <span className="font-bold text-lg">💰 Use SuperCoins</span>
                        <p className="text-sm text-gray-600">Available: ₹{superCoins}</p>
                      </div>
                    </label>
                  </div>
                  {useSuperCoins && (
                    <p className="text-sm text-green-600 font-semibold">
                      Discount: ₹{discountAmount} applied!
                    </p>
                  )}
                </div>
              )}

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                <div className="space-y-3">
                  {['upi', 'credit_card', 'debit_card', 'net_banking'].map((method) => (
                    <label key={method} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 capitalize font-semibold">
                        {method === 'credit_card' && '💳 Credit Card'}
                        {method === 'debit_card' && '💳 Debit Card'}
                        {method === 'upi' && '📱 UPI'}
                        {method === 'net_banking' && '🏦 Net Banking'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 text-lg"
              >
                {loading ? 'Processing...' : `Proceed to Confirm - ₹${finalTotal}`}
              </button>
            </form>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h3 className="font-bold text-xl mb-6">Order Summary</h3>

              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-2 border-b">
                    <span className="text-gray-700">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? '✓ FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>
                {useSuperCoins && discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>SuperCoins Discount</span>
                    <span className="font-semibold">-₹{discountAmount}</span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Final Total</span>
                  <span className="text-2xl font-bold text-blue-600">₹{finalTotal}</span>
                </div>
              </div>

              {/* SuperCoins Display */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                <p className="text-xs text-gray-600 mb-2">💰 SuperCoins Available</p>
                <p className="text-2xl font-bold text-yellow-600">₹{superCoins || 0}</p>
                <p className="text-xs text-gray-600 mt-1">You'll earn {Math.floor(finalTotal * 0.05)} more coins on this order!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
