import { CreditCard, CreditCardIcon, ShieldAlert, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  type: "student" | "staff";
  balance: string;
  cardNumber: string;
  expiryDate: string;
  lastUsedAt?: string;
  isActive?: string;
}

export default function BalanceCard({ type, balance, cardNumber, expiryDate, lastUsedAt, isActive }: BalanceCardProps) {
  const isStudent = type === "student";
  const cardActive = isActive === "true";
  const formattedBalance = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(Number(balance));

  return (
    <Card className={cn(
      "overflow-hidden",
      isStudent ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white" : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
    )}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className={cn(
            "flex-shrink-0 rounded-md p-3",
            "bg-white bg-opacity-30"
          )}>
            <CreditCardIcon className="h-8 w-8 text-white" />
          </div>
          <Badge 
            variant={cardActive ? "default" : "destructive"} 
            className={cn(
              "text-xs font-medium ml-auto",
              cardActive ? "bg-green-500" : "bg-red-500"
            )}
          >
            {cardActive ? (
              <span className="flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Active
              </span>
            ) : (
              <span className="flex items-center">
                <ShieldAlert className="h-3 w-3 mr-1" />
                Blocked
              </span>
            )}
          </Badge>
        </div>
        
        <div className="mt-4">
          <dl>
            <dt className="text-sm font-medium truncate text-white text-opacity-70">
              {isStudent ? "Student Meal Card" : "Staff Meal Card"}
            </dt>
            <dd>
              <div className="text-2xl font-bold text-white">
                {formattedBalance}
              </div>
            </dd>
          </dl>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white text-opacity-70">
              Card ending in {cardNumber}
            </span>
            <span className="text-xs font-medium text-white text-opacity-70">
              Exp: {expiryDate}
            </span>
          </div>
        </div>

        {lastUsedAt && (
          <div className="mt-3 pt-3 border-t border-white border-opacity-20">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1 text-white text-opacity-70" />
              <span className="text-white text-opacity-90">
                Last used at: <span className="font-semibold">{lastUsedAt}</span>
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-5 py-3 bg-white bg-opacity-10">
        <div className="text-sm w-full flex justify-between">
          <a 
            href="#" 
            className="font-medium flex items-center text-white text-opacity-80 hover:text-opacity-100"
          >
            View card details
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
          <a 
            href="#" 
            className="font-medium flex items-center text-white text-opacity-80 hover:text-opacity-100"
          >
            {cardActive ? "Block card" : "Unblock card"}
            <ShieldAlert className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
