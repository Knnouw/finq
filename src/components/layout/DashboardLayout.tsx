import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  Receipt,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      title: 'Gastos',
      icon: Wallet,
      path: '/expenses',
    },
    {
      title: 'Investimentos',
      icon: PiggyBank,
      path: '/investments',
    },
    {
      title: 'Parcelamentos',
      icon: Receipt,
      path: '/installments',
    },
    {
      title: 'Configurações',
      icon: Settings,
      path: '/settings',
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-width duration-300 bg-white border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} text-xl font-bold`}>
              FinQ
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100"
                  >
                    <item.icon size={24} className="text-gray-500" />
                    {isSidebarOpen && (
                      <span className="ml-3 text-gray-700">{item.title}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => signOut()}
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100"
            >
              <LogOut size={24} className="text-gray-500" />
              {isSidebarOpen && <span className="ml-3 text-gray-700">Sair</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
