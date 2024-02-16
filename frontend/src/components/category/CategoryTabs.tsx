import { StoreCategory } from '@/src/constants/storeCategory';
import Link from 'next/link';
import { ScrollTab } from '../common/ScrollTabs';
import { useAtom } from 'jotai';
import { currentCategoryAtom } from '@/src/atoms/currentCategory';
import { MouseEventHandler } from 'react';

export const CategoryTabs = () => {
  const [category, setCurrentCategory] = useAtom(currentCategoryAtom);
  return (
    <ScrollTab>
      {Object.values(StoreCategory).map((cat) => (
        <Link
          href={`/category/${cat}`}
          onClick={() => setCurrentCategory(cat)}
          className={`${
            category === cat
              ? 'border-b border-b-blue-500 font-blue text-blue-500'
              : ''
          } py-2 whitespace-nowrap px-4`}
        >
          {cat}
        </Link>
      ))}
    </ScrollTab>
  );
};
