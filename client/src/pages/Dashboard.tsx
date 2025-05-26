
import { useQuery } from "@tanstack/react-query";
import BalanceCard from "@/components/BalanceCard";
import TransactionList from "@/components/TransactionList";
import SimpleChart from "@/components/SimpleChart";
import { Card as CardType, Transaction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { data: cards, isLoading: cardsLoading } = useQuery<CardType[]>({
    queryKey: ['/api/cards'],
    queryFn: () => fetch('/api/cards').then(res => res.json()),
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
    queryFn: () => fetch('/api/transactions').then(res => res.json()),
  });

  const studentCard = cards?.find(card => card.type === "student");
  
  // Calculate spent vs remaining for the chart
  const totalBudget = 5000; // Example monthly budget
  const spent = transactions?.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0) || 0;
  const remaining = Math.max(0, totalBudget - spent);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's your financial overview</p>
        </div>

        {cardsLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-opacity-50 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Balance Card */}
            {studentCard && (
              <div className="max-w-2xl">
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

            {/* Quick Stats with Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-white">Spending Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <SimpleChart spent={spent} remaining={remaining} />
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">This Month</p>
                        <p className="text-red-400 font-semibold">
                          KES {spent.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Remaining</p>
                        <p className="text-green-400 font-semibold">
                          KES {remaining.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-white">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Transactions</span>
                    <span className="font-semibold text-white">{transactions?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average per meal</span>
                    <span className="font-semibold text-white">
                      {transactions?.length ? 
                        `KES ${(spent / transactions.length).toFixed(0)}`
                        : 'KES 0'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Most frequent meal</span>
                    <span className="font-semibold text-white capitalize">
                      {(() => {
                        if (!transactions?.length) return 'N/A';
                        const mealCounts = transactions.reduce((acc, t) => {
                          acc[t.mealType] = (acc[t.mealType] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>);
                        return Object.entries(mealCounts).reduce((max, entry) =>
                          entry[1] > max[1] ? entry : max
                        )[0];
                      })()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transaction History */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Transaction History</h2>
              <TransactionList 
                transactions={transactions || []} 
                isLoading={transactionsLoading} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
