import { FaStar } from "react-icons/fa";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const ReviewCart = ({ review, createdAt, user }) => {
  const stars = [];
  let reviewText;

  for (let i = 0; i < review; i++) {
    stars.push(i);
  }

  switch (review) {
    case 1:
      reviewText = "Poor!";
      break;
    case 2:
      reviewText = "Fair!";
      break;
    case 3:
      reviewText = "Good!";
      break;
    case 4:
      reviewText = "Very Good!";
      break;
    case 5:
      reviewText = "Excellent!";
      break;
    default:
      reviewText = "";
      break;
  }

  return (
    <>
      <div className="review bg-slate-200 p-3 dark:bg-slate-800 dark:text-white/70">
        <h1>{user?.username}</h1>
        <div className="stars flex text-yellow-500">
          {stars?.length && stars?.map((s) => <FaStar key={s} />)}
        </div>
        <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
        <p>{reviewText}</p>
      </div>
    </>
  );
};

export default ReviewCart;
