import { api } from '@/services/api';

import { DragonInterface } from '@/types/dragon';

const pathUrl = '/v1/dragon';

const getAll = async (): Promise<DragonInterface[]> => {
  const response = await api.get<DragonInterface[]>(`${pathUrl}`);
  return response.data;
};

const getById = async (id: string): Promise<DragonInterface> => {
  const response = await api.get<DragonInterface>(`${pathUrl}/${id}`);
  return response.data;
};

const create = async (data: DragonInterface): Promise<DragonInterface> => {
  const response = await api.post<DragonInterface>(`${pathUrl}`, data);
  return response.data;
};

const update = async (
  id: string,
  data: DragonInterface,
): Promise<DragonInterface> => {
  const response = await api.put<DragonInterface>(`${pathUrl}/${id}`, data);
  return response.data;
};

const remove = async (id: string): Promise<DragonInterface> => {
  const response = await api.delete<DragonInterface>(`${pathUrl}/${id}`);
  return response.data;
};

export const dragonService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
