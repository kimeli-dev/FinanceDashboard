
import { useState } from "react";
import { Utensils, Coffee, ShoppingBag, Pizza, UtensilsCrossed, Filter, Search } from "lucide-react";
import { Transaction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function TransactionList({ transactions, isLoading }: TransactionListProps) {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [amountFilter, setAmountFilter] = useState<string>("all");

  const getMealIcon = (mealType: string) => {
    switch (mealType?.toLowerCase()) {
      case 'breakfast':
        return <Coffee className="h-5 w-5" />;
      case 'lunch':
        return <Utensils className="h-5 w-5" />;
      case 'dinner':
        return <UtensilsCrossed className="h-5 w-5" />;
      case 'snack':
        return <Pizza className="h-5 w-5" />;
      default:
        return <ShoppingBag className="h-5 w-5" />;
    }
  };

  const getMealColor = (mealType: string) => {
    switch (mealType?.toLowerCase()) {
      case 'breakfast':
        return "bg-amber-50 text-amber-600 border-amber-200";
      case 'lunch':
        return "bg-green-50 text-green-600 border-green-200";
      case 'dinner':
        return "bg-blue-50 text-blue-600 border-blue-200";
      case 'snack':
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const formatDate = (date: string | Date) => {
    const txDate = new Date(date);
    const now = new Date();
    
    if (txDate.toDateString() === now.toDateString()) {
      return `Today, ${txDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }
    
    return txDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      signDisplay: 'never'
    }).format(Math.abs(amount));
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.cafeteria?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.mealType?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMealType = filter === "all" || transaction.mealType?.toLowerCase() === filter;
    
    const amount = Math.abs(Number(transaction.amount));
    const matchesAmount = amountFilter === "all" || 
      (amountFilter === "low" && amount < 50) ||
      (amountFilter === "medium" && amount >= 50 && amount < 100) ||
      (amountFilter === "high" && amount >= 100);

    return matchesSearch && matchesMealType && matchesAmount;
  });

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Transactions</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Your cafeteria purchase history</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-white/50 border-gray-200"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-32 bg-white/50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Meals</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>

            <select
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="w-full sm:w-32 bg-white/50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Amounts</option>
              <option value="low">&lt; KES 50</option>
              <option value="medium">KES 50-100</option>
              <option value="high">&gt; KES 100</option>
            </select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-0">
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3 px-6">
              {Array(5).fill(0).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No transactions found matching your filters</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredTransactions.map((transaction, index) => {
                const formattedAmount = formatAmount(Number(transaction.amount));
                
                return (
                  <div 
                    key={transaction.id} 
                    className={cn(
                      "group px-6 py-4 hover:bg-gray-50/50 transition-colors",
                      index !== filteredTransactions.length - 1 && "border-b border-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full",
                        getMealColor(transaction.mealType)
                      )}>
                        {getMealIcon(transaction.mealType)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 truncate">
                            {transaction.cafeteria}
                          </p>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs px-2 py-0",
                              getMealColor(transaction.mealType)
                            )}
                          >
                            {transaction.mealType}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-red-600">
                          -{formattedAmount}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Purchase
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {!isLoading && filteredTransactions.length > 0 && (
          <div className="px-6 pt-4 border-t border-gray-100">
            <Button 
              variant="ghost" 
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              View All Transactions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
