
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const investments = [
  {
    name: "Stock Portfolio",
    value: 15420.50,
    change: 5.2,
    positive: true,
    distribution: [
      { label: "Tech", value: 40 },
      { label: "Finance", value: 30 },
      { label: "Health", value: 30 },
    ]
  },
  {
    name: "Cryptocurrency",
    value: 8320.75,
    change: -2.4,
    positive: false,
    distribution: [
      { label: "BTC", value: 50 },
      { label: "ETH", value: 30 },
      { label: "Others", value: 20 },
    ]
  }
];

export default function InvestmentCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {investments.map((investment, index) => (
        <motion.div
          key={investment.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card p-6 rounded-xl border border-border"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{investment.name}</h3>
              <p className="text-2xl font-bold text-white mt-1">
                ${investment.value.toLocaleString()}
              </p>
            </div>
            <div className={`flex items-center ${
              investment.positive ? "text-emerald-500" : "text-red-500"
            }`}>
              {investment.positive ? (
                <ArrowUpRight className="w-5 h-5" />
              ) : (
                <ArrowDownRight className="w-5 h-5" />
              )}
              <span className="ml-1 font-medium">
                {investment.positive ? "+" : ""}{investment.change}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {investment.distribution.map((item) => (
              <div key={item.label} className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
