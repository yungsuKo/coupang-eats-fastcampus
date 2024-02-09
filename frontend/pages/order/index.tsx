import {
  addMenuToCartAtom,
  cartAtom,
  removeMenuFromCartAtom,
} from '@/src/atoms/cart';
import { useAtomValue, useSetAtom } from 'jotai';
import { useStore } from '../queries/stores';
import { useRouter } from 'next/router';
import { useSubmitOrder } from '../queries/order';
import { BsCartX } from 'react-icons/bs';
import Link from 'next/link';
import { CartHeader } from '@/src/components/order/CartHeader';
import { getMenuPrice } from '@/src/lib/menu';

export default function Order() {
  const cart = useAtomValue(cartAtom);
  const { storeId } = cart;
  const { data: store } = useStore({ storeId });
  const router = useRouter();

  const { mutate } = useSubmitOrder();
  const addMenuCart = useSetAtom(addMenuToCartAtom);
  const removeMenuFromCart = useSetAtom(removeMenuFromCartAtom);

  if (!storeId || !store || !cart.menus) {
    return (
      <div className="flex h-screen flex-col">
        <CartHeader />
        <div className="grid flex-grow place-items-center">
          <div className="grid place-items-center gap-2 text-gray-500">
            <BsCartX className="text-5xl" />
            장바구니가 비어있습니다.
            <Link
              href="/"
              className="rounded-lg border border-black p-2 text-black"
            >
              쿠팡이츠 맛집 구경가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = cart.menus.reduce(
    (acc, menu) => acc + getMenuPrice(menu),
    0
  );

  const submitOrder = async () => {
    mutate(cart, {
      onSuccess: (data) => {
        router.push('/history');
      },
      onError: (error, variable, context) => {
        console.log(error, variable, context);
      },
    });
  };
  return (
    <>
      <div className="gird gap-2 pb-20">
        <CartHeader />
        <div className="grid gap-2 border-t-8 border-t-gray-200 bg-white">
          <Link
            href={`/store/${storeId}`}
            className="border-b border-b-gray-100 p-4 text-lg font-bold"
          >
            {store.name}
          </Link>
        </div>
      </div>
    </>
  );
}
