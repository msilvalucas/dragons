// src/pages/RegisterDragon/RegisterDragon.tsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router'; // troque o import
import { DragonInterface } from '@/types/dragon';
import { dragonService } from '@/services/dragon';
import { DragonForm } from '@/components/dragon/DragonForm';
import { useToast } from '@/hooks/toast/useToast';
import { Typography } from '@/components/ui/Typography';
import { Loading } from '@/components/ui/Loading';
import { Header } from '@/components/ui/Header/Header';
import { Button } from '@/components/ui/Button';
import { DynamicIcon } from 'lucide-react/dynamic';

import styles from './RegisterDragon.module.css';

export default function RegisterDragon() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { toast } = useToast();

  const isEditing = Boolean(id);

  const [initialValues, setInitialValues] = useState<DragonInterface | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(isEditing); // carrega só quando editar

  useEffect(() => {
    if (isEditing && id) {
      dragonService
        .getById(id)
        .then((data) => setInitialValues(data))
        .catch(() => toast('error', 'Erro ao carregar dragão'))
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditing, toast]);

  const handleSubmit = useCallback(
    async (data: DragonInterface) => {
      try {
        if (isEditing && id) {
          await dragonService.update(id, data);
          toast('success', 'Dragão atualizado!');
        } else {
          await dragonService.create(data);
          toast('success', 'Dragão criado com sucesso!');
        }
        navigate('/');
      } catch (err) {
        toast('error', 'Erro ao salvar dragão');
        console.error(err);
      }
    },
    [isEditing, id, navigate, toast],
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />

      <div className={styles.container}>
        <Button
          size="lg"
          variant="secondary"
          icon={<DynamicIcon name="arrow-left-to-line" />}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
        <Typography as="h1" variant="title" align="center" className="title">
          {isEditing ? 'Editar Dragão' : 'Cadastrar Novo Dragão'}
        </Typography>
      </div>

      <DragonForm
        initialValues={initialValues ?? undefined}
        onSubmit={handleSubmit}
      />
    </>
  );
}
