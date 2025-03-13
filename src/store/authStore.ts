import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'farmer' | 'buyer', userData: Partial<User>) => Promise<void>;
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
      fullName: userData.fullName || '',
      phoneNumber: userData.phoneNumber || '',
      address: userData.address || '',
      ...userData
    };
    users.push(newUser);
    set({ user: newUser });
  },
  signOut: async () => {
    set({ user: null });
  },
}));