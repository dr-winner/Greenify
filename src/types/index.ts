export type UserRole = 'farmer' | 'buyer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  // Farmer-specific fields
  farmName?: string;
  farmLocation?: string;
  farmSize?: string;
  productsGrown?: string[];
  // Buyer-specific fields
  companyName?: string;
  businessType?: string;
  purchaseFrequency?: string;
  preferredProducts?: string[];
}

export interface Product {
  id: string;
  farmer_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  image_url: string;
  location: string;
  created_at: string;
  category: string;
  certification?: string[];
  harvestDate?: string;
  expiryDate?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}