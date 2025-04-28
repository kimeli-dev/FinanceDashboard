import { useState } from "react";
import { CreditCard, CreditCardIcon, ShieldAlert, CheckCircle2, ArrowRight, MapPin, Lock, Unlock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
        <CardFooter className="px-5 py-3 bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20">
          <div className="text-sm w-full flex justify-between">
            <Button 
              variant="ghost" 
              className="text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 p-0"
            >
              <span className="flex items-center">
                View card details
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Button>
            
            {cardActive ? (
              <Button 
                variant="ghost" 
                className="text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 p-0"
                onClick={() => setIsBlockDialogOpen(true)}
              >
                <span className="flex items-center">
                  Block card
                  <Lock className="ml-1 h-4 w-4" />
                </span>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className="text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 p-0"
                onClick={() => setIsUnblockDialogOpen(true)}
              >
                <span className="flex items-center">
                  Unblock card
                  <Unlock className="ml-1 h-4 w-4" />
                </span>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Block Card Dialog */}
      <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <Lock className="h-5 w-5 mr-2" />
              Block Card
            </DialogTitle>
            <DialogDescription>
              Please confirm your password to block your cafeteria card. This will prevent any unauthorized use if your card is lost or stolen.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBlockDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleBlockCard}
              disabled={!password}
            >
              Block Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unblock Card Dialog */}
      <Dialog open={isUnblockDialogOpen} onOpenChange={setIsUnblockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <Unlock className="h-5 w-5 mr-2" />
              Unblock Card
            </DialogTitle>
            <DialogDescription>
              Please confirm your password to unblock your cafeteria card. This will reactivate your card for payments.
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUnblockDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700"
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
