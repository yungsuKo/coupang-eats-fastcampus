import { useQuery } from '@tanstack/react-query';
import { Menu } from '../types/menu';
import { API_PATH } from '@/src/constants/api';

export const useMenu = (menuId?: string) => {
  console.log('menuId', menuId);
  return useQuery<Menu>({
    queryKey: ['MENU', menuId],
    queryFn: async () => {
      const response = await fetch(`${API_PATH}/menu/${menuId}`);

      return response.json();
    },
  });
};
