import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const FeedbackForm = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const handSubmitReview = async (e) => {
    e.preventDefault();
    console.log(rating, reviewText);
    // Here you can send the rating and reviewText to the backend
  };
  return (
    <form>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
          How was your experience with the doctor?
        </h3>
      </div>
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            key={index}
            type="button"
            className={`${
              index <= ((rating && hover) || hover)
                ? "text-yellowColor"
                : "text-gray-400"
            } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            onDoubleClick={() => {
              setHover(0);
              setRating(0);
            }}
          >
            <span>
              <AiFillStar />
            </span>
          </button>
        );
      })}
      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback
        </h3>
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-3 py-3 rounded-md"
          rows={5}
          placeholder="Write your text"
          onChange={(text) => setReviewText(text)}
        ></textarea>
      </div>
      <button type="submit" onClick={handSubmitReview} className="btn">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
