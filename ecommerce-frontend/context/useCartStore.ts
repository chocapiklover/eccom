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
    sizeStock: { size: string; stockQuantity: number }[]; // Add sizeStock to product interface
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
  clearCart: () => void;
}

// Define the state creator function
const cartStateCreator: StateCreator<CartState, [], []> = (set, get) => ({
  items: [],

  // Add item to the cart
  addItem: async (productId: string, quantity: number, size: string) => {
    const userId = useAuthStore.getState().user?._id; // Get the userId from the auth store
    if (!userId) throw new Error("User is not authenticated");

    // Fetch product details to get the stock quantity for the specific size
    const productResponse = await axios.get(`/products/${productId}`);
    const product = productResponse.data;
    const sizeStock = product.sizeStock.find((item: { size: string }) => item.size === size);

    if (!sizeStock) {
      throw new Error("Size not found for the product");
    }

    // Check the total quantity of the product already in the cart
    const existingItem = get().items.find(item => item.product._id === productId && item.size === size);
    const existingQuantity = existingItem ? existingItem.quantity : 0;

    // Check if the requested quantity plus existing quantity is less than or equal to the available stock
    if (existingQuantity + quantity > sizeStock.stockQuantity) {
      throw new Error("Requested quantity exceeds available stock for this size");
    }

    // POST request to add item to backend
    const { data } = await axios.post('/cart', { productId, quantity, userId, size });
    
    // Update cart state with the data from the backend
    set({ items: data.cartItems }); 
  },

  // Remove item from the cart
  removeItem: async (productId: string, size: string) => {
    const userId = useAuthStore.getState().user?._id; // Get the userId from the auth store
    if (!userId) throw new Error("User is not authenticated");

    // DELETE request to remove item from backend
    const { data } = await axios.delete(`/cart/${userId}/${productId}/${size}`);

    // Update cart state with data from backend
    set({ items: data.cartItems });
  },

  // Fetch cart items from the server
  fetchCart: async (userId: string) => {
    const { data } = await axios.get(`/cart/${userId}`);
    set({ items: data.cartItems }); 
  },

  // Clear the cart
  clearCart: () => set({ items: [] }),
});

// Create a Zustand store for the cart state, with persistence
export const useCartStore = create<CartState>()(
  persist(cartStateCreator, {
    name: 'cart-storage', // unique name for the local storage key
    storage: createJSONStorage(() => localStorage), // use localStorage for persistence
  })
);
