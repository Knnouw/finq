import { supabase } from './supabase'
import { type AuthError, type User } from '@supabase/supabase-js'

export type AuthResponse = {
  user: User | null
  error: AuthError | null
}

export const auth = {
  signUp: async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              user_id: user.id,
              email: email,
              full_name: fullName,
            },
          ]);

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          return { user: null, error: { 
            status: 500, 
            message: 'Error creating user profile',
            __isAuthError: true
          } as AuthError };
        }
      }

      return { user, error: authError };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        user: null, 
        error: { 
          status: 500, 
          message: 'An unexpected error occurred',
          __isAuthError: true
        } as AuthError 
      };
    }
  },

  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (user: User | null) => void) => {
    supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  },
};
