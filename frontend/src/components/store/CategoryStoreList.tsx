import { StoreCategory } from '@/src/constants/storeCategory';
import { StoreListUI } from './StoreListUI';
import { useInfiniteScroll } from '@/src/lib/useInfiniteScroll';
import { useCategoryStores } from '@/src/pages/queries/stores';
import { useAtomValue } from 'jotai';
import { currentCategoryAtom } from '@/src/atoms/currentCategory';

export const CategoryStoreList = () => {
  const category = useAtomValue(currentCategoryAtom);
  const { isLoading, error, data, hasNextPage, isFetching, fetchNextPage } =
    useCategoryStores(category);
  console.log('categorystorelist:', category);
  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage);
  return <StoreListUI {...{ data, isFetching, loader }} />;
};
