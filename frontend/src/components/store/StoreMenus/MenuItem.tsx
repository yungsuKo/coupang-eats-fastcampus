import { Menu } from '@/pages/types/menu';
import {
  addMenuToCartAtom,
  cartAtom,
  removeMenuFromCartAtom,
} from '@/src/atoms/cart';
import { storeIdAtom } from '@/src/atoms/storeId';
import { KRW } from '@/src/lib/currency';
import { useMenuInCart } from '@/src/lib/useMenuInCart';
import { useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MenuCounter } from '../../common/MenuCounter';
import { BiCartAdd } from 'react-icons/bi';

export const MenuItem = ({ menu }: { menu: Menu }) => {
  const storeId = useAtomValue(storeIdAtom);
  const setCart = useSetAtom(cartAtom);
  const menusInCart = useMenuInCart(menu);
  const addMenuToCart = useSetAtom(addMenuToCartAtom);
  const addItemToCart = (menu: Menu) => {
    const result = addMenuToCart({ menu, storeId });
    if (!result) {
      const confirm = window.confirm(
        '같은 가게의 메뉴만 담을 수 있습니다. \n주문할 가게를 변경하실 경우 이전에 담은 메뉴가 삭제됩니다.'
      );
      if (confirm) {
        setCart({ storeId, menus: [{ menu, count: 1 }] });
      }
    }
  };
  const removeMenuFromCart = useSetAtom(removeMenuFromCartAtom);

  const router = useRouter();
  const hasImage = !!menu.images?.length;

  const itemCount = menusInCart?.reduce((sum, menu) => sum + menu.count, 0);
  return (
    <div className="relative">
      <Link href={`/menu/${menu._id}`} className="grid grid-cols-3">
        <div className={`${hasImage ? 'col-span-2' : 'col-span-3'}`}>
          <h3 className="text-lg font-bold">{menu.name}</h3>
          <h4 className="text-lg">{KRW(menu.price)}</h4>
          <p className="text-sm">{menu.description}</p>
        </div>
        {hasImage ? (
          <div className="col-span-1">
            <img src={menu.images?.[0]} alt={menu.name} />
          </div>
        ) : (
          ''
        )}
      </Link>
      <div className="absolute right-0 top-0 flex h-full items-center">
        {menusInCart && itemCount ? (
          <MenuCounter
            {...{
              removeMenuFromCart,
              cartMenu: menusInCart[0],
              itemCount,
              addMenuToCart,
              menu,
              storeId,
            }}
          />
        ) : (
          <button
            className="rounded-full border border-gray-200 bg-white p-1 text-lg text-blue-500"
            onClick={(e) => {
              e.stopPropagation;
              e.preventDefault;
              if (menu.additionalSelection?.length) {
                router.push(`/menu/${menu._id}`);
                return;
              }
              addItemToCart(menu);
            }}
          >
            <BiCartAdd />
          </button>
        )}
      </div>
    </div>
  );
};
