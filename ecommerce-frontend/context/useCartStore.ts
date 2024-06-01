import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import { useAuthStore } from './userStore'; 

// Interface for a cart item
interface CartItem {
  productId: string;
  quantity: number;
}

// Interface for the cart state and actions
interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  fetchCart: (userId: string) => Promise<void>;
}

// Define the state creator function 
const cartStateCreator: StateCreator<CartState, [], []> = (set) => ({
  items: [],
  // Add item to the cart
  addItem: async (productId: string, quantity: number) => {
    const userId = useAuthStore.getState().user?._id; // Get the userId from the auth store
    if (!userId) throw new Error("User is not authenticated");

    //POST request to add item to backend
    const { data } = await axios.post('/api/cart', { productId, quantity, userId });
    
    //Updats cart state with the data from the backend
    set({ items: data.cartItems }); 
  },
  // Remove item from the cart
  removeItem: async (productId: string) => {
    const userId = useAuthStore.getState().user?._id; // Get the userId from the auth store
    if (!userId) throw new Error("User is not authenticated");

    //POST request to add item to backend
    const { data } = await axios.delete(`/api/cart/${userId}/${productId}`);

    //Updates cart state with data from backend
    set({ items: data.cartItems });
  },
  // Fetch cart items from the server
  fetchCart: async (userId: string) => {
    const { data } = await axios.get(`/api/cart/${userId}`);
    set({ items: data.cartItems }); 
  },
});

// Create a Zustand store for the cart state, with persistence
export const useCartStore = create<CartState>()(

  //persist the cart state in local storage. 
  persist(cartStateCreator, {
    name: 'cart-storage', // unique name for the local storage key
    storage: createJSONStorage(() => localStorage), // use localStorage for persistence
  })
);
