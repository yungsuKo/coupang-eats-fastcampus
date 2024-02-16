import { currentCategoryAtom } from '@/src/atoms/currentCategory';
import { CategoryHeader } from '@/src/components/Header/category';
import { CategoryTabs } from '@/src/components/category/CategoryTabs';
import { CartButton } from '@/src/components/common/CartButton';
import { CategoryStoreList } from '@/src/components/store/CategoryStoreList';
import { StoreCategory } from '@/src/constants/storeCategory';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Category() {
  const router = useRouter();

  const category = Array.isArray(router.query.category)
    ? router.query.category[0]
    : router.query.category;

  const [currentCategory, setCurrentCategory] = useAtom(currentCategoryAtom);
  useEffect(() => {
    setCurrentCategory(StoreCategory[category as StoreCategory]);
  }, [category]);

  return (
    <>
      <CategoryHeader>{currentCategory}</CategoryHeader>
      <CategoryTabs />
      <CategoryStoreList />
      <CartButton />
    </>
  );
}
