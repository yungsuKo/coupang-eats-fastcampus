import { CategoryFilters } from '@/src/components/category/CategoryFilters';
import { MainSearchBar } from '@/src/components/search/MainSearchBar';
import { StoreList } from '@/src/components/store/StoreList';

export default function HOME() {
  return (
    <>
      <MainSearchBar />
      <CategoryFilters />
      <StoreList />
    </>
  );
}
