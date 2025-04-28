import { Utensils, Coffee, ShoppingBag, Pizza, UtensilsCrossed } from "lucide-react";
import { Transaction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function TransactionList({ transactions, isLoading }: TransactionListProps) {
  const getMealIcon = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <Coffee className="h-6 w-6" />
          </div>
        );
      case 'lunch':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Utensils className="h-6 w-6" />
          </div>
        );
      case 'dinner':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
        );
      case 'snack':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Pizza className="h-6 w-6" />
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
        );
    }
  };

  const formatDate = (date: string | Date) => {
    const txDate = new Date(date);
    const now = new Date();
    
    // Check if it's today
    if (txDate.toDateString() === now.toDateString()) {
      return `Today, ${txDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }
    
    // Format as Month Day, Year
    return txDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatAmount = (amount: number) => {
    return {
      formatted: new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        signDisplay: 'never'
      }).format(Math.abs(amount))
    };
  };

  return (
    <Card className="bg-white shadow overflow-hidden sm:rounded-lg">
      <CardHeader className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <CardTitle className="text-lg">Recent Meal Transactions</CardTitle>
          <CardDescription>Your recent cafeteria purchases</CardDescription>
        </div>
        <Button variant="outline" className="text-primary-700 bg-primary-100 hover:bg-primary-200 border-0">
          View All
        </Button>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="py-5 px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="ml-4">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            transactions.map((transaction) => {
              const { formatted: formattedAmount } = formatAmount(Number(transaction.amount));
              
              return (
                <div key={transaction.id} className="py-5 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getMealIcon(transaction.mealType)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.cafeteria}
                          <Badge variant="outline" className="ml-2 px-2 py-0 text-xs bg-gray-100">
                            {transaction.mealType}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium text-red-600">
                        -{formattedAmount}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Cafeteria Purchase</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
