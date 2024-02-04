import { useAtomValue } from 'jotai';
import { cartAtom } from '../atoms/cart';
import { Menu } from '@/pages/types/menu';

export const useMenuInCart = (menu: Menu) => {
  const cart = useAtomValue(cartAtom);
  if (!cart) {
    return null;
  }

  return cart.menus?.filter((_menu) => _menu.menu._id === menu._id);
};
