import { useUserById } from '@/pages/queries/user';
import { Review } from '@/pages/types/review';
import { getDayDiff } from '@/src/lib/date';
import { hideName } from '@/src/lib/name';
import { StarRating } from '../../common/StarRating';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

export const StoreReviewCard = ({ review }: { review: Review }) => {
  const { data: user } = useUserById(review.user);
  if (!user) return null;

  const dayDiff = getDayDiff(
    review.createdAt ? new Date(review.createdAt) : new Date()
  );
  return (
    <div className="border-b border-b-gray-200 pb-4">
      <div>{hideName(user?.name ?? '')}</div>
      <div className="flex">
        <div className="text-yellow-400">
          <StarRating rating={review.rating} />
        </div>
        {dayDiff > 0 ? `${dayDiff}일 전` : '오늘'}
      </div>
      {review.image && <img src={review.image} alt={review.image} />}
      {review.review && <p>{review.review}</p>}
      <div className="flex flex-wrap gap-2 pt-4">
        {review.menus.map((menu) => (
          <div
            key={menu._id}
            className={`flex items-center gap-1 rounded-full bg-blue-100 px-2 
            ${menu.like ? 'bg-blue-100 text-blue-500' : ''}
            ${menu.dislike ? 'bg-red-100 text-red-500' : ''}`}
          >
            {menu.like && <FaThumbsUp />}
            {menu.dislike && <FaThumbsDown />}
            {menu.name}
          </div>
        ))}
      </div>
    </div>
  );
};
