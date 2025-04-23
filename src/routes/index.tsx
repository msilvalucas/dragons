import { Route, Routes } from 'react-router';

import { Home } from '@/pages/Home';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';

import { NotFound } from '@/pages/NotFound';

import { AuthGuard } from './AuthGuard';
import RegisterDragon from '@/pages/RegisterDragon/RegisterDragon';
import DetailsDragon from '@/pages/DatailsDragon/DetailsDragon';

export function Router() {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate />}>
        <Route path="/" element={<Home />} />
        <Route path="/dragoes/:id" element={<DetailsDragon />} />
        <Route path="/dragoes/novo" element={<RegisterDragon />} />
        <Route path="/dragoes/:id/editar" element={<RegisterDragon />} />
      </Route>

      <Route element={<AuthGuard isPrivate={false} />}>
        <Route path="/login" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
