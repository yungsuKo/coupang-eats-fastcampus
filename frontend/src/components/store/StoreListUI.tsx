import { StoreFilters } from './StoreFilters';
import { StoreItem } from './StoreItem';
import { InfiniteData } from '@tanstack/react-query';
import { Store } from '@/pages/types/store';
import { RefObject } from 'react';

export const StoreListUI = ({
  data,
  isFetching,
  loader,
}: {
  data: InfiniteData<Store[]>;
  isFetching: boolean;
  loader: RefObject<HTMLDivElement>;
}) => {
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
