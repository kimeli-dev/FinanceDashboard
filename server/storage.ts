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
  private cardIdCounter = 1;
  private budgetIdCounter = 1;
  private transactionIdCounter = 1;
  private guideIdCounter = 1;
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

    // Create cafeteria card
    const studentCard: Card = {
      id: this.cardId++,
      userId: demoUser.id,
      type: "student",
      balance: 3500.00, // KES
      cardNumber: "4582",
      expiryDate: "03/25",
      lastUsedAt: "Sironi", // Last used at Sironi cafeteria
      isActive: "true"
    };

    const staffCard: Card = {
      id: this.cardId++,
      userId: demoUser.id,
      type: "staff",
      balance: 5000.00, // KES
      cardNumber: "7391",
      expiryDate: "05/26",
      lastUsedAt: "Paul's Cafe", // Last used at Paul's Cafe
      isActive: "true"
    };

    this.cards.set(studentCard.id, studentCard);
    this.cards.set(staffCard.id, staffCard);

    // Create budget
    const budget: Budget = {
      id: this.budgetId++,
      userId: demoUser.id,
      spent: 1500.00, // KES
      total: 5000.00  // KES
    };

    this.budgets.set(budget.id, budget);

    // Create transactions
    const transactions: InsertTransaction[] = [
      {
        userId: demoUser.id,
        amount: -350.00,
        cafeteria: "Sironi",
        mealType: "Lunch",
        date: new Date(),
        iconType: "food"
      },
      {
        userId: demoUser.id,
        amount: -250.00,
        cafeteria: "Paul's Cafe",
        mealType: "Breakfast",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        iconType: "food"
      },
      {
        userId: demoUser.id,
        amount: -400.00,
        cafeteria: "Sironi",
        mealType: "Dinner",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        iconType: "food"
      },
      {
        userId: demoUser.id,
        amount: -150.00,
        cafeteria: "University Kiosk",
        mealType: "Snack",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        iconType: "food"
      },
      {
        userId: demoUser.id,
        amount: -350.00,
        cafeteria: "Sironi",
        mealType: "Lunch",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        iconType: "food"
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

    // Create demo data for new user
    await this.createDemoDataForUser(id);

    return user;
  }

  private async createDemoDataForUser(userId: number): Promise<void> {
    // Create demo student card
    const studentCard: Card = {
      id: this.cardId++,
      userId: userId,
      type: "student",
      balance: 2350.50,
      cardNumber: "4582",
      expiryDate: "03/25",
      lastUsedAt: "Sironi",
      isActive: "true"
    };

    // Create demo staff card
    const staffCard: Card = {
      id: this.cardId++,
      userId: userId,
      type: "staff", 
      balance: 4750.25,
      cardNumber: "7391",
      expiryDate: "05/26",
      lastUsedAt: "Paul's Cafe",
      isActive: "true"
    };

    this.cards.set(studentCard.id, studentCard);
    this.cards.set(staffCard.id, staffCard);

    // Create demo budget
    const budget: Budget = {
      id: this.budgetId++,
      userId: userId,
      total: 5000,
      spent: 2649.50,
      month: "November",
      year: 2024
    };

    this.budgets.set(budget.id, budget);

    // Create demo transactions
    const transactions: Transaction[] = [
      {
        id: this.transactionId++,
        userId: userId,
        amount: -45.50,
        description: "Lunch at Sironi",
        location: "Sironi Cafeteria",
        date: "2024-11-15T12:30:00Z",
        type: "purchase"
      },
      {
        id: this.transactionId++,
        userId: userId,
        amount: -28.75,
        description: "Coffee & Snack",
        location: "Paul's Cafe",
        date: "2024-11-15T09:15:00Z",
        type: "purchase"
      },
      {
        id: this.transactionId++,
        userId: userId,
        amount: 1000.00,
        description: "Monthly top-up",
        location: "Online Portal",
        date: "2024-11-01T08:00:00Z",
        type: "topup"
      },
      {
        id: this.transactionId++,
        userId: userId,
        amount: -85.25,
        description: "Dinner at Sironi",
        location: "Sironi Cafeteria", 
        date: "2024-11-14T19:45:00Z",
        type: "purchase"
      },
      {
        id: this.transactionId++,
        userId: userId,
        amount: -22.00,
        description: "Morning coffee",
        location: "Paul's Cafe",
        date: "2024-11-14T08:30:00Z",
        type: "purchase"
      }
    ];

    transactions.forEach(transaction => {
      this.transactions.set(transaction.id, transaction);
    });
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