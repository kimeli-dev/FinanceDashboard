
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Documentation from "@/pages/Documentation";
import AuthPage from "@/pages/AuthPage";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, MessageSquare } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



// Feedback form component
function FeedbackDialog() {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", { feedback, email });
    setFeedback("");
    setEmail("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <MessageSquare className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve the app by sharing your thoughts and suggestions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think or suggest improvements..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!feedback.trim()}>
              Send Feedback
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Mobile menu component
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutMutation } = useAuth();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-gray-400 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 p-4"></div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {user && (
              <Card className="bg-gray-700 border-gray-600 mb-4">
                <CardContent className="p-4">
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Feedback</span>
                <FeedbackDialog />
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  logoutMutation.mutate();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// User menu for desktop
function UserMenu() {
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  return (
    <div className="hidden md:flex items-center gap-2">
      <span className="text-sm text-gray-300">{user.name}</span>
      <FeedbackDialog />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => logoutMutation.mutate()}
        title="Log out"
        className="text-gray-400 hover:text-white"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
}

// Main router component
function Router() {
  const [location] = useLocation();
  const showHeader = location !== "/auth";
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      {showHeader && user && (
        <header className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-white font-mono tracking-wide">MealCard Info</h1>
              </div>
              <div className="flex items-center space-x-2">
                <MobileMenu />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route path="/">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/documentation">
            <ProtectedRoute>
              <Documentation />
            </ProtectedRoute>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
