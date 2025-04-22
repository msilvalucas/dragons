import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/hooks/auth/useAuth';

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
  const { signedIn } = useAuth();

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
