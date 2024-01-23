import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export const MainSearchBar = () => {
  return (
    <div>
      <Link href="/search">
        <FaSearch />
      </Link>
    </div>
  );
};
