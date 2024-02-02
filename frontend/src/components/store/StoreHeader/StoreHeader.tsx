import { useStore } from '@/pages/queries/stores';
import { storeIdAtom } from '@/src/atoms/storeId';
import { useAtomValue } from 'jotai';
import { BackButton } from '../../common/BackButton';
import { Carousel } from '../../common/Carousel';

export const StoreHeader = () => {
  const storeId = useAtomValue(storeIdAtom);
  const { data } = useStore({ storeId });

  if (!data) return null;

  return (
    <div className="relative pb-16">
      <div className="absolute left-5 top-3 z-50 text-3xl text-white">
        <BackButton />
      </div>
      <Carousel images={data.images} />
    </div>
  );
};
