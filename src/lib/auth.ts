
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
          const error: AuthError = {
            name: 'ProfileCreationError',
            message: 'Error creating user profile',
            status: 500,
            code: 'PROFILE_CREATION_ERROR',
            __isAuthError: true
          };
          return { user: null, error };
        }
      }

      return { user, error: authError };
    } catch (error) {
      console.error('Signup error:', error);
      const authError: AuthError = {
        name: 'UnexpectedError',
        message: 'An unexpected error occurred',
        status: 500,
        code: 'UNEXPECTED_ERROR',
        __isAuthError: true
      };
      return { user: null, error: authError };
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
