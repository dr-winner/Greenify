import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: UserRole, userData: {
    fullName: string;
    phoneNumber: string;
    address: string;
    farmName?: string;
    farmLocation?: string;
    farmSize?: string;
    productsGrown?: string;
    companyName?: string;
    businessType?: string;
    purchaseFrequency?: string;
    preferredProducts?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
}

// Simulated user database
const users: User[] = [];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  signIn: async (email, password) => {
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    set({ user });
  },
  signUp: async (email, password, role, userData) => {
    if (users.some(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      created_at: new Date().toISOString(),
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      // Convert comma-separated strings to arrays where needed
      productsGrown: userData.productsGrown ? userData.productsGrown.split(',').map(p => p.trim()) : [],
      preferredProducts: userData.preferredProducts ? userData.preferredProducts.split(',').map(p => p.trim()) : [],
      // Add role-specific fields
      ...(role === 'farmer' ? {
        farmName: userData.farmName,
        farmLocation: userData.farmLocation,
        farmSize: userData.farmSize,
      } : {
        companyName: userData.companyName,
        businessType: userData.businessType,
        purchaseFrequency: userData.purchaseFrequency,
      })
    };

    users.push(newUser);
    set({ user: newUser });
  },
  signOut: async () => {
    set({ user: null });
  },
}));