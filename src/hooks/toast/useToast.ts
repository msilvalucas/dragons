import { useContext } from 'react';

import { ToastContext } from '@/context/toast/ToastContext';

export function useToast() {
  return useContext(ToastContext);
}
