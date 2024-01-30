import { useStores } from '@/pages/queries/stores';
import { StoreFilters } from './StoreFilters';
import { StoreItem } from './StoreItem';
import { useInfiniteScroll } from '@/src/lib/useInfiniteScroll';
import { StoreListUI } from './StoreListUI';

export const StoreList = () => {
  const { isLoading, error, data, hasNextPage, isFetching, fetchNextPage } =
    useStores();

  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage);
  if (isLoading || error || !data) return null;

  return <StoreListUI {...{ data, loader, isFetching }} />;
};
