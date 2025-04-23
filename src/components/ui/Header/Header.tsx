import { useContext } from 'react';

import { useNavigate, Link } from 'react-router';

import { AuthContext } from '@/context/auth/AuthContext';

import { Button } from '@/components/ui/Button';

import styles from './Header.module.css';
import { DynamicIcon } from 'lucide-react/dynamic';

export function Header() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/sign-in');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          DB<span className={styles.logoAccent}>Dragons</span>
        </Link>

        <Button
          variant="secondary"
          size="lg"
          onClick={handleLogout}
          aria-label="Sair do sistema"
          icon={<DynamicIcon name="log-out" />}
          iconPosition="right"
        >
          Sair
        </Button>
      </div>
    </header>
  );
}
