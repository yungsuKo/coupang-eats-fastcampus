import { useStores } from '@/pages/queries/stores';
import { StoreFilters } from './StoreFilters';
import { StoreItem } from './StoreItem';

export const StoreList = () => {
  const { isLoading, error, data } = useStores();

  if (isLoading || error || !data) return null;

  return (
    <div>
      <StoreFilters />
      {data.pages.map((page) =>
        page.map((store) => <StoreItem key={store._id} store={store} />)
      )}
    </div>
  );
};
