import { Link } from 'react-router';

import styles from './NotFound.module.css';
import { Typography } from '@/components/ui/Typography';

export function NotFound() {
  return (
    <div className={styles.container}>
      <Typography as="h1" className={styles.title}>
        404
      </Typography>
      <Typography as="p" className={styles.subtitle}>
        Ops! A página que você procura não existe.
      </Typography>
      <Link to="/" className={styles.homeButton}>
        Voltar para a Home
      </Link>
    </div>
  );
}
