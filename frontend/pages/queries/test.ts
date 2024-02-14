import { countAtom } from '@/src/atoms/test';
import { API_PATH } from '@/src/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

export const useTest = () => {
  const params = useAtomValue(countAtom);
  return useQuery({
    queryKey: ['TEST', params],
    queryFn: async () => {
      const response = await fetch(`${API_PATH}/test`);
      return response.json();
    },
  });
};
