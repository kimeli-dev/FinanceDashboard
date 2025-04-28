import { UtensilsCrossed, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BudgetCardProps {
  spent: string;
  total: string;
}

export default function BudgetCard({ spent, total }: BudgetCardProps) {
  const spentNum = parseFloat(spent);
  const totalNum = parseFloat(total);
  const percentageSpent = Math.round((spentNum / totalNum) * 100);
  const percentageRemaining = 100 - percentageSpent;

  const formattedSpent = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(spentNum);

  const formattedTotal = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(totalNum);
  
  // Calculate days left in month
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysLeft = lastDay.getDate() - today.getDate();

  return (
    <Card className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-amber-500">
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
            <UtensilsCrossed className="h-8 w-8 text-amber-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
                Monthly Meal Budget
                <Badge 
                  variant="outline" 
                  className="ml-2 px-2 py-0 text-xs bg-amber-50 text-amber-700 border-amber-200"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {daysLeft} days left
                </Badge>
              </dt>
              <dd>
                <div className="text-lg font-bold text-gray-900">
                  {formattedSpent} <span className="text-sm text-gray-500 font-normal">of {formattedTotal}</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative pt-1">
            <Progress 
              value={percentageSpent} 
              className="h-2 bg-amber-100" 
              // Apply different colors based on percentage
              style={{
                backgroundColor: percentageSpent > 80 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                '--progress-color': percentageSpent > 80 ? 'rgb(239, 68, 68)' : 'rgb(251, 191, 36)'
              } as React.CSSProperties}
            />
            <div className="flex items-center justify-between text-xs mt-1">
              <span className={percentageSpent > 80 ? "text-red-600 font-medium" : "text-gray-500"}>
                {percentageSpent}% spent
              </span>
              <span className="text-gray-500">{percentageRemaining}% remaining</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-amber-50 px-5 py-3">
        <div className="text-sm">
          <a href="#" className="font-medium text-amber-700 hover:text-amber-800 flex items-center">
            View budget details
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
