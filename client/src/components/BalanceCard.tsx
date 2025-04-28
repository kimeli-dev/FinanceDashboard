import { CreditCard, Wallet, ArrowRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  type: "primary" | "savings";
  balance: string;
  cardNumber: string;
  expiryDate: string;
  growth?: string;
}

export default function BalanceCard({ type, balance, cardNumber, expiryDate, growth }: BalanceCardProps) {
  const isPrimary = type === "primary";
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(Number(balance));

  return (
    <Card className={cn(
      "overflow-hidden",
      isPrimary && "bg-gradient-to-r from-primary-700 to-primary-800 text-white"
    )}>
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className={cn(
            "flex-shrink-0 rounded-md p-3",
            isPrimary ? "bg-white bg-opacity-30" : "bg-primary-100"
          )}>
            {isPrimary ? (
              <CreditCard className="h-8 w-8 text-white" />
            ) : (
              <Wallet className="h-8 w-8 text-primary-600" />
            )}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className={cn(
                "text-sm font-medium truncate",
                isPrimary ? "text-white text-opacity-70" : "text-gray-500"
              )}>
                {isPrimary ? "Primary Card Balance" : "Savings Account Balance"}
              </dt>
              <dd>
                <div className={cn(
                  "text-lg font-bold",
                  isPrimary ? "text-white" : "text-gray-900"
                )}>
                  {formattedBalance}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-4">
          {isPrimary ? (
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white text-opacity-70">
                Card ending in {cardNumber}
              </span>
              <span className="text-xs font-medium text-white text-opacity-70">
                Exp: {expiryDate}
              </span>
            </div>
          ) : (
            <div className="flex items-center text-sm">
              {growth && (
                <span className="text-green-500 font-medium flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {growth}% growth
                </span>
              )}
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-500">Last 30 days</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className={cn(
        "px-5 py-3",
        isPrimary ? "bg-white bg-opacity-10" : "bg-gray-50"
      )}>
        <div className="text-sm">
          <a 
            href="#" 
            className={cn(
              "font-medium flex items-center",
              isPrimary 
                ? "text-white text-opacity-80 hover:text-opacity-100" 
                : "text-primary-600 hover:text-primary-500"
            )}
          >
            View {isPrimary ? "card" : "savings"} details
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
