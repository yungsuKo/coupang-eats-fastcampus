import { searchQueryAtom } from '@/src/atoms/search';
import { storeFilterAtom } from '@/src/atoms/storeFilter';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { Store } from '../types/store';
import { API_PATH } from '@/src/constants/api';
import { removeEmpty } from '@/src/lib/objectUtils';

export const useSearch = () => {
  const query = useAtomValue(searchQueryAtom);
  const storeFilter = useAtomValue(storeFilterAtom);

  return useQuery<Store[]>({
    queryKey: ['SEARCH', { query, storeFilter }],
    queryFn: async () => {
      if (!query) return [];
      const response = await fetch(
        `${API_PATH}/store/search/${query}?${new URLSearchParams(
          removeEmpty({
            sort: storeFilter.sort,
            maxDeliveryPrice: String(storeFilter.maxDeliveryPrice),
            minOrderPrice: String(storeFilter.minOrderPrice),
          })
        )}`
      );
      return response.json();
    },
  });
};
