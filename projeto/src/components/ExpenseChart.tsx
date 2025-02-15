
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", expenses: 2400, income: 4000 },
  { month: "Fev", expenses: 1398, income: 3000 },
  { month: "Mar", expenses: 9800, income: 2000 },
  { month: "Abr", expenses: 3908, income: 2780 },
  { month: "Mai", expenses: 4800, income: 1890 },
  { month: "Jun", expenses: 3800, income: 2390 },
];

export default function ExpenseChart() {
  return (
    <div className="h-[400px] w-full bg-gradient-to-br from-card to-card/50 p-6 rounded-xl border border-border backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4 text-white">Visão Mensal</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value) => [`R$ ${value}`, undefined]}
          />
          <Legend 
            formatter={(value) => (value === 'expenses' ? 'Despesas' : 'Receita')}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Despesas"
            stroke="#EF4444"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="income"
            name="Receita"
            stroke="#10B981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
