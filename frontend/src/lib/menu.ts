import { Menu } from '@/pages/types/menu';

export const getRecommendedMenus = (menus: Menu[]) => {
  return menus.filter((menu) => menu.isRecommended);
};
export const getMenusInCategory = (menus: Menu[], category: string) => {
  return menus.filter((menu) => {
    String(menu.category) === category;
  });
};
export const getMenuPrice = () => {};
export const getOrderMenuPrice = () => {};
export const getTotalPrice = () => {};
