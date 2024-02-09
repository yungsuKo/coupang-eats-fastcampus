import { Cart } from '@/src/atoms/cart';
import { API_PATH } from '@/src/constants/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useSubmitOrder = () => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: async (cart: Cart) => {
      if (!session?.user) return;
      const menus = cart?.menus?.map((menu) => ({
        menu: menu.menu._id,
        count: menu.count,
        options: menu.options?.map((option) => ({
          title: option.option.title,
          price: option.option.price,
        })),
      }));
      return fetch(`${API_PATH}/order`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session.user,
          store: cart.storeId,
          menus,
        }),
      });
    },
  });
};

export const useOrder = () => {
  return useQuery();
};
