import { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [cardStatus, setCardStatus] = useState<string>(isActive || "true");
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [isUnblockDialogOpen, setIsUnblockDialogOpen] = useState(false);
  const [password, setPassword] = useState("");

  const isStudent = type === "student";
  const cardActive = cardStatus === "true";
  
  const formattedBalance = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(Number(balance));

  const handleBlockCard = () => {
    setCardStatus("false");
    setIsBlockDialogOpen(false);
    setPassword("");
  };

  const handleUnblockCard = () => {
    setCardStatus("true");
    setIsUnblockDialogOpen(false);
    setPassword("");
  };

  return (
    <>
      <Card className={cn(
        "overflow-hidden dark:border-gray-700",
        cardActive 
          ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white dark:from-primary-700 dark:to-primary-800" 
          : "bg-gradient-to-r from-gray-600 to-gray-700 text-white dark:from-gray-700 dark:to-gray-800"
      )}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className={cn(
              "flex-shrink-0 rounded-md p-3",
              "bg-white bg-opacity-30"
            )}>
              {/* Credit card icon would go here */}
            </div>
            <Badge 
              variant={cardActive ? "default" : "destructive"} 
              className={cn(
                "text-xs font-medium ml-auto",
                cardActive ? "bg-green-500" : "bg-red-500"
              )}
            >
              {cardActive ? "Active" : "Blocked"}
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
                Card ending in {cardNumber.slice(-4)}
              </span>
              <span className="text-xs font-medium text-white text-opacity-70">
                Exp: {expiryDate}
              </span>
            </div>
          </div>

          {lastUsedAt && (
            <div className="mt-3 pt-3 border-t border-white border-opacity-20">
              <div className="flex items-center text-sm">
                <span className="text-white text-opacity-90">
                  Last used at: <span className="font-semibold">{lastUsedAt}</span>
                </span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="px-5 py-3 bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20">
          <div className="text-sm w-full flex justify-between">
            <Button 
              variant="ghost" 
              className="text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 p-0"
            >
              View card details
            </Button>
            
            {cardActive ? (
              <Button 
                variant="destructive"
                onClick={() => setIsBlockDialogOpen(true)}
              >
                Block card
              </Button>
            ) : (
              <Button 
                variant="default"
                onClick={() => setIsUnblockDialogOpen(true)}
              >
                Unblock card
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isUnblockDialogOpen} onOpenChange={setIsUnblockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <Unlock className="h-5 w-5 mr-2" />
              Unblock Card
            </DialogTitle>
            <DialogDescription>
              Please confirm your password to unblock your cafeteria card.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unblock-password">Password</Label>
                <Input 
                  id="unblock-password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUnblockDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleUnblockCard}
              disabled={!password}
            >
              Unblock Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}