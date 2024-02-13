import { atom } from 'jotai';

export const priceAtom = atom(1);
export const readWriteAtom = atom(
  (get) => get(priceAtom) * 2,
  (get, set, newPrice: number) => {
    set(priceAtom, newPrice / 2);
    // you can set as many atoms as you want at the same time
  }
);
