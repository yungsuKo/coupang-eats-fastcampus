import { API_PATH } from '@/src/constants/api';
import { useMutation } from '@tanstack/react-query';

export const useImageUpload = () => {
  return useMutation({
    mutationFn: async (image: FormData) => {
      const response = await fetch(`${API_PATH}/image`, {
        method: 'post',
        body: image,
      });
      return response.json();
    },
  });
};
