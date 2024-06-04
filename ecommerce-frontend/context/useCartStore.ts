import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from '../utils/axios';
import { useAuthStore } from './userStore'; 

// Interface for a populated cart item
interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  size: string;
}

// Interface for the cart state and actions
interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity: number, size: string) => Promise<void>;
  removeItem: (productId: string, size: string) => Promise<void>;
  fetchCart: (userId: string) => Promise<void>;
}

// Define the state creator function 
const cartStateCreator: StateCreator<CartState, [], []> = (set) => ({
  items: [],
  // Add item to the cart
  addItem: async (productId: string, quantity: number, size: string) => {
    const userId = useAuthStore.getState().user?._id; // Get the userId from the auth store
    if (!userId) throw new Error("User is not authenticated");

    // POST request to add item to backend
    const { data } = await axios.post('/cart', { productId, quantity, size, userId });

    // Fetch the latest cart items after adding the item
    const updatedCart = await axios.get(`/cart/${userId}`);
    set({ items: updatedCart.data.cartItems });
  },
  // Remove item from the cart
  removeItem: async (productId: string, size: string) => {
    const userId = useAuthStore.getState().user?._id; // Get the userId from the auth store
    if (!userId) throw new Error("User is not authenticated");

    // DELETE request to remove item from backend
    const { data } = await axios.delete(`/cart/${userId}/${productId}/${size}`);

    // Fetch the latest cart items after removing the item
    const updatedCart = await axios.get(`/cart/${userId}`);
    set({ items: updatedCart.data.cartItems });
  },
  // Fetch cart items from the server
  fetchCart: async (userId: string) => {
    const { data } = await axios.get(`/cart/${userId}`);
    set({ items: data.cartItems });
  },
});

// Create a Zustand store for the cart state, with persistence
export const useCartStore = create<CartState>()(
  // Persist the cart state in local storage.
  persist(cartStateCreator, {
    name: 'cart-storage', // unique name for the local storage key
    storage: createJSONStorage(() => localStorage), // use localStorage for persistence
  })
);