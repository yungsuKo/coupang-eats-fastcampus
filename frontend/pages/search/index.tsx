import { searchQueryAtom } from '@/src/atoms/search';
import { SearchBar } from '@/src/components/search/SearchBar';
import { StoreFilters } from '@/src/components/store/StoreFilters';
import { useSetAtom } from 'jotai';
import { useSearch } from '../queries/search';
import { useEffect } from 'react';
import { initialFilter, storeFilterAtom } from '@/src/atoms/storeFilter';
import { CategoryFilters } from '@/src/components/category/CategoryFilters';
import { StoreItem } from '@/src/components/store/StoreItem';

export default function Search() {
  const setQuery = useSetAtom(searchQueryAtom);
  const setFilter = useSetAtom(storeFilterAtom);
  const { data } = useSearch();

  useEffect(() => {
    setQuery(undefined);
  }, []);
  useEffect(() => {
    if (!data) setFilter(initialFilter);
  }, [data, setFilter]);
  console.log('data:', data);
  return (
    <>
      <SearchBar />
      <StoreFilters />
      {!data?.length ? (
        <CategoryFilters cols={2} />
      ) : (
        <>
          {data?.map((store) => {
            <StoreItem key={store._id} store={store} />;
          })}
        </>
      )}
    </>
  );
}
