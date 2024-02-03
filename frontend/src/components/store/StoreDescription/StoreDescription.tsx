import { useStore } from '@/pages/queries/stores';
import { storeIdAtom } from '@/src/atoms/storeId';
import { useAtomValue } from 'jotai';
import { KRW } from '@/src/lib/currency';

export const StoreDescription = () => {
  const storeId = useAtomValue(storeIdAtom);
  const { data } = useStore({ storeId });

  if (!data) return null;

  return (
    <div className="grid grid-cols-4 gap-2 px-4 py-4 text-gray-700">
      <div>배달비</div>
      <div className="col-span-3">{KRW(data.deliveryPrice)}</div>
      <div>최소 주문</div>
      <div className="col-span-3">{KRW(data.minimumOrderPrice)}</div>
    </div>
  );
};
