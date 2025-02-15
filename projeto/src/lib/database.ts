import { supabase } from './supabase'
import { Database } from './supabase'

type Tables = Database['public']['Tables']
type Transaction = Tables['transactions']['Row']
type Category = Tables['categories']['Row']

export const db = {
  // Transações
  transactions: {
    // Listar transações do usuário
    list: async (userId: string, filters?: {
      startDate?: Date
      endDate?: Date
      categoryId?: number
      type?: 'income' | 'expense'
    }) => {
      let query = supabase
        .from('transactions')
        .select('*, categories(*)')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      if (filters?.startDate) {
        query = query.gte('date', filters.startDate.toISOString())
      }
      if (filters?.endDate) {
        query = query.lte('date', filters.endDate.toISOString())
      }
      if (filters?.categoryId) {
        query = query.eq('category_id', filters.categoryId)
      }
      if (filters?.type) {
        query = query.eq('type', filters.type)
      }

      const { data, error } = await query
      return { data, error }
    },

    // Adicionar transação
    add: async (transaction: Omit<Transaction, 'transaction_id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()
      return { data, error }
    },

    // Atualizar transação
    update: async (transactionId: number, updates: Partial<Transaction>) => {
      const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('transaction_id', transactionId)
        .select()
      return { data, error }
    },

    // Deletar transação
    delete: async (transactionId: number) => {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('transaction_id', transactionId)
      return { error }
    }
  },

  // Categorias
  categories: {
    // Listar categorias do usuário
    list: async (userId: string) => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userId)
        .order('name')
      return { data, error }
    },

    // Adicionar categoria
    add: async (category: Omit<Category, 'category_id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
      return { data, error }
    },

    // Atualizar categoria
    update: async (categoryId: number, updates: Partial<Category>) => {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('category_id', categoryId)
        .select()
      return { data, error }
    },

    // Deletar categoria
    delete: async (categoryId: number) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('category_id', categoryId)
      return { error }
    }
  },

  // Relatórios
  reports: {
    // Resumo mensal
    getMonthlySummary: async (userId: string, year: number, month: number) => {
      const startDate = new Date(year, month - 1, 1).toISOString()
      const endDate = new Date(year, month, 0).toISOString()

      const { data, error } = await supabase
        .rpc('get_monthly_summary', {
          p_user_id: userId,
          p_start_date: startDate,
          p_end_date: endDate
        })
      return { data, error }
    },

    // Gastos por categoria
    getSpendingByCategory: async (userId: string, startDate: Date, endDate: Date) => {
      const { data, error } = await supabase
        .rpc('get_spending_by_category', {
          p_user_id: userId,
          p_start_date: startDate.toISOString(),
          p_end_date: endDate.toISOString()
        })
      return { data, error }
    }
  }
}
