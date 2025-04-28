import { ArrowRight, ShoppingBag, ArrowUpRight, Home, Coffee, Film } from "lucide-react";
import { Transaction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function TransactionList({ transactions, isLoading }: TransactionListProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'shopping':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
        );
      case 'income':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        );
      case 'housing':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <Home className="h-6 w-6" />
          </div>
        );
      case 'food':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <Coffee className="h-6 w-6" />
          </div>
        );
      case 'entertainment':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <Film className="h-6 w-6" />
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
    const isPositive = amount > 0;
    return {
      formatted: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: 'auto'
      }).format(amount),
      isPositive
    };
  };

  return (
    <Card className="bg-white shadow overflow-hidden sm:rounded-lg">
      <CardHeader className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
          <CardDescription>Your most recent card transactions.</CardDescription>
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
              const { formatted: formattedAmount, isPositive } = formatAmount(Number(transaction.amount));
              
              return (
                <div key={transaction.id} className="py-5 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getIcon(transaction.iconType)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{transaction.merchant}</div>
                        <div className="text-sm text-gray-500">{transaction.category}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={cn(
                        "text-sm font-medium",
                        isPositive ? "text-green-600" : "text-gray-900"
                      )}>
                        {formattedAmount}
                      </div>
                      <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
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
