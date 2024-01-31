import { searchQueryAtom } from '@/src/atoms/search';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import { FormEvent, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

export const SearchBar = ({ userName }: { userName?: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setQuery = useSetAtom(searchQueryAtom);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      setQuery(inputRef.current.value);
    }
  };

  return (
    <form
      className="grid grid-cols-12 place-items-center px-4 py-2"
      onSubmit={handleSearch}
    >
      <Link href="/">
        <IoArrowBack />
      </Link>
      <input
        ref={inputRef}
        className="col-span-10 w-full rounded-full border border-b-4 border-gray-300 px-4"
        placeholder={userName ? `${userName}님 맥도날드 어떰?` : '검색해보세요'}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
};
