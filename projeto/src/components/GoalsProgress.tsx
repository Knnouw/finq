
import { motion } from "framer-motion";
import { Target, Car, Home, Plane } from "lucide-react";

const goals = [
  {
    id: 1,
    title: "New Car",
    icon: Car,
    target: 35000,
    current: 15000,
    date: "Dec 2024",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "House Down Payment",
    icon: Home,
    target: 100000,
    current: 65000,
    date: "Jun 2025",
    color: "bg-purple-500"
  },
  {
    id: 3,
    title: "Vacation",
    icon: Plane,
    target: 8000,
    current: 6200,
    date: "Aug 2024",
    color: "bg-emerald-500"
  }
];

export default function GoalsProgress() {
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Financial Goals</h3>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
          Add New Goal
        </button>
      </div>
      <div className="space-y-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-muted p-4 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${goal.color}/20`}>
                  <goal.icon className={`w-5 h-5 ${goal.color} text-white`} />
                </div>
                <div>
                  <h4 className="text-white font-medium">{goal.title}</h4>
                  <p className="text-sm text-gray-400">Target: ${goal.target.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  ${goal.current.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">Due {goal.date}</p>
              </div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={`h-full ${goal.color}`}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-400">
                {((goal.current / goal.target) * 100).toFixed(1)}% Complete
              </span>
              <span className="text-gray-400">
                ${(goal.target - goal.current).toLocaleString()} remaining
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
