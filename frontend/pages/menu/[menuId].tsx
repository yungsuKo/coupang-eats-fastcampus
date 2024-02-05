import { menuIdAtom } from '@/src/atoms/menuId';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useMenu } from '../queries/menu';
import { BackButton } from '@/src/components/common/BackButton';
import { Carousel } from '@/src/components/common/Carousel';
import { useRouter } from 'next/router';
import { MenuTitle } from '@/src/components/Menu/MenuTitle';

export default function Menu() {
  const router = useRouter();
  const setMenuIdAtom = useSetAtom(menuIdAtom);
  const menuId = Array.isArray(router.query.menuId)
    ? router.query.menuId[0]
    : router.query.menuId;
  const { data } = useMenu(menuId);

  useEffect(() => {
    setMenuIdAtom(menuId);
  }, [menuId, setMenuIdAtom]);

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="absolute left-5 top-3 z-50 text-3xl text-white">
        <BackButton href={`/store/${data.store}`} />
      </div>
      <Carousel images={data.images} height="h-50" />
      <MenuTitle
        title={data.name}
        description={data.description?.toString()}
      ></MenuTitle>
    </>
  );
}
