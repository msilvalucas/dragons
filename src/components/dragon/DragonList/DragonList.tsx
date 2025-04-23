import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router';

import { dragonService } from '@/services/dragon';
import { DragonInterface } from '@/types/dragon';

import { ConfirmationModal } from '@/components/ui/Modal/Modal';
import { FilterBar } from '@/components/ui/FilterBar';
import { useToast } from '@/hooks/toast/useToast';
import { Loading } from '@/components/ui/Loading';
import { DragonCard } from '@/components/dragon/DragonCard';

import styles from './DragonList.module.css';
import { Button } from '@/components/ui/Button';
import { DynamicIcon } from 'lucide-react/dynamic';

export const DragonList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [dragons, setDragons] = useState<DragonInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ name: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragonToDelete, setDragonToDelete] = useState<string | null>(null);

  const fetchDragons = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await dragonService.getAll();
      data.sort((a, b) =>
        a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' }),
      );
      setDragons(data);
    } catch (error: any) {
      toast('error', error);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const filteredDragons = useMemo(() => {
    return dragons.filter((d) => {
      const matchesName = d.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      return matchesName;
    });
  }, [dragons, filters]);

  const handleView = (dragon: DragonInterface) => {
    navigate(`/dragoes/${dragon.id}`);
  };

  const handleEdit = (dragon: DragonInterface) => {
    navigate(`/dragoes/${dragon.id}/editar`);
  };

  const handleRegister = () => {
    navigate('/dragoes/novo');
  };

  const handleDeleteClick = (id: string) => {
    setDragonToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (dragonToDelete) {
      await dragonService.remove(dragonToDelete);
      setDragons((dragons) =>
        dragons.filter((dragon) => dragon.id !== dragonToDelete),
      );
    }
    setIsModalOpen(false);
    setDragonToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setDragonToDelete(null);
  };

  useEffect(() => {
    fetchDragons();
  }, [fetchDragons]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className={styles.filterContainer}>
        <FilterBar filters={filters} onFilterChange={setFilters} />
        <Button
          size="lg"
          variant="primary"
          icon={<DynamicIcon name="plus" />}
          fullWidth
          onClick={() => handleRegister()}
        >
          Cadastrar Dragão
        </Button>
      </div>
      <div className={styles.listContainer}>
        <DragonCard
          dragons={filteredDragons}
          onDelete={handleDeleteClick}
          onEdit={handleEdit}
          onView={handleView}
        />

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Confirmar Exclusão"
          message="Tem certeza que deseja excluir este dragão?"
          confirmText="Excluir"
          cancelText="Cancelar"
        />
      </div>
    </>
  );
};
