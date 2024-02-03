import { storeIdAtom } from '@/src/atoms/storeId';
import { useAtomValue } from 'jotai';
import { ScrollTab } from '../../common/ScrollTabs';
import Link from 'next/link';
import { currentCategoryAtom } from '@/src/atoms/currentCategory';
import { useStoreMenus } from '@/pages/queries/menus';
import { getUniqueCategories } from '@/src/lib/getUniqueCategories';

export const MenuCategories = () => {
  const storeId = useAtomValue(storeIdAtom);
  const currentCategory = useAtomValue(currentCategoryAtom);
  const { data } = useStoreMenus(storeId);

  if (!data) return null;
  const categoies = getUniqueCategories(data);

  return (
    <ScrollTab>
      {categoies.map((category) => (
        <Link
          key={category}
          href={`#${category}`}
          className={`${
            category === currentCategory
              ? 'border-b-blue-500 font-blue text-blue-500'
              : ''
          } py-2 whitespace-nowrap px-4`}
        >
          {category}
        </Link>
      ))}
    </ScrollTab>
  );
};
