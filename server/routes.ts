import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { setupAuth } from "./auth";

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "You must be logged in to access this resource" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // Protected routes - require authentication
  app.get('/api/cards', ensureAuthenticated, async (req, res) => {
    const userId = req.user!.id;
    const cards = await storage.getCardsByUserId(userId);
    res.json(cards);
  });
  
  // Budget endpoint
  app.get('/api/budget', ensureAuthenticated, async (req, res) => {
    const userId = req.user!.id;
    const budget = await storage.getBudgetByUserId(userId);
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ message: "Budget not found" });
    }
  });
  
  // Transactions endpoints
  app.get('/api/transactions', ensureAuthenticated, async (req, res) => {
    const userId = req.user!.id;
    const transactions = await storage.getTransactionsByUserId(userId);
    res.json(transactions);
  });
  
  // Update card status (block/unblock)
  app.post("/api/cards/:cardId/status", ensureAuthenticated, async (req, res) => {
    try {
      const cardId = parseInt(req.params.cardId);
      const { isActive } = req.body;
      
      // This endpoint would be used to update the card status in a real system
      // For now we just return success since our frontend handles state locally
      res.json({ success: true, message: `Card ${isActive ? 'unblocked' : 'blocked'} successfully` });
    } catch (error) {
      res.status(500).json({ error: "Failed to update card status" });
    }
  });
  
  // Documentation/guides endpoints - public
  app.get('/api/guides', async (req, res) => {
    const guides = await storage.getAllGuides();
    res.json(guides);
  });

  const httpServer = createServer(app);
  return httpServer;
}
