
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SimpleChartProps {
  spent: number;
  remaining: number;
}

export default function SimpleChart({ spent, remaining }: SimpleChartProps) {
  const data = [
    { name: 'Spent', value: spent, color: '#ef4444' },
    { name: 'Remaining', value: remaining, color: '#10b981' }
  ];

  const total = spent + remaining;
  const spentPercentage = total > 0 ? Math.round((spent / total) * 100) : 0;

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={30}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-sm">
        <p className="text-white font-medium">{spentPercentage}% spent</p>
        <p className="text-gray-400 text-xs">of monthly budget</p>
      </div>
    </div>
  );
}
