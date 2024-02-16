import { useSession } from 'next-auth/react';
import { OrderHistory } from '../types/order';
import { useQuery } from '@tanstack/react-query';
import { API_PATH } from '@/src/constants/api';

export const useOrderHistory = () => {
  const { data: session } = useSession();
  const { user } = session ?? {};

  return useQuery<OrderHistory[]>({
    queryKey: ['ORDER_HISTORY', user], // user가 없어서...?
    queryFn: async () => {
      if (!user?.email) return null;
      const response = await fetch(
        `${API_PATH}/order/history?email=${user.email}`
      );

      return response.json();
    },
    refetchOnMount: 'always',
  });
};
