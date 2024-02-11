import { useStoreReviews } from '@/pages/queries/storeReviews';
import { ReviewSort } from '@/src/constants/review';
import { useInfiniteScroll } from '@/src/lib/useInfiniteScroll';
import { useState } from 'react';
import { StoreReviewFilter } from './StoreReviewFilter';

export const StoreReviewList = ({ storeId }: { storeId: string }) => {
  const [sort, setSort] = useState<ReviewSort>(ReviewSort.RECENT);
  const [photo, setPhoto] = useState<boolean>(false);
  const { isLoading, data, error, fetchNextPage, hasNextPage, isFetching } =
    useStoreReviews({
      storeId,
      photo,
      sort,
    });

  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage);
  if (!data || isLoading || error) return null;

  return (
    <>
      <StoreReviewFilter {...{ setPhoto, setSort, sort }} />
    </>
  );
};
