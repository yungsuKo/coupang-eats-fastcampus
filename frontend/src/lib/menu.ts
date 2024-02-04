import { Menu } from '@/pages/types/menu';
import { CartMenu } from '../atoms/cart';

export const getRecommendedMenus = (menus: Menu[]) => {
  return menus.filter((menu) => menu.isRecommended);
};
export const getMenusInCategory = (menus: Menu[], category: string) => {
  return menus.filter((menu) => {
    String(menu.category) === category;
  });
};
export const getMenuPrice = (menu: CartMenu) => {
  if (menu.options) {
    return (
      menu.menu.price * menu.count +
      menu.options.reduce((sum, option) => sum + option.option.price, 0)
    );
  }
  return menu.menu.price * menu.count;
};
export const getOrderMenuPrice = () => {};
export const getTotalPrice = () => {};
