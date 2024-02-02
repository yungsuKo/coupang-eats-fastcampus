import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Store } from '../types/store';
import { removeEmpty } from '@/src/lib/objectUtils';
import { API_PATH } from '@/src/constants/api';
import { useAtomValue } from 'jotai';
import { storeFilterAtom } from '@/src/atoms/storeFilter';
import { StoreCategory } from '@/src/constants/storeCategory';

const STORE_PER_PAGE = 3;

export const useStores = () => {
  const params = useAtomValue(storeFilterAtom);

  return useInfiniteQuery<Store[]>({
    queryKey: ['STORES', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${API_PATH}/store?` +
          new URLSearchParams(
            removeEmpty({
              sort: params.sort,
              maxDeliveryPrice: String(params.maxDeliveryPrice),
              minOrderPrice: String(params.minOrderPrice),
              page: String(pageParam),
              limit: String(STORE_PER_PAGE),
            })
          )
      );
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === STORE_PER_PAGE) return lastPage.length;
    },
    initialPageParam: 1, // Add this line
  });
};

export const useCategoryStores = (category?: StoreCategory) => {
  const params = useAtomValue(storeFilterAtom);

  return useInfiniteQuery<Store[]>({
    queryKey: ['STORES', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${API_PATH}/category/${category}` +
          new URLSearchParams(
            removeEmpty({
              sort: params.sort,
              maxDeliveryPrice: String(params.maxDeliveryPrice),
              minOrderPrice: String(params.minOrderPrice),
              page: String(pageParam),
              limit: String(STORE_PER_PAGE),
            })
          )
      );
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === STORE_PER_PAGE) return lastPage.length;
    },
    initialPageParam: 1, // Add this line
  });
};

export const useStore = ({ storeId }: { storeId: string }) => {
  return useQuery<Store>({
    queryKey: ['STORE', storeId],
    queryFn: async () => {
      if (!storeId) return null;
      const response = await fetch(`${API_PATH}/store/${storeId}`);
      return response.json();
    },
  });
};
