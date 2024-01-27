import { StoreCategory } from '@/src/constants/storeCategory';

export type Store = {
  _id: string;
  name: string;
  images?: string[];
  category: StoreCategory;
  reviewCount?: number;
  rating?: number;
  delieveryPrice: number;
  minimumOrderPrice: number;
  menus: string[];
};
