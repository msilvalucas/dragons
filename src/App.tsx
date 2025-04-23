import { BrowserRouter } from 'react-router';

import { AuthProvider } from '@/context/auth/AuthContext';
import { ToastProvider } from './context/toast/ToastContext';

import { Router } from './routes';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
