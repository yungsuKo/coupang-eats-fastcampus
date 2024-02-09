import { OrderHistory as OrderHistoryType } from '@/pages/types/order';
import { KRW } from '@/src/lib/currency';
import { getTotalPrice } from '@/src/lib/menu';
import { getOrderStatus } from '@/src/lib/orderStatus';
import Link from 'next/link';

export const OrderHistory = ({ history }: { history: OrderHistoryType }) => {
  if (!history) return null;
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex flex-row pb-2">
        <div className="flex-grow">
          <Link
            className="text-ellipsis text-xl font-bold"
            href={`/store/${history.store._id}`}
          >
            {history.store.name}
          </Link>
          <div className="pb-1 text-sm text-gray-500">
            {new Date(history.timestamp).toLocaleString('ko')}
          </div>
          <div>{getOrderStatus(history.status)}</div>
        </div>
        {history?.store?.images?.length && (
          <div>
            <img src={history.store.images?.[0]} className="h-20 w-20" />
          </div>
        )}
      </div>
      <ul className="grid gap-2 pl-2">
        {history.menus.map(({ menu, count, options }, index) => (
          <li key={menu._id}>
            <span className="align-center inline-block h-6 w-6 rounded-full bg-gray-200 text-center">
              {index + 1}
            </span>
            &nbsp;
            {menu.name}
            <ul className="pl-4 pt-1">
              <li> {options.map(({ title }) => title).join(',')}</li>
            </ul>
          </li>
        ))}
      </ul>
      <div className="pb-4 pt-2">
        합계 : {KRW(getTotalPrice(history.menus))}
      </div>
      <Link
        href={`/order/${history._id}/review`}
        className="grid place-items-center rounded-lg border border-blue-400 py-2 font-bold text-blue-400"
      >
        리뷰쓰기
      </Link>
    </div>
  );
};
