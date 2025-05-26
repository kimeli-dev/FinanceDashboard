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
import Sidebar from "@/components/Sidebar";
import { ThemeProvider, useTheme } from "next-themes";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, LogOut } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";


// Theme toggle button
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

// Protected route layout and sidebar/header
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
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-primary dark:text-primary-400 lg:hidden">Cafeteria</h1>
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

// ✅ Wrap all providers in proper order
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
