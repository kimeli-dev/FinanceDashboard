import { pgTable, text, serial, numeric, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  avatarUrl: text("avatar_url"),
});

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  type: text("type").notNull(), // "student" or "staff"
  balance: numeric("balance").notNull(),
  cardNumber: text("card_number").notNull(),
  expiryDate: text("expiry_date").notNull(),
  lastUsedAt: text("last_used_at"), // Name of the cafeteria where card was last used
  isActive: text("is_active").default("true").notNull(), // To track whether card is active or suspended
});

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  spent: numeric("spent").notNull(),
  total: numeric("total").notNull(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  amount: numeric("amount").notNull(),
  cafeteria: text("cafeteria").notNull(), // Name of cafeteria (Sironi, Paul's Cafe, etc.)
  mealType: text("meal_type").notNull(), // Type of meal (Breakfast, Lunch, Dinner, Snack)
  date: timestamp("date").notNull(),
  iconType: varchar("icon_type", { length: 20 }).notNull(), // Type of icon to display
});

export const guides = pgTable("guides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  avatarUrl: true,
});

export const insertCardSchema = createInsertSchema(cards).pick({
  userId: true,
  type: true,
  balance: true,
  cardNumber: true,
  expiryDate: true,
  lastUsedAt: true,
  isActive: true,
  qrCode: true,
  nfcId: true,
});

export const insertBudgetSchema = createInsertSchema(budgets).pick({
  userId: true,
  spent: true,
  total: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  amount: true,
  cafeteria: true,
  mealType: true,
  date: true,
  iconType: true,
});

export const insertGuideSchema = createInsertSchema(guides).pick({
  title: true,
  description: true,
  iconName: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cards.$inferSelect;

export type InsertBudget = z.infer<typeof insertBudgetSchema>;
export type Budget = typeof budgets.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type Guide = typeof guides.$inferSelect;
