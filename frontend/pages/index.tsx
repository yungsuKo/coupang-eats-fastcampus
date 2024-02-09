import { CategoryFilters } from '@/src/components/category/CategoryFilters';
import { BottomNav } from '@/src/components/common/BottomNav';
import { MainSearchBar } from '@/src/components/search/MainSearchBar';
import { StoreList } from '@/src/components/store/StoreList';

export default function HOME() {
  return (
    <>
      <div className="pb-16">
        <MainSearchBar />
        <CategoryFilters cols={4} />
        <StoreList />
      </div>
      <BottomNav />
    </>
  );
}
