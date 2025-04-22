import { DynamicIcon } from 'lucide-react/dynamic';

import { DragonInterface } from '@/types/dragon';

import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';

import styles from './DragonCard.module.css';

import DEFAULT_IMAGE from '@/assets/dragon-defaul.jpg';

interface DragonCardProps {
  dragons: DragonInterface[];
  onDelete: (id: string) => void;
  onEdit: (dragon: DragonInterface) => void;
  onView: (dragon: DragonInterface) => void;
}

export function DragonCard({
  dragons,
  onDelete,
  onEdit,
  onView,
}: DragonCardProps) {
  return (
    <>
      {dragons.map((dragon) => (
        <div key={dragon.id} className={styles.card}>
          <img
            src={dragon.imageUrl || DEFAULT_IMAGE}
            alt={dragon.name}
            className={styles.image}
          />

          <div className={styles.info}>
            <Typography color="secondary" variant="subtitle" margin="sm">
              {dragon.name}
            </Typography>

            <Typography as="p" color="light" margin="lg">
              <Typography as="strong" weight="bold" color="secondary">
                Tipo:
              </Typography>{' '}
              {dragon.type}
            </Typography>

            <div className={styles.actions}>
              <Button
                variant="secondary"
                size="lg"
                icon={<DynamicIcon name="eye" />}
                onClick={() => onView(dragon)}
              />

              <Button
                variant="warning"
                size="lg"
                icon={<DynamicIcon name="pencil" />}
                onClick={() => onEdit(dragon)}
              />
              <Button
                variant="danger"
                size="lg"
                icon={<DynamicIcon name="trash" />}
                onClick={() => onDelete(dragon.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
