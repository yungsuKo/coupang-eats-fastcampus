import { storeIdAtom } from '@/src/atoms/storeId';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Menu } from '../types/menu';
import { API_PATH } from '@/src/constants/api';

export const useStoreMenus = (storeId: string) => {
  return useQuery<Menu[]>({
    queryKey: ['STORE_MENUS', storeId],
    queryFn: async () => {
      if (!storeId) return null;
      const response = await fetch(`${API_PATH}/menu/store/${storeId}`);
      return response.json();
    },
  });
};
