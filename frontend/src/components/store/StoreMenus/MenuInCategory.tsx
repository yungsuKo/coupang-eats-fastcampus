import { Menu } from '@/pages/types/menu';
import { currentCategoryAtom } from '@/src/atoms/currentCategory';
import { getMenusInCategory, getRecommendedMenus } from '@/src/lib/menu';
import { useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { MenuItem } from './MenuItem';

export const MenuInCategory = ({
  category,
  data,
}: {
  category: string;
  data: Menu[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const setCurrentCategory = useSetAtom(currentCategoryAtom);

  const recommendedMenus = getRecommendedMenus(data);
  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: '-42px 0px -90% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentCategory(category);
        }
      }, options);
    });
  }, [category, setCurrentCategory]);

  return (
    <div className="grid gap-4" ref={ref}>
      <div>
        <h2 id={category} className="text-xl">
          {category}
        </h2>
        <small className="text-grey-600">
          메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다.
        </small>
      </div>
      {category === '추천메뉴' ? (
        <>
          {recommendedMenus.map((menu) => (
            <MenuItem menu={menu} key={`${menu.name}_RECOMMEDED`} />
          ))}
        </>
      ) : (
        <>
          {getMenusInCategory(data, category)?.map((menu) => (
            <MenuItem menu={menu} key={`${menu.name}_RECOMMEDED`} />
          ))}
        </>
      )}
    </div>
  );
};
