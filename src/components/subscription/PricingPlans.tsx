
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

interface Plan {
  plan_id: number
  name: string
  period: string
  price: number
  description: string
  features: { features: string[] }
}

export function PricingPlans() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPlans() {
      try {
        const { data, error } = await supabase
          .from('subscription_plans')
          .select('*')
          .order('price')

        if (error) throw error
        setPlans(data)
      } catch (e) {
        setError('Erro ao carregar os planos. Por favor, tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    loadPlans()
  }, [])

  const handleSubscribe = async (planId: number) => {
    if (!user) {
      navigate('/login')
      return
    }

    // Aqui implementaremos a integração com o gateway de pagamento
    console.log('Subscribed to plan:', planId)
  }

  if (loading) {
    return <div>Carregando planos...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Planos e Preços
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Escolha o plano que melhor se adequa às suas necessidades
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.plan_id} className="divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">{plan.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    R$ {plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{plan.period === 'monthly' ? 'mês' : plan.period === 'semiannual' ? 'semestre' : 'ano'}
                  </span>
                </p>
                <Button
                  className="mt-8 w-full"
                  onClick={() => handleSubscribe(plan.plan_id)}
                >
                  Assinar {plan.name}
                </Button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-xs font-semibold text-gray-900 tracking-wide uppercase">
                  O que está incluído
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

