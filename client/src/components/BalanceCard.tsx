
import { useState } from "react";
import { Lock, Unlock, CreditCard, Eye, EyeOff } from "lucide-react";
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
  const [balanceVisible, setBalanceVisible] = useState(true);

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
        "relative overflow-hidden border-0 shadow-xl",
        "backdrop-blur-md bg-gradient-to-br",
        cardActive 
          ? "from-blue-600/90 via-purple-600/90 to-indigo-700/90" 
          : "from-gray-600/90 via-gray-700/90 to-gray-800/90",
        "before:absolute before:inset-0 before:bg-white/10 before:backdrop-blur-sm",
        "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent"
      )}>
        <CardContent className="relative z-10 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  {isStudent ? "Student Meal Card" : "Staff Meal Card"}
                </p>
                <Badge 
                  variant={cardActive ? "default" : "destructive"} 
                  className={cn(
                    "text-xs font-medium mt-1",
                    cardActive 
                      ? "bg-green-500/80 hover:bg-green-500/90 backdrop-blur-sm" 
                      : "bg-red-500/80 hover:bg-red-500/90 backdrop-blur-sm"
                  )}
                >
                  {cardActive ? "Active" : "Blocked"}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/70 text-sm">Available Balance</p>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                {balanceVisible ? (
                  <EyeOff className="h-4 w-4 text-white/70" />
                ) : (
                  <Eye className="h-4 w-4 text-white/70" />
                )}
              </button>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight">
              {balanceVisible ? formattedBalance : "••••••"}
            </p>
          </div>

          <div className="flex items-center justify-between text-white/80 text-sm">
            <div>
              <p className="text-xs text-white/60">Card Number</p>
              <p className="font-mono">•••• •••• •••• {cardNumber.slice(-4)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">Expires</p>
              <p className="font-mono">{expiryDate}</p>
            </div>
          </div>

          {lastUsedAt && (
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-sm text-white/80">
                <span className="text-white/60">Last used at:</span> 
                <span className="font-medium ml-1">{lastUsedAt}</span>
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="relative z-10 px-8 py-4 bg-black/20 backdrop-blur-sm">
          <div className="flex justify-between items-center w-full">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/10 p-0 h-auto"
            >
              View Details
            </Button>
            
            {cardActive ? (
              <Button 
                variant="destructive"
                onClick={() => setIsBlockDialogOpen(true)}
                className="bg-red-500/80 hover:bg-red-500/90 backdrop-blur-sm"
              >
                <Lock className="h-4 w-4 mr-2" />
                Block Card
              </Button>
            ) : (
              <Button 
                variant="default"
                onClick={() => setIsUnblockDialogOpen(true)}
                className="bg-green-500/80 hover:bg-green-500/90 backdrop-blur-sm"
              >
                <Unlock className="h-4 w-4 mr-2" />
                Unblock Card
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
