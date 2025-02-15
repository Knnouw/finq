import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: number
          email: string
          full_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          email: string
          full_name: string
          password_hash: string
        }
        Update: {
          email?: string
          full_name?: string
          password_hash?: string
        }
      }
      transactions: {
        Row: {
          transaction_id: number
          user_id: number
          category_id: number
          amount: number
          type: string
          description: string
          date: string
          payment_method: string
          receipt_image_url?: string
          recurring: boolean
          notification_enabled: boolean
        }
        Insert: {
          user_id: number
          category_id: number
          amount: number
          type: string
          description: string
          date: string
          payment_method: string
          receipt_image_url?: string
          recurring?: boolean
          notification_enabled?: boolean
        }
        Update: {
          amount?: number
          type?: string
          description?: string
          date?: string
          payment_method?: string
          receipt_image_url?: string
          recurring?: boolean
          notification_enabled?: boolean
        }
      }
      // Adicione mais tipos conforme necessário
    }
  }
}
