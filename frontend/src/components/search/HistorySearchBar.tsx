import { searchQueryAtom } from '@/src/atoms/search';
import { useSetAtom } from 'jotai';
import { ChangeEventHandler, useTransition } from 'react';
import { BiSearch } from 'react-icons/bi';

export const HistorySearchBar = () => {
  const [isPending, startTransition] = useTransition();
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };
  return (
    <div className="flex border-b-8 border-b-gray-100 p-4">
      <input
        placeholder="주문한 메뉴를 찾아보세요"
        className="flex-grow bg-gray-200 rounded-lg px-3"
        onChange={handleInput}
      ></input>
      <BiSearch className="m-2 text-2xl" />
    </div>
  );
};
