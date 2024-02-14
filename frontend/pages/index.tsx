import { priceAtom, readWriteAtom } from '@/src/atoms/test';
import { CategoryFilters } from '@/src/components/category/CategoryFilters';
import { BottomNav } from '@/src/components/common/BottomNav';
import { MainSearchBar } from '@/src/components/search/MainSearchBar';
import { StoreList } from '@/src/components/store/StoreList';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

export default function HOME() {
  const price = useAtomValue(readWriteAtom);
  const setPrice = useSetAtom(priceAtom);
  const handleClick = () => {
    setPrice((c) => c + 1);
  };
  return (
    <>
      <div className="pb-16">
        <div className="flex items-center">
          <div className="ml-2">{price}</div>
          <button onClick={handleClick} className="border p-2 ml-2">
            up
          </button>
        </div>
        <MainSearchBar />
        <CategoryFilters cols={4} />
        {/* <StoreList /> */}
      </div>
      <BottomNav />
    </>
  );
}
