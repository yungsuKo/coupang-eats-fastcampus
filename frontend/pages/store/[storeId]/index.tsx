import { storeIdAtom } from '@/src/atoms/storeId';
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
      <StoreHeader />
      <StoreDescription />
      <StoreMenus />
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
