import { useState } from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function OrderConfirmationModal({ isOpen, onConfirm, onCancel, orderData, loading }) {
  if (!isOpen || !orderData) return null;

  const { items, shippingAddress, paymentMethod, finalTotal, superCoinsDiscount } = orderData;

  const paymentMethodLabels = {
    upi: '📱 UPI',
    credit_card: '💳 Credit Card',
    debit_card: '💳 Debit Card',
    net_banking: '🏦 Net Banking',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="text-yellow-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Confirm Your Order</h2>
          </div>
          <button
            onClick={onCancel}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Order Items Preview */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Order Items</h3>
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.title} x {item.quantity}</span>
                  <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">📍 Delivery Address</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-800">{shippingAddress.name}</p>
              <p className="text-sm text-gray-600">{shippingAddress.street}</p>
              <p className="text-sm text-gray-600">
                {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
              </p>
              <p className="text-sm text-gray-600 mt-2">📱 {shippingAddress.phone}</p>
            </div>
          </div>

          {/* Cost Summary */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-800">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{(finalTotal - (superCoinsDiscount || 0)).toLocaleString('en-IN')}</span>
              </div>
              {superCoinsDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>SuperCoins Discount:</span>
                  <span className="font-semibold">-₹{superCoinsDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-blue-600">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Payment Method</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {paymentMethodLabels[paymentMethod] || paymentMethod}
            </p>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ By confirming, you agree to our terms and conditions. Your order will be confirmed and you will receive an email confirmation.
            </p>
          </div>
        </div>

        {/* Footer - Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          >
            Edit Order
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            <FiCheck size={20} />
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
