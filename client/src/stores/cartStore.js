import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],
  totalPrice: 0,

  addToCart: (product, quantity) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity }];
      }

      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      localStorage.setItem('cart', JSON.stringify(newItems));

      return { items: newItems, totalPrice };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      localStorage.setItem('cart', JSON.stringify(newItems));

      return { items: newItems, totalPrice };
    });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      localStorage.setItem('cart', JSON.stringify(newItems));

      return { items: newItems, totalPrice };
    });
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [], totalPrice: 0 });
  },
}));

export default useCartStore;
