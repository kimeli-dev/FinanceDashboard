import { 
  users, transactions, cards, budgets, guides,
  type User, type InsertUser,
  type Transaction, type InsertTransaction,
  type Card, type InsertCard,
  type Budget, type InsertBudget,
  type Guide, type InsertGuide
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Card methods
  getCardsByUserId(userId: number): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;
  
  // Budget methods
  getBudgetByUserId(userId: number): Promise<Budget | undefined>;
  createBudget(budget: InsertBudget): Promise<Budget>;
  
  // Transaction methods
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Guide methods
  getAllGuides(): Promise<Guide[]>;
  createGuide(guide: InsertGuide): Promise<Guide>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cards: Map<number, Card>;
  private budgets: Map<number, Budget>;
  private transactions: Map<number, Transaction>;
  private guides: Map<number, Guide>;
  
  private userId: number = 1;
  private cardId: number = 1;
  private budgetId: number = 1;
  private transactionId: number = 1;
  private guideId: number = 1;

  constructor() {
    this.users = new Map();
    this.cards = new Map();
    this.budgets = new Map();
    this.transactions = new Map();
    this.guides = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create a demo user
    const demoUser: User = {
      id: this.userId++,
      username: "demo",
      password: "demo",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };
    this.users.set(demoUser.id, demoUser);
    
    // Create cards
    const primaryCard: Card = {
      id: this.cardId++,
      userId: demoUser.id,
      type: "primary",
      balance: 4578.23,
      cardNumber: "4582",
      expiryDate: "03/25",
      growth: null
    };
    
    const savingsCard: Card = {
      id: this.cardId++,
      userId: demoUser.id,
      type: "savings",
      balance: 12843.00,
      cardNumber: "7391",
      expiryDate: "05/26",
      growth: 3.2
    };
    
    this.cards.set(primaryCard.id, primaryCard);
    this.cards.set(savingsCard.id, savingsCard);
    
    // Create budget
    const budget: Budget = {
      id: this.budgetId++,
      userId: demoUser.id,
      spent: 2354.75,
      total: 3500.00
    };
    
    this.budgets.set(budget.id, budget);
    
    // Create transactions
    const transactions: InsertTransaction[] = [
      {
        userId: demoUser.id,
        amount: -84.99,
        merchant: "Amazon.com",
        category: "Shopping",
        date: new Date(),
        iconType: "shopping"
      },
      {
        userId: demoUser.id,
        amount: 3250.00,
        merchant: "Salary Deposit",
        category: "Income",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        iconType: "income"
      },
      {
        userId: demoUser.id,
        amount: -1250.00,
        merchant: "Apartment Rent",
        category: "Housing",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        iconType: "housing"
      },
      {
        userId: demoUser.id,
        amount: -5.45,
        merchant: "Starbucks",
        category: "Food & Dining",
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        iconType: "food"
      },
      {
        userId: demoUser.id,
        amount: -13.99,
        merchant: "Netflix",
        category: "Entertainment",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        iconType: "entertainment"
      }
    ];
    
    transactions.forEach(t => {
      const transaction: Transaction = {
        ...t,
        id: this.transactionId++
      };
      this.transactions.set(transaction.id, transaction);
    });
    
    // Create guides
    const guides: InsertGuide[] = [
      {
        title: "How to track your spending",
        description: "Learn tips and tricks to effectively track your expenses.",
        iconName: "book"
      },
      {
        title: "Security best practices",
        description: "Keep your account safe with these security guidelines.",
        iconName: "shield"
      },
      {
        title: "Setting up recurring payments",
        description: "Never miss a bill payment with automated payments.",
        iconName: "calendar"
      },
      {
        title: "Getting financial insights",
        description: "Understand your spending habits with our analytics tools.",
        iconName: "lightbulb"
      }
    ];
    
    guides.forEach(g => {
      const guide: Guide = {
        ...g,
        id: this.guideId++
      };
      this.guides.set(guide.id, guide);
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
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Card methods
  async getCardsByUserId(userId: number): Promise<Card[]> {
    return Array.from(this.cards.values()).filter(
      card => card.userId === userId
    );
  }
  
  async createCard(insertCard: InsertCard): Promise<Card> {
    const id = this.cardId++;
    const card: Card = { ...insertCard, id };
    this.cards.set(id, card);
    return card;
  }
  
  // Budget methods
  async getBudgetByUserId(userId: number): Promise<Budget | undefined> {
    return Array.from(this.budgets.values()).find(
      budget => budget.userId === userId
    );
  }
  
  async createBudget(insertBudget: InsertBudget): Promise<Budget> {
    const id = this.budgetId++;
    const budget: Budget = { ...insertBudget, id };
    this.budgets.set(id, budget);
    return budget;
  }
  
  // Transaction methods
  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionId++;
    const transaction: Transaction = { ...insertTransaction, id };
    this.transactions.set(id, transaction);
    return transaction;
  }
  
  // Guide methods
  async getAllGuides(): Promise<Guide[]> {
    return Array.from(this.guides.values());
  }
  
  async createGuide(insertGuide: InsertGuide): Promise<Guide> {
    const id = this.guideId++;
    const guide: Guide = { ...insertGuide, id };
    this.guides.set(id, guide);
    return guide;
  }
}

export const storage = new MemStorage();
