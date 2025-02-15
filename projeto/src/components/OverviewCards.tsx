
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Saldo Total",
    amount: "R$ 24.563,00",
    change: "+14,32%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Despesas Mensais",
    amount: "R$ 3.242,00",
    change: "-2,45%",
    positive: false,
    icon: TrendingDown,
  },
  {
    title: "Investimentos",
    amount: "R$ 12.875,00",
    change: "+8,67%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Contas Pendentes",
    amount: "R$ 1.890,00",
    change: "Vence em 5 dias",
    positive: null,
    icon: Clock,
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">{card.title}</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{card.amount}</h3>
            </div>
            <div
              className={`p-3 rounded-xl backdrop-blur-sm ${
                card.positive === null
                  ? "bg-gray-800/50 text-gray-400"
                  : card.positive
                  ? "bg-emerald-900/20 text-emerald-500"
                  : "bg-red-900/20 text-red-500"
              }`}
            >
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <div
            className={`mt-4 text-sm font-medium ${
              card.positive === null
                ? "text-gray-400"
                : card.positive
                ? "text-emerald-500"
                : "text-red-500"
            }`}
          >
            {card.change}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
