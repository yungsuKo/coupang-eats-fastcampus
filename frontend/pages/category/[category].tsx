import { CategoryHeader } from '@/src/components/Header/category';
import { CategoryTabs } from '@/src/components/category/CategoryTabs';
import { CartButton } from '@/src/components/common/CartButton';
import { CategoryStoreList } from '@/src/components/store/CategoryStoreList';
import { StoreCategory } from '@/src/constants/storeCategory';
import { useRouter } from 'next/router';

export default function Category() {
  const router = useRouter();
  const category = Array.isArray(router.query.category)
    ? router.query.category[0]
    : router.query.category;

  const currentCategory =
    typeof category === 'string' && category in StoreCategory
      ? StoreCategory[category as StoreCategory]
      : undefined;
  console.log(currentCategory);

  return (
    <>
      <CategoryHeader>{currentCategory}</CategoryHeader>
      <CategoryTabs category={currentCategory}></CategoryTabs>
      <CategoryStoreList category={currentCategory}></CategoryStoreList>
      <CartButton />
    </>
  );
}
