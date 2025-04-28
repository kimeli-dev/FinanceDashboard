import { 
  users, cards, transactions,
  type User, type InsertUser,
  type Card, type InsertCard,
  type Transaction, type InsertTransaction
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Card methods
  getCardsByUserId(userId: number): Promise<Card[]>;
  getCard(id: number): Promise<Card | undefined>;
  createCard(card: InsertCard): Promise<Card>;
  updateCardBalance(cardId: number, newBalance: number): Promise<Card>;
  
  // Transaction methods
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  getTransactionsByCardId(cardId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cards: Map<number, Card>;
  private transactions: Map<number, Transaction>;
  currentUserId: number;
  currentCardId: number;
  currentTransactionId: number;

  constructor() {
    this.users = new Map();
    this.cards = new Map();
    this.transactions = new Map();
    this.currentUserId = 1;
    this.currentCardId = 1;
    this.currentTransactionId = 1;
    
    // Initialize with a demo user and data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo user
    const demoUser: User = {
      id: this.currentUserId++,
      username: "demo",
      password: "password", // In a real app, this would be hashed
      fullName: "John Smith",
      email: "john@example.com"
    };
    this.users.set(demoUser.id, demoUser);

    // Create demo card
    const demoCard: Card = {
      id: this.currentCardId++,
      userId: demoUser.id,
      cardNumber: "**** **** **** 4589",
      cardHolder: "John Smith",
      expiryDate: "12/25",
      cardType: "visa",
      balance: "8942.55"
    };
    this.cards.set(demoCard.id, demoCard);

    // Create demo transactions
    const transactions: Omit<Transaction, 'id'>[] = [
      {
        userId: demoUser.id,
        cardId: demoCard.id,
        amount: "2850.00",
        description: "Salary Payment",
        type: "income",
        status: "completed",
        createdAt: new Date("2023-08-15T09:24:00")
      },
      {
        userId: demoUser.id,
        cardId: demoCard.id,
        amount: "14.99",
        description: "Netflix Subscription",
        type: "expense",
        status: "completed",
        createdAt: new Date("2023-08-12T11:32:00")
      },
      {
        userId: demoUser.id,
        cardId: demoCard.id,
        amount: "89.99",
        description: "Apple Store",
        type: "expense",
        status: "completed",
        createdAt: new Date("2023-08-10T15:45:00")
      },
      {
        userId: demoUser.id,
        cardId: demoCard.id,
        amount: "65.49",
        description: "Grocery Store",
        type: "expense",
        status: "completed",
        createdAt: new Date("2023-08-08T16:12:00")
      },
      {
        userId: demoUser.id,
        cardId: demoCard.id,
        amount: "520.00",
        description: "Client Payment",
        type: "income",
        status: "completed",
        createdAt: new Date("2023-08-05T09:30:00")
      }
    ];

    // Add transactions to the map
    transactions.forEach(t => {
      const transaction: Transaction = { ...t, id: this.currentTransactionId++ };
      this.transactions.set(transaction.id, transaction);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Card methods
  async getCardsByUserId(userId: number): Promise<Card[]> {
    return Array.from(this.cards.values()).filter(
      (card) => card.userId === userId
    );
  }

  async getCard(id: number): Promise<Card | undefined> {
    return this.cards.get(id);
  }

  async createCard(insertCard: InsertCard): Promise<Card> {
    const id = this.currentCardId++;
    const card: Card = { ...insertCard, id };
    this.cards.set(id, card);
    return card;
  }

  async updateCardBalance(cardId: number, newBalance: number): Promise<Card> {
    const card = this.cards.get(cardId);
    if (!card) {
      throw new Error(`Card with ID ${cardId} not found`);
    }
    
    const updatedCard: Card = { 
      ...card, 
      balance: newBalance.toFixed(2) 
    };
    
    this.cards.set(cardId, updatedCard);
    return updatedCard;
  }

  // Transaction methods
  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getTransactionsByCardId(cardId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.cardId === cardId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = { 
      ...insertTransaction, 
      id,
      createdAt: new Date()
    };
    
    this.transactions.set(id, transaction);
    
    // Update card balance
    const card = await this.getCard(transaction.cardId);
    if (card) {
      const currentBalance = parseFloat(card.balance);
      const transactionAmount = parseFloat(transaction.amount);
      let newBalance = currentBalance;
      
      if (transaction.type === 'income') {
        newBalance += transactionAmount;
      } else if (transaction.type === 'expense') {
        newBalance -= transactionAmount;
      }
      
      await this.updateCardBalance(card.id, newBalance);
    }
    
    return transaction;
  }
}

export const storage = new MemStorage();
