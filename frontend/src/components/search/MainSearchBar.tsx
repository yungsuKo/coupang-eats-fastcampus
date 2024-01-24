import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export const MainSearchBar = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div>
      <Link
        className="flex items-center justify-stretch rounded-full border"
        href="/search"
      >
        <FaSearch />
        {data?.user?.name
          ? `${data?.user?.name}님 맥도날드 어떠심?`
          : '검색해보세요'}
      </Link>
    </div>
  );
};
