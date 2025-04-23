// src/pages/DragonDetails/DragonDetails.tsx
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import { dragonService } from '@/services/dragon';
import { DragonInterface } from '@/types/dragon';

import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/hooks/toast/useToast';
import { Typography } from '@/components/ui/Typography';
import { Header } from '@/components/ui/Header/Header';
import { Button } from '@/components/ui/Button';

import styles from './DetailsDragon.module.css';

import DEFAULT_IMAGE from '@/assets/dragon-defaul.jpg';
import { formatDateBR } from '@/utils/date';

export default function DragonDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [dragon, setDragon] = useState<DragonInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDragon = useCallback(async () => {
    try {
      const data = await dragonService.getById(id as string);
      setDragon(data);
    } catch (error) {
      toast('error', 'Erro ao buscar dragão');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    fetchDragon();
  }, [fetchDragon]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  if (!dragon) {
    return (
      <div className={styles.center}>
        <Typography as="h2">Dragão não encontrado.</Typography>
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className={styles.wrapper}>
        <ul className={styles.list}>
          <li>
            <img src={dragon.imageUrl || DEFAULT_IMAGE} alt={dragon.name} />
          </li>

          <li>
            <strong>Nome do dragão:</strong> {dragon.name}
          </li>
          <li>
            <strong>Tipo:</strong> {dragon.type}
          </li>
          <li>
            <strong>Data de criação:</strong> {formatDateBR(dragon.createdAt)}
          </li>

          <div className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate(`/dragoes/${dragon.id}/editar`)}
            >
              Editar
            </Button>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
          </div>
        </ul>
      </section>
    </>
  );
}
