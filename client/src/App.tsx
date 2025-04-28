import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Documentation from "@/pages/Documentation";
import AuthPage from "@/pages/AuthPage";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider, useTheme } from 'next-themes';
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, LogOut } from "lucide-react";

// Theme toggle component
function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </Button>
  );
}

// User menu with logout
function UserMenu() {
  const { user, logoutMutation } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm hidden md:inline">{user.name}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => logoutMutation.mutate()}
        title="Log out"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
}

function Router() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const showSidebar = location !== "/auth";
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      {showSidebar && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      )}
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {showSidebar && user && (
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-primary dark:text-primary-400 lg:hidden">Cafeteria</h1>
                  </div>
                </div>
                <div className="flex items-center lg:hidden">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <ThemeToggle />
                  <UserMenu />
                </div>
              </div>
            </div>
          </header>
        )}
        
        <main className={`flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 ${!showSidebar ? 'w-full' : ''}`}>
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
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
