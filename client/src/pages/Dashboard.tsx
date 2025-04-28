import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type User, type Card, type Transaction } from "@shared/schema";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CardBalance from "@/components/CardBalance";
import QuickActions from "@/components/QuickActions";
import TransactionHistory from "@/components/TransactionHistory";
import Documentation from "@/components/Documentation";
import MobileNavigation from "@/components/MobileNavigation";
import { format } from "date-fns";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Fetch current user
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  // Fetch user's cards
  const { data: cards, isLoading: cardsLoading } = useQuery<Card[]>({
    queryKey: ["/api/cards"],
  });

  // Fetch transactions
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mainCard = cards?.[0];
  const loadingAny = userLoading || cardsLoading || transactionsLoading;
  const currentDate = format(new Date(), "EEEE, d MMMM yyyy");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar 
        user={user}
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {/* Header */}
        <Header 
          title="Dashboard" 
          onMenuClick={toggleMobileMenu} 
        />

        {/* Dashboard Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {loadingAny 
                    ? "Loading..." 
                    : `Welcome back, ${user?.fullName?.split(' ')[0] || ""}!`}
                </h2>
                <p className="text-gray-500 mt-1">{currentDate}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-secondary transition-colors">
                  <i className="fas fa-plus mr-2"></i>
                  Add Money
                </button>
              </div>
            </div>
          </div>

          {/* Card Balance Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Main Card */}
            {loadingAny ? (
              <div className="bg-gradient-to-r from-primary to-secondary rounded-xl text-white p-5 shadow-md col-span-1 md:col-span-2 animate-pulse">
                <div className="h-24"></div>
              </div>
            ) : (
              <CardBalance card={mainCard} />
            )}
            
            {/* Quick Actions Card */}
            <QuickActions />
          </div>

          {/* Transaction Section */}
          <TransactionHistory 
            transactions={transactions || []} 
            isLoading={transactionsLoading}
          />

          {/* Documentation Section */}
          <Documentation />
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Dashboard;
