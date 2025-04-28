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
  type: text("type").notNull(), // "primary" or "savings"
  balance: numeric("balance").notNull(),
  cardNumber: text("card_number").notNull(),
  expiryDate: text("expiry_date").notNull(),
  growth: numeric("growth"), // For savings accounts
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
  merchant: text("merchant").notNull(),
  category: text("category").notNull(),
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
  growth: true,
});

export const insertBudgetSchema = createInsertSchema(budgets).pick({
  userId: true,
  spent: true,
  total: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  amount: true,
  merchant: true,
  category: true,
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
