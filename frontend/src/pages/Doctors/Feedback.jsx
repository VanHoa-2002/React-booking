import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { defaultImg } from "../../config";
import { formatterDate } from "../../utils/formatterDate";
import FeedbackForm from "./FeedbackForm";
const Feedback = ({ totalRating, reviews, setReviews, role, token }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const handleFeedback = () => {
    if (!token) {
      toast.info("Please login to give feedback");
    } else {
      setShowFeedback(true);
    }
  };
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>
        {reviews.map((review, index) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img
                  className="w-full"
                  src={review?.photo ? review?.photo : defaultImg}
                  alt=""
                />
              </figure>
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review?.user?.name || "Anonymous"}
                </h5>
                <p className="text-[14px] text-textColor leading-6">
                  {formatterDate(review.createdAt)}
                </p>
                <p className="text__para mt-3 font-medium text-[15px]">
                  {review?.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(review?.rating)].map((_, index) => (
                <AiFillStar key={index} color="#0067ff"></AiFillStar>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!showFeedback && (
        <div className="text-center">
          {role === "patient" && (
            <button className="btn" onClick={handleFeedback}>
              Give Feedback
            </button>
          )}
        </div>
      )}
      {showFeedback && <FeedbackForm setUpdate={setReviews} />}
    </div>
  );
};

export default Feedback;
