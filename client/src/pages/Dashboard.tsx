import { useQuery } from "@tanstack/react-query";

// Components
import BalanceCard from "@/components/BalanceCard";
import TransactionList from "@/components/TransactionList";
import DocumentationList from "@/components/DocumentationList";

// Types
import { Card as CardType, Transaction } from "@/lib/types";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // Fetch cards data from the backend
  const { data: cards, isLoading: cardsLoading } = useQuery<CardType[]>({
    queryKey: ['/api/cards'],
    queryFn: () => fetch('/api/cards').then(res => res.json()),
  });

  // Fetch transactions data from the backend
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
    queryFn: () => fetch('/api/transactions').then(res => res.json()),
  });

  // Find the student-type card, if any
  const studentCard = cards?.find(card => card.type === "student");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Cafeteria Card Dashboard</h1>
        <p className="text-gray-400 mt-1">Manage your student meal card and view transaction history</p>
      </div>

      {/* Cards and Transactions Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {cardsLoading ? (
          // Show loading spinner while cards are being fetched
          <div className="col-span-3 h-48 flex items-center justify-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-opacity-50 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Show student card balance if available */}
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

            {/* Recent Transactions */}
            <div className="lg:col-span-1">
              <TransactionList 
                transactions={transactions || []} 
                isLoading={transactionsLoading} 
              />
            </div>
          </>
        )}
      </div>

      {/* Documentation and Stats Section */}
      <div className="mt-6 space-y-6">

        {/* Quick Stats Card */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-lg text-black">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">This Month</h3>
              <div className="space-y-4 text-sm">

                {/* Total number of transactions */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Transactions</span>
                  <span className="font-semibold">{transactions?.length || 0}</span>
                </div>

                {/* Average cost per meal */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average per meal</span>
                  <span className="font-semibold">
                    {transactions?.length ? 
                      new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' })
                        .format(
                          transactions.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0) / transactions.length
                        )
                      : 'KES 0'
                    }
                  </span>
                </div>

                {/* Most frequent meal type */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Most frequent meal</span>
                  <span className="font-semibold capitalize">
                    {(() => {
                      if (!transactions?.length) return 'N/A';

                      // Count occurrences of each meal type
                      const mealCounts = transactions.reduce((acc, t) => {
                        acc[t.mealType] = (acc[t.mealType] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>);

                      // Get the most frequent one
                      return Object.entries(mealCounts).reduce((max, entry) =>
                        entry[1] > max[1] ? entry : max
                      )[0];
                    })()}
                  </span>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentation Component */}
        <div>
          <DocumentationList />
        </div>
      </div>
    </div>
  );
}

