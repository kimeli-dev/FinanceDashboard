import { Utensils, Coffee, ShoppingBag, Pizza, UtensilsCrossed } from "lucide-react";
import { Transaction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function TransactionList({ transactions, isLoading }: TransactionListProps) {
  const getMealIcon = (mealType: string) => {
    switch (mealType?.toLowerCase()) {
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      case 'lunch':
        return <Utensils className="h-4 w-4" />;
      case 'dinner':
        return <UtensilsCrossed className="h-4 w-4" />;
      case 'snack':
        return <Pizza className="h-4 w-4" />;
      default:
        return <ShoppingBag className="h-4 w-4" />;
    }
  };

  const formatDate = (date: string | Date) => {
    const txDate = new Date(date);
    const now = new Date();
    const time = txDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    if (txDate.toDateString() === now.toDateString()) {
      return `Today, ${time}`;
    }

    const dateStr = txDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${dateStr}, ${time}`;
  };

  const getMealTime = (date: string | Date, mealType: string) => {
    const txDate = new Date(date);
    const hour = txDate.getHours();
    
    if (mealType?.toLowerCase() === 'breakfast' || (hour >= 6 && hour < 11)) {
      return 'Breakfast time';
    } else if (mealType?.toLowerCase() === 'lunch' || (hour >= 11 && hour < 16)) {
      return 'Lunch time';
    } else if (mealType?.toLowerCase() === 'dinner' || (hour >= 16 && hour < 22)) {
      return 'Dinner time';
    } else if (mealType?.toLowerCase() === 'snack') {
      return 'Snack time';
    }
    return 'Meal time';
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      signDisplay: 'never'
    }).format(Math.abs(amount));
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-white">Recent Transactions</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3 px-6">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-center gap-3 p-3">
                  <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-24 mb-2 bg-gray-700" />
                    <Skeleton className="h-3 w-16 bg-gray-700" />
                  </div>
                  <Skeleton className="h-3 w-16 bg-gray-700" />
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 px-6">
              <p className="text-gray-400 text-sm">No transactions found</p>
            </div>
          ) : (
            <div className="space-y-0">
              {transactions.slice(0, 8).map((transaction, index) => {
                const formattedAmount = formatAmount(Number(transaction.amount));

                return (
                  <div 
                    key={transaction.id} 
                    className={cn(
                      "group px-6 py-3 hover:bg-gray-700/50 transition-colors",
                      index !== transactions.length - 1 && "border-b border-gray-700"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300">
                        {getMealIcon(transaction.mealType)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">
                          {transaction.cafeteria}
                        </p>
                        <p className="text-xs text-gray-400">
                          {getMealTime(transaction.date, transaction.mealType)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(transaction.date)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-red-400 text-sm">
                          -{formattedAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}