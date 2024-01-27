import { useStores } from '@/pages/queries/stores';
import { StoreFilter } from './StoreFilter';
import { StoreItem } from './StoreItem';

export const StoreList = () => {
  const { isLoading, error, data } = useStores();

  if (isLoading || error || !data) return null;

  return (
    <div>
      <StoreFilter />
      {data.pages.map((page) =>
        page.map((store) => <StoreItem key={store._id} store={store} />)
      )}
    </div>
  );
};
