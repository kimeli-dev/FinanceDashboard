import { useQuery } from "@tanstack/react-query";
import BalanceCard from "@/components/BalanceCard";
import BudgetCard from "@/components/BudgetCard";
import TransactionList from "@/components/TransactionList";
import DocumentationList from "@/components/DocumentationList";
import { Card, Budget, Transaction } from "@/lib/types";
import { IoCardOutline, IoQrCodeOutline, IoWifiOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

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

  const studentCard = cards?.find(card => card.type === "student");
  const staffCard = cards?.find(card => card.type === "staff");

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cafeteria Card Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your meal cards and view transaction history</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            variant="outline" 
            className="border-primary-600 text-primary-600 hover:bg-primary-50" 
            size="sm"
          >
            <IoQrCodeOutline className="mr-1 h-4 w-4" />
            Show QR Code
          </Button>
          <Button 
            variant="outline" 
            className="border-primary-600 text-primary-600 hover:bg-primary-50" 
            size="sm"
          >
            <IoWifiOutline className="mr-1 h-4 w-4" />
            Activate NFC
          </Button>
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
              <BalanceCard 
                type="student"
                balance={studentCard.balance.toString()}
                cardNumber={studentCard.cardNumber}
                expiryDate={studentCard.expiryDate}
                lastUsedAt={studentCard.lastUsedAt || undefined}
                isActive={studentCard.isActive}
              />
            )}

            {/* Staff Card Balance */}
            {staffCard && (
              <BalanceCard 
                type="staff"
                balance={staffCard.balance.toString()}
                cardNumber={staffCard.cardNumber}
                expiryDate={staffCard.expiryDate}
                lastUsedAt={staffCard.lastUsedAt || undefined}
                isActive={staffCard.isActive}
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
