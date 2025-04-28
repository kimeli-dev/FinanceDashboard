import { type Transaction } from "@shared/schema";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface TransactionHistoryProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionHistory = ({ transactions, isLoading }: TransactionHistoryProps) => {
  const formatTransactionTime = (date: Date) => {
    return format(new Date(date), "MMM d, yyyy • h:mm a");
  };

  const formatAmount = (amount: string, type: string) => {
    const sign = type === "income" ? "+" : "-";
    return `${sign}$${amount}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <div className="flex space-x-2">
          <button className="text-sm text-gray-500 hover:text-primary transition-colors">
            <i className="fas fa-filter mr-1"></i> Filter
          </button>
          <button className="text-sm text-gray-500 hover:text-primary transition-colors">
            View All
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          // Loading skeletons
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))
        ) : transactions.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            No transactions found
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    transaction.type === "income" 
                      ? "bg-success bg-opacity-10 text-success" 
                      : "bg-danger bg-opacity-10 text-danger"
                  }`}
                >
                  <i className={`fas fa-arrow-${transaction.type === "income" ? "down" : "up"}`}></i>
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {formatTransactionTime(transaction.createdAt)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === "income" ? "text-success" : "text-danger"
                }`}>
                  {formatAmount(transaction.amount, transaction.type)}
                </p>
                <p className="text-xs text-gray-500">{transaction.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
