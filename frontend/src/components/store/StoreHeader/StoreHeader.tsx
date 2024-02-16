import { useStore } from '@/src/pages/queries/stores';
import { storeIdAtom } from '@/src/atoms/storeId';
import { useAtomValue } from 'jotai';
import { BackButton } from '../../common/BackButton';
import { Carousel } from '../../common/Carousel';
import Link from 'next/link';
import { StarsAndReviews } from '../../common/StarsAndReviews';
import { BiChevronRight } from 'react-icons/bi';

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
      <div className="absolute bottom-0 flex w-full justify-center">
        <div className="z-50 grid gap-2 border border-gray-300 bg-white px-10 py-5 shadow">
          <h1 className="text-3xl">{data.name}</h1>
          <Link
            className="flex items-center justify-center text-sm"
            href={`/store/${storeId}/reviews`}
          >
            <StarsAndReviews
              rating={data.rating}
              reviewCount={data.reviewCount}
            />
            <BiChevronRight className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};
