import { FaRegStar, FaStar, FaStarHalf } from 'react-icons/fa';

export const StarRating = ({ rating }: { rating?: number }) => {
  if (!rating) return null;
  const stars = [...Array(Math.floor(rating))];
  let halfstar = false;
  if (rating % 1 >= 0.5) halfstar = true;
  let emptystar = 5 - stars.length;
  if (halfstar) emptystar -= 1;

  return (
    <div className="flex">
      {stars.map((_, i) => (
        <FaStar key={i} />
      ))}
      {halfstar && <FaStarHalf />}
      {[...Array(emptystar)].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  );
};
