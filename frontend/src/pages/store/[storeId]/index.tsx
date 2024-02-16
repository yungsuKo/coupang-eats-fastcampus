import { storeIdAtom } from '@/src/atoms/storeId';
import { CartButton } from '@/src/components/common/CartButton';
import { StoreDescription } from '@/src/components/store/StoreDescription/StoreDescription';
import { StoreHeader } from '@/src/components/store/StoreHeader/StoreHeader';
import { StoreMenus } from '@/src/components/store/StoreMenus';
import { useSetAtom } from 'jotai';
import { GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';

export default function Store({ storeId }: { storeId: string }) {
  const setStoreId = useSetAtom(storeIdAtom);
  useEffect(() => {
    setStoreId(storeId);
  }, [setStoreId, storeId]);
  return (
    <>
      <div className="pb-20">
        <StoreHeader />
        <StoreDescription />
        <StoreMenus />
      </div>
      <CartButton />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { storeId } = context.query ?? {};

  return {
    props: {
      storeId,
    },
  };
}
