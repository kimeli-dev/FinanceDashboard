import { BarChart3, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetCardProps {
  spent: string;
  total: string;
}

export default function BudgetCard({ spent, total }: BudgetCardProps) {
  const spentNum = parseFloat(spent);
  const totalNum = parseFloat(total);
  const percentageSpent = Math.round((spentNum / totalNum) * 100);
  const percentageRemaining = 100 - percentageSpent;

  const formattedSpent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(spentNum);

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(totalNum);

  return (
    <Card className="bg-white overflow-hidden shadow rounded-lg">
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
            <BarChart3 className="h-8 w-8 text-primary-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Monthly Budget
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
            <Progress value={percentageSpent} className="h-2 bg-primary-100" />
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-gray-500">{percentageSpent}% spent</span>
              <span className="text-gray-500">{percentageRemaining}% remaining</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500 flex items-center">
            View budget details
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
