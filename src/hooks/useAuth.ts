
import { create } from 'zustand'
import { auth } from '@/lib/auth'
import type { User } from '@supabase/supabase-js'

type AuthStore = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { user, error } = await auth.signIn(email, password)
      if (error) throw error
      set({ user })
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    try {
      const { user, error } = await auth.signUp(email, password, fullName)
      if (error) throw error
      set({ user })
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  },

  signOut: async () => {
    try {
      const { error } = await auth.signOut()
      if (error) throw error
      set({ user: null })
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  },

  resetPassword: async (email: string) => {
    try {
      const { error } = await auth.resetPassword(email)
      if (error) throw error
    } catch (error) {
      console.error('Error resetting password:', error)
      throw error
    }
  },
}))

// Initialize auth state
auth.getCurrentUser().then(({ user }) => {
  useAuth.setState({ user, isLoading: false })
})

// Listen for auth changes
auth.onAuthStateChange((user) => {
  useAuth.setState({ user, isLoading: false })
})
