import styles from './Loading.module.css';

export function Loading() {
  return <div className={styles.spinner} aria-label="Carregando" />;
}
