import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { dragonService } from '@/services/dragon';
import { DragonInterface } from '@/types/dragon';

import { DragonCard } from '../DragonCard';

import styles from './DragonList.module.css';

export const DragonList = () => {
  const [dragons, setDragons] = useState<DragonInterface[]>([]);

  const navigate = useNavigate();

  const fetchDragons = async () => {
    const data = await dragonService.getAll();
    setDragons(data);
  };

  const handleEdit = (dragon: DragonInterface) => {
    // lógica para editar
    console.log('Editando dragão:', dragon);
  };

  const handleView = (dragon: DragonInterface) => {
    navigate(`/dragons/${dragon.id}`, { state: { dragon } });
  };

  const handleDelete = async (id: string) => {
    try {
      await dragonService.remove(id);

      fetchDragons();
    } catch (error) {
      console.error('Erro ao remover dragão:', error);
    }
    console.log('Deletando dragão com id:', id);
  };

  useEffect(() => {
    fetchDragons();
  }, []);

  return (
    <div className={styles.listContainer}>
      <DragonCard
        dragons={dragons}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />
    </div>
  );
};
