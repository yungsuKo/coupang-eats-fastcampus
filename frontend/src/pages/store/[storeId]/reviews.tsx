import { StoreReviewList } from '@/src/components/store/StoreReviews/StoreReviewList';
import { StoreReviewTop } from '@/src/components/store/StoreReviews/StoreReviewTop';
import { GetServerSideProps } from 'next';

export default function StoreReviews({ storeId }: { storeId: string }) {
  return (
    <>
      <StoreReviewTop {...{ storeId }} />
      <StoreReviewList {...{ storeId }} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { storeId } = context.query;

  return {
    props: {
      storeId,
    },
  };
};
