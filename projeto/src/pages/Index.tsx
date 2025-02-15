
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import OverviewCards from "@/components/OverviewCards";
import ExpenseChart from "@/components/ExpenseChart";
import ExpensePieChart from "@/components/ExpensePieChart";
import ExpenseList from "@/components/ExpenseList";
import InvestmentCard from "@/components/InvestmentCard";
import GoalsProgress from "@/components/GoalsProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-gradient-to-b from-background to-background/80">
      <Sidebar />
      <main className="md:ml-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Bem-vindo de volta, João</h1>
              <p className="text-muted-foreground mt-1">
                Aqui está o panorama das suas finanças hoje.
              </p>
            </div>
            <div className="flex space-x-4">
              <select className="bg-card text-white border-border rounded-lg px-4 py-2">
                <option>Últimos 30 Dias</option>
                <option>Últimos 90 Dias</option>
                <option>Este Ano</option>
              </select>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Gerar Relatório
              </button>
            </div>
          </div>
          <OverviewCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ExpenseChart />
            <ExpensePieChart />
          </div>
          <div className="mt-6">
            <InvestmentCard />
          </div>
          <div className="mt-6">
            <GoalsProgress />
          </div>
          <div className="mt-6">
            <ExpenseList />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Index;
