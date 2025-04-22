import { BrowserRouter } from 'react-router';

import { AuthProvider } from './context/auth/AuthContext';

import { Router } from './routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
