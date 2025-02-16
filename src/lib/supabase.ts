
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: string
          email: string
          full_name: string
          created_at: string
          updated_at: string
          subscription_status: string | null
          subscription_end_date: string | null
        }
        Insert: {
          email: string
          full_name: string
          user_id: string
        }
        Update: {
          email?: string
          full_name?: string
          subscription_status?: string
          subscription_end_date?: string
        }
      }
      categories: {
        Row: {
          category_id: number
          user_id: string
          name: string
          created_at: string
        }
        Insert: {
          user_id: string
          name: string
        }
        Update: {
          name?: string
        }
      }
      transactions: {
        Row: {
          transaction_id: number
          user_id: string
          category_id: number
          amount: number
          type: 'income' | 'expense'
          description: string
          date: string
          payment_method: string
          receipt_image_url?: string
          recurring: boolean
          notification_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          category_id: number
          amount: number
          type: 'income' | 'expense'
          description: string
          date: string
          payment_method: string
          receipt_image_url?: string
          recurring?: boolean
          notification_enabled?: boolean
        }
        Update: {
          amount?: number
          type?: 'income' | 'expense'
          description?: string
          date?: string
          payment_method?: string
          receipt_image_url?: string
          recurring?: boolean
          notification_enabled?: boolean
        }
      }
    }
  }
}
