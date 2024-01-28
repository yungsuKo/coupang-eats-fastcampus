import { storeSortAtom } from '@/src/atoms/storeFilter';
import { useAtomValue } from 'jotai/react';
import { useState } from 'react';
import { OrderPriceFilterModal } from './OrderPriceFilterModal';
import { StoreFilter } from './StoreFilter';
import { SortText } from '@/src/constants/store';
import { SortFilterModal } from './SortFilterModal';
import { DeliveryFilterModal } from './DeliveryFilterModal';

export const StoreFilters = () => {
  const sort = useAtomValue(storeSortAtom);
  const [openFilter, setOpenFilter] = useState<string | undefined>(undefined);
  return (
    <>
      <div className="my-2 flex gap-2 overflow-x-scroll pl-4">
        <StoreFilter
          filterType="정렬"
          currentValue={SortText[sort]}
          onClick={() => {
            setOpenFilter('정렬');
          }}
        />
        <StoreFilter
          filterType="배달비"
          onClick={() => {
            setOpenFilter('배달비');
          }}
        />
        <StoreFilter
          filterType="최소주문"
          onClick={() => {
            setOpenFilter('최소주문');
          }}
        />
      </div>
      {openFilter === '정렬' && (
        <SortFilterModal closeModal={() => setOpenFilter(undefined)} />
      )}
      {openFilter === '배달비' && (
        <DeliveryFilterModal closeModal={() => setOpenFilter(undefined)} />
      )}
      {openFilter === '최소주문' && (
        <OrderPriceFilterModal closeModal={() => setOpenFilter(undefined)} />
      )}
    </>
  );
};
