import { useInfiniteQuery } from '@tanstack/react-query';
import { Store } from '../types/store';
import { removeEmpty } from '@/src/lib/objectUtils';
import { API_PATH } from '@/src/constants/api';

const STORE_PER_PAGE = 3;

export const useStores = () => {
  return useInfiniteQuery<Store[]>({
    queryKey: ['STORES'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${API_PATH}/store?` +
          new URLSearchParams(
            removeEmpty({
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
