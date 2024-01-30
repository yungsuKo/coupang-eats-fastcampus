import { useStores } from '@/pages/queries/stores';
import { StoreFilters } from './StoreFilters';
import { StoreItem } from './StoreItem';
import { useInfiniteScroll } from '@/src/lib/useInfiniteScroll';

export const StoreList = () => {
  const { isLoading, error, data, hasNextPage, isFetching, fetchNextPage } =
    useStores();

  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage);
  if (isLoading || error || !data) return null;

  return (
    <div>
      <StoreFilters />
      {data.pages.map((page) =>
        page.map((store) => <StoreItem key={store._id} store={store} />)
      )}
      {!isFetching && <div ref={loader} />}
    </div>
  );
};
