import { ReviewSort } from '@/src/constants/review';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Review } from '../types/review';
import { API_PATH } from '@/src/constants/api';
import { removeEmpty } from '@/src/lib/objectUtils';

const REVIEW_PER_PAGE = 10;
export const useStoreReviews = ({
  storeId,
  photo,
  sort = ReviewSort.RECENT,
}: {
  storeId?: string;
  photo: boolean;
  sort: ReviewSort;
}) => {
  return useInfiniteQuery<Review[]>({
    queryKey: ['STORE_REVIEW', { storeId, photo, sort }],
    queryFn: async ({ pageParam = 1 }) => {
      if (!storeId) {
        return null;
      }
      const response = await fetch(
        `${API_PATH}/review/store/${storeId}?${new URLSearchParams(
          removeEmpty({
            photo: String(photo),
            sort,
            page: String(pageParam),
            limit: String(REVIEW_PER_PAGE),
          })
        )}`
      );
      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === REVIEW_PER_PAGE) return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
