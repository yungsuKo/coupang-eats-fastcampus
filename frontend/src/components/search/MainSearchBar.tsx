import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export const MainSearchBar = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="px-4 py-2">
      <Link
        className="flex items-center justify-stretch rounded-full border border-b-4 p-2"
        href="/search"
      >
        <FaSearch />
        <span className="ml-4 truncate">
          {data?.user?.name
            ? `${data?.user?.name}님 맥도날드 어떠심?`
            : '검색해보세요'}
        </span>
      </Link>
    </div>
  );
};
