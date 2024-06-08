import { create } from 'zustand';
import axios from '../utils/axios';

interface AuthState {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}


// Create the auth store using Zustand
export const useAuthStore = create<AuthState>((set) => ({
   // Initialize the user state from local storage if available
  user: typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,

    // Login function to authenticate the user
  login: async (email, password) => {
    // Send a POST request to the login endpoint with email and password
    const { data } = await axios.post('/users/login', { email, password });
    // Update the user state with the received data
    set({ user: data });
    // Store the user data in local storage
    localStorage.setItem('user', JSON.stringify(data));
  },
  
    // Register function to create a new user
  register: async (name, email, password) => {

    // Send a POST request to the register endpoint with name, email, and password
    const { data } = await axios.post('/users', { name, email, password });
    // Update the user state with the received data
    set({ user: data });
    // Store the user data in local storage
    localStorage.setItem('user', JSON.stringify(data));
  },
  // Logout function to clear the user state
  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirect to the home page after logging out
  },
}));

// Restore user from local storage on initial load
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    useAuthStore.setState({ user: JSON.parse(storedUser) });
  }
}