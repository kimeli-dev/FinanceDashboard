import { useQuery } from "@tanstack/react-query";
import BalanceCard from "@/components/BalanceCard";
import BudgetCard from "@/components/BudgetCard";
import TransactionList from "@/components/TransactionList";
import DocumentationList from "@/components/DocumentationList";
import { Card, Budget, Transaction } from "@/lib/types";

export default function Dashboard() {
  const { data: cards, isLoading: cardsLoading } = useQuery<Card[]>({
    queryKey: ['/api/cards']
  });

  const { data: budget, isLoading: budgetLoading } = useQuery<Budget>({
    queryKey: ['/api/budget']
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions']
  });

  const primaryCard = cards?.find(card => card.type === "primary");
  const savingsCard = cards?.find(card => card.type === "savings");

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cardsLoading ? (
          <div className="col-span-3 h-48 flex items-center justify-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-opacity-50 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Primary Card Balance */}
            {primaryCard && (
              <BalanceCard 
                type="primary"
                balance={primaryCard.balance.toString()}
                cardNumber={primaryCard.cardNumber}
                expiryDate={primaryCard.expiryDate}
              />
            )}

            {/* Savings Card Balance */}
            {savingsCard && (
              <BalanceCard 
                type="savings"
                balance={savingsCard.balance.toString()}
                cardNumber={savingsCard.cardNumber}
                expiryDate={savingsCard.expiryDate}
                growth={savingsCard.growth?.toString()}
              />
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

        {/* Documentation Section */}
        <div>
          <DocumentationList />
        </div>
      </div>
    </div>
  );
}
