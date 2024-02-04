import { cartAtom } from '@/src/atoms/cart';
import { KRW } from '@/src/lib/currency';
import { getMenuPrice } from '@/src/lib/menu';
import { useAtomValue } from 'jotai';
import Link from 'next/link';

export const CartButton = () => {
  const cart = useAtomValue(cartAtom);
  if (!cart.menus || cart.menus.length === 0) return null;
  const menuCount = cart.menus.reduce((acc, menu) => acc + menu.count, 0);
  const totalPrice = cart.menus.reduce(
    (sum, menu) => sum + getMenuPrice(menu),
    0
  );
  return (
    <Link
      className="fixed bottom-0 z-50 flex w-screen items-center justify-between bg-blue-400 p-4 text-white"
      href="/order"
    >
      <div className="flex items-center gap-1">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-400">
          {menuCount}
        </div>
        카트보기
      </div>
      <div>{KRW(totalPrice)}</div>
    </Link>
  );
};
