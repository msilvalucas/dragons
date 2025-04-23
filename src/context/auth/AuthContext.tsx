import { createContext, useCallback, useEffect, useState } from 'react';

import { useToast } from '@/hooks/toast/useToast';
interface AuthContextValue {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<string | void>;
  signUp(email: string, password: string): Promise<string | void>;
  signOut(): void;
}
interface UserInterface {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token) {
      setSignedIn(true);
    }
  }, []);

  const getUserByEmail = (email: string) => {
    const users = JSON.parse(localStorage.getItem('users_bd') || '[]');
    return users.find((user: UserInterface) => user.email === email);
  };

  const signIn = useCallback(
    async (email: string, password: string) => {
      const user = getUserByEmail(email);

      if (!user) return toast('error', 'Usuário não encontrado');

      if (user.password !== password)
        return toast('error', 'E-mail ou senha incorretos');

      const token = Math.random().toString(36).substring(2);
      localStorage.setItem('user_token', JSON.stringify({ email, token }));
      toast('success', 'Usuário logado!');
      setSignedIn(true);
    },
    [toast],
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      const users = JSON.parse(localStorage.getItem('users_bd') || '[]');

      const existingUser = users.find(
        (user: UserInterface) => user.email === email,
      );

      if (existingUser) return toast('warning', 'E-mail já cadastrados');

      const updatedUsers = [...users, { email, password }];
      localStorage.setItem('users_bd', JSON.stringify(updatedUsers));

      const token = Math.random().toString(36).substring(2);
      localStorage.setItem('user_token', JSON.stringify({ email, token }));
      toast('success', 'Seja bem-vido ao DBDragons');
      setSignedIn(true);
    },
    [toast],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('user_token');
    setSignedIn(false);
  }, []);

  const value: AuthContextValue = {
    signedIn,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
