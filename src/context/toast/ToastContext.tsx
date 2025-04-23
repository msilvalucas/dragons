import { createContext, useCallback, useState } from 'react';

import { Toast } from '@/components/ui/Toast';

export interface ToastInterface {
  id: number;
  type: 'success' | 'warning' | 'error';
  message: string;
}

interface ToastContextType {
  toast: (type: ToastInterface['type'], message: string) => void;
}

export const ToastContext = createContext({} as ToastContextType);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastInterface[]>([]);

  const toast = useCallback((type: ToastInterface['type'], message: string) => {
    const newToast = { id: Date.now(), type, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toast toasts={toasts} />
    </ToastContext.Provider>
  );
}
