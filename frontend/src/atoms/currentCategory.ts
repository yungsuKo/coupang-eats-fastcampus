import { atom } from 'jotai';
import { StoreCategory } from '../constants/storeCategory';

export const currentCategoryAtom = atom<StoreCategory>();
currentCategoryAtom.debugLabel = 'currentCategoryAtom';
