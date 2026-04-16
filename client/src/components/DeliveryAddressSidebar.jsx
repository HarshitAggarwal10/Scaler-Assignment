import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { MdAddLocation } from 'react-icons/md';
import useCartStore from '../stores/cartStore';
import { showToast } from '../utils/toast';

export default function DeliveryAddressSidebar({ isOpen, onClose, onSelectAddress }) {
  const { savedAddresses, addSavedAddress, removeSavedAddress } = useCartStore();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    isDefault: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.street || !formData.city || !formData.pinCode) {
      showToast.error('Please fill all required fields');
      return;
    }

    if (formData.phone.length !== 10) {
      showToast.error('Phone number must be 10 digits');
      return;
    }

    if (formData.pinCode.length !== 6) {
      showToast.error('Pin code must be 6 digits');
      return;
    }

    addSavedAddress(formData);
    showToast.success('Address saved successfully!');
    setFormData({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
      isDefault: false,
    });
    setShowForm(false);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        showToast.info(`Location: ${position.coords.latitude}, ${position.coords.longitude}`);
        // In a real app, you'd convert these coordinates to an address
      });
    } else {
      showToast.error('Geolocation not supported');
    }
  };

  const filteredAddresses = savedAddresses.filter((addr) =>
    addr.pinCode.includes(searchQuery) ||
    addr.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    addr.street.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Delivery Address</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Search & Current Location */}
          <div className="mb-6 space-y-3">
            <input
              type="text"
              placeholder="Search by area, street, pin code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleUseCurrentLocation}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-50 transition"
            >
              <HiOutlineMapPin size={20} />
              Use current location
            </button>
          </div>

          {/* Saved Addresses */}
          {filteredAddresses.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-600 mb-3">Saved Addresses</h3>
              <div className="space-y-2">
                {filteredAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition group"
                    onClick={() => {
                      onSelectAddress(addr);
                      onClose();
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{addr.name}</p>
                        <p className="text-xs text-gray-500">{addr.phone}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSavedAddress(addr.id);
                          showToast.success('Address removed');
                        }}
                        className="text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                      >
                        <IoClose size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700">{addr.street}</p>
                    <p className="text-sm text-gray-600">
                      {addr.city}, {addr.state} - {addr.pinCode}
                    </p>
                    {addr.isDefault && (
                      <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Address Form */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-500 transition"
            >
              <MdAddLocation size={20} />
              Add New Address
            </button>
          )}

          {showForm && (
            <form onSubmit={handleSaveAddress} className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="House No., Street name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pin Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  placeholder="6-digit pin code"
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Set as default address</span>
              </label>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
