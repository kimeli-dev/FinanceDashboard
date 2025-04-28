import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  const apiRouter = app.route('/api');
  
  // Current user endpoint - for now we'll just use the demo user
  app.get('/api/user', async (req, res) => {
    const user = await storage.getUserByUsername("demo");
    if (user) {
      // Exclude password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
  
  // Cards endpoints
  app.get('/api/cards', async (req, res) => {
    const user = await storage.getUserByUsername("demo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const cards = await storage.getCardsByUserId(user.id);
    res.json(cards);
  });
  
  // Budget endpoint
  app.get('/api/budget', async (req, res) => {
    const user = await storage.getUserByUsername("demo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const budget = await storage.getBudgetByUserId(user.id);
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ message: "Budget not found" });
    }
  });
  
  // Transactions endpoints
  app.get('/api/transactions', async (req, res) => {
    const user = await storage.getUserByUsername("demo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const transactions = await storage.getTransactionsByUserId(user.id);
    res.json(transactions);
  });
  
  // Documentation/guides endpoints
  app.get('/api/guides', async (req, res) => {
    const guides = await storage.getAllGuides();
    res.json(guides);
  });

  const httpServer = createServer(app);
  return httpServer;
}
