import { ToastInterface } from '@/context/toast/ToastContext';

import styles from './Toast.module.css';

interface ToastProps {
  toasts: ToastInterface[];
}

export function Toast({ toasts }: ToastProps) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
