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
  type: string;
  balance: number;
  cardNumber: string;
  expiryDate: string;
  growth: number | null;
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
  merchant: string;
  category: string;
  date: string;
  iconType: string;
}

export interface Guide {
  id: number;
  title: string;
  description: string;
  iconName: string;
}
