
import { motion } from "framer-motion";
import { CreditCard, ShoppingBag, Coffee, Home } from "lucide-react";

const expenses = [
  {
    id: 1,
    title: "Supermercado",
    amount: -85.32,
    date: "Hoje",
    icon: ShoppingBag,
    category: "Alimentação",
  },
  {
    id: 2,
    title: "Netflix",
    amount: -15.99,
    date: "Ontem",
    icon: CreditCard,
    category: "Entretenimento",
  },
  {
    id: 3,
    title: "Cafeteria",
    amount: -4.50,
    date: "Ontem",
    icon: Coffee,
    category: "Alimentação",
  },
  {
    id: 4,
    title: "Aluguel",
    amount: -1200.00,
    date: "Há 3 dias",
    icon: Home,
    category: "Moradia",
  },
];

export default function ExpenseList() {
  return (
    <div className="bg-card p-6 rounded-xl border border-border backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4 text-white">Transações Recentes</h3>
      <div className="space-y-4">
        {expenses.map((expense, index) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted to-muted/50 hover:from-muted/80 hover:to-muted/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-card">
                <expense.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">{expense.title}</p>
                <p className="text-sm text-gray-400">{expense.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-500">
                R$ {expense.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">{expense.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
