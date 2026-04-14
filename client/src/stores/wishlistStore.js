import { create } from 'zustand';

const useWishlistStore = create((set) => ({
  items: JSON.parse(localStorage.getItem('wishlist')) || [],

  addToWishlist: (product) => {
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);
      if (exists) return state;

      const newItems = [...state.items, product];
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  removeFromWishlist: (productId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  isInWishlist: (productId) => {
    const state = useWishlistStore.getState();
    return state.items.some((item) => item.id === productId);
  },
}));

export default useWishlistStore;
