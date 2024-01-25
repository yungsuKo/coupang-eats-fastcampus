import {
  StoreCategory,
  StoreCategoryImages,
} from '@/src/constants/storeCategory';
import Image from 'next/image';
import Link from 'next/link';
export const CategoryFilters = ({ cols }: { cols: number }) => {
  console.log(Object.values(StoreCategory).map((dd) => dd));
  return (
    <div className={`grid ${getGridCol(cols)} gap-4 p-4`}>
      {Object.values(StoreCategory).map((category) => {
        return (
          <Link href={`/category/${category}`} key={category}>
            <Image
              className="round-full"
              src={StoreCategoryImages[category]}
              alt={category}
              width={500}
              height={500}
            ></Image>
            {category}
          </Link>
        );
      })}
    </div>
  );
};

const getGridCol = (col: number) => {
  if (col in Object.keys(gridColMap)) return gridColMap[col];
  return gridColMap[4];
};

const gridColMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};
