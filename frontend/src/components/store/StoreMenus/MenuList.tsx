import { useStoreMenus } from '@/src/pages/queries/menus';
import { storeIdAtom } from '@/src/atoms/storeId';
import { getUniqueCategories } from '@/src/lib/getUniqueCategories';
import { useAtomValue } from 'jotai';
import { Fragment } from 'react';
import { MenuInCategory } from './MenuInCategory';

export const MenuList = () => {
  const storeId = useAtomValue(storeIdAtom);
  const { data } = useStoreMenus(storeId);
  console.log(data);
  if (!data) return null;
  const categories = getUniqueCategories(data);

  return (
    <div className="grid gap-4 px-4">
      {categories.map((category) => (
        <Fragment key={category}>
          <MenuInCategory {...{ category: category.toString(), data }} />
        </Fragment>
      ))}
    </div>
  );
};
