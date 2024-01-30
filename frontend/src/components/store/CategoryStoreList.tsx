import { useCategoryStores } from '@/pages/queries/stores';
import { StoreCategory } from '@/src/constants/storeCategory';
import { StoreListUI } from './StoreListUI';
import { useInfiniteScroll } from '@/src/lib/useInfiniteScroll';

export const CategoryStoreList = ({
  category,
}: {
  category?: StoreCategory;
}) => {
  const { isLoading, error, data, hasNextPage, isFetching, fetchNextPage } =
    useCategoryStores(category);
  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage);
  return <StoreListUI {...{ data, isFetching, loader }} />;
};
