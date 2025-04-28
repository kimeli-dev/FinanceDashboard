// Common types used across the client application
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Card {
  id: number;
  userId: number;
  type: string; // "student" or "staff"
  balance: number;
  cardNumber: string;
  expiryDate: string;
  lastUsedAt: string | null; // Name of the cafeteria where card was last used
  isActive: string; // "true" or "false" - if card is active or suspended
  qrCode: string | null; // QR code information
  nfcId: string | null; // NFC ID information
}

export interface Budget {
  id: number;
  userId: number;
  spent: number;
  total: number;
}

export interface Transaction {
  id: number;
  userId: number;
  amount: number;
  cafeteria: string; // Name of cafeteria (Sironi, Paul's Cafe, etc.)
  mealType: string; // Type of meal (Breakfast, Lunch, Dinner, Snack)
  date: string;
  iconType: string;
}

export interface Guide {
  id: number;
  title: string;
  description: string;
  iconName: string;
  cafeteriaId?: number; // Optional ID to link guide to specific cafeteria
  menuType?: string; // Type of menu (breakfast, lunch, etc.)
}
