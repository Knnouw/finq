
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  TrendingUp,
  PiggyBank,
  Target,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "expenses",
    label: "Expenses",
    icon: CreditCard,
  },
  {
    id: "investments",
    label: "Investments",
    icon: TrendingUp,
  },
  {
    id: "savings",
    label: "Savings",
    icon: PiggyBank,
  },
  {
    id: "goals",
    label: "Goals",
    icon: Target,
  },
];

export default function Sidebar() {
  const [selected, setSelected] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 p-2 bg-card rounded-lg shadow-lg md:hidden z-50"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 bg-background shadow-lg md:hidden z-40"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-2 text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col p-8 pt-20">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelected(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                    selected === item.id
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex h-screen w-64 border-r border-border bg-card flex-col fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">SpendSage</h1>
        </div>
        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                selected === item.id
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div>
              <p className="font-medium text-white">John Doe</p>
              <p className="text-sm text-gray-400">Premium User</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
