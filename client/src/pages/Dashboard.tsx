import { useQuery } from "@tanstack/react-query";
import BalanceCard from "@/components/BalanceCard";
import BudgetCard from "@/components/BudgetCard";
import TransactionList from "@/components/TransactionList";
import DocumentationList from "@/components/DocumentationList";
import { Card as CardType, Budget, Transaction } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: cards, isLoading: cardsLoading } = useQuery<CardType[]>({
    queryKey: ['/api/cards']
  });

  const { data: budget, isLoading: budgetLoading } = useQuery<Budget>({
    queryKey: ['/api/budget']
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions']
  });

  const studentCard = cards?.find(card => card.type === "student");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white">
      {/* Page Heading */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cafeteria Card Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your student meal card and view transaction history</p>
        </div>
        
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cardsLoading ? (
          <div className="col-span-3 h-48 flex items-center justify-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-opacity-50 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Student Card Balance */}
            {studentCard && (
              <div className="lg:col-span-2">
                <BalanceCard 
                  type="student"
                  balance={studentCard.balance.toString()}
                  cardNumber={studentCard.cardNumber}
                  expiryDate={studentCard.expiryDate}
                  lastUsedAt={studentCard.lastUsedAt || undefined}
                  isActive={studentCard.isActive}
                />
              </div>
            )}

            {/* Monthly Budget */}
            {budget && !budgetLoading && (
              <BudgetCard 
                spent={budget.spent.toString()}
                total={budget.total.toString()}
              />
            )}
          </>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <TransactionList 
            transactions={transactions || []} 
            isLoading={transactionsLoading} 
          />
        </div>

        {/* Quick Stats Card */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Transactions</span>
                  <span className="font-semibold">{transactions?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average per meal</span>
                  <span className="font-semibold">
                    {transactions?.length ? 
                      new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' })
                        .format(transactions.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0) / transactions.length)
                      : 'KES 0'
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Most frequent meal</span>
                  <span className="font-semibold capitalize">
                    {transactions?.length ? 
                      transactions.reduce((acc, t) => {
                        acc[t.mealType] = (acc[t.mealType] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>).lunch ? 'Lunch' : 'Breakfast'
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentation Section */}
        <div>
          <DocumentationList />
        </div>
      </div>
    </div>
  );
}
