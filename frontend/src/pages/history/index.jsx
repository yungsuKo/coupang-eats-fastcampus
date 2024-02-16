import { HistorySearchBar } from '@/src/components/search/HistorySearchBar';
import { useOrderHistory } from '../queries/history';
import { useAtomValue } from 'jotai';
import { searchQueryAtom } from '@/src/atoms/search';
import { OrderHistory } from '@/src/components/order/OrderHistory';
import { BottomNav } from '@/src/components/common/BottomNav';

export default function History() {
  const { data } = useOrderHistory();
  const searchQuery = useAtomValue(searchQueryAtom);

  const histories = data?.filter(
    (history) =>
      history.store.name.includes(searchQuery ?? '') ||
      history.menus.some((menu) => menu.menu.name.includes(searchQuery ?? ''))
  );

  return (
    <>
      <div className="pb-16">
        <HistorySearchBar />
        <div className="grid grid-2 p-4">
          {histories?.map((history) => (
            <OrderHistory key={history._id} history={history} />
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
