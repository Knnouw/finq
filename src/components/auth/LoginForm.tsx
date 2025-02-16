
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Mail, Lock } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (error) {
      setError('Email ou senha inválidos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="w-full max-w-md px-8 py-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">FinQ</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-500 mt-2">
            Faça login para acessar sua conta
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                placeholder="Seu email"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                placeholder="Sua senha"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Criar nova conta
            </button>
            <button
              type="button"
              onClick={() => navigate('/reset-password')}
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Esqueceu a senha?
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
