import React from 'react';

import { Input } from '../Input';

import styles from './FilterBar.module.css';

interface FilterBarProps {
  filters: { name: string };
  onFilterChange: (newFilters: { name: string }) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, name: e.target.value });
  };

  return (
    <div className={styles.filterBar}>
      <Input
        type="text"
        placeholder="Buscar por nome..."
        value={filters.name}
        onChange={handleNameChange}
        className={styles.input}
      />
    </div>
  );
}
