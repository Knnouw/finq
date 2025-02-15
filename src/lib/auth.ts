import { supabase } from './supabase'
import { type AuthError, type User } from '@supabase/supabase-js'

export type AuthResponse = {
  user: User | null
  error: AuthError | null
}

export const auth = {
  // Registrar novo usuário
  signUp: async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (user) {
      // Criar registro na tabela users
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
        return { user: null, error: profileError };
      }
    }

    return { user, error };
  },

  // Login com email/senha
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user, error };
  },

  // Logout
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Recuperar senha
  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  },

  // Obter usuário atual
  getCurrentUser: async (): Promise<AuthResponse> => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Verificar sessão
  onAuthStateChange: (callback: (user: User | null) => void) => {
    supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  },
};
