import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formatterDate } from "../../utils/formatterDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
const Feedback = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews (272)
        </h4>
        <div className="flex justify-between gap-10 mb-[30px]">
          <div className="flex gap-3">
            <figure className="w-10 h-10 rounded-full">
              <img className="w-full" src={avatar} alt="" />
            </figure>
            <div>
              <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                Ali alam
              </h5>
              <p className="text-[14px] text-textColor leading-6">
                {formatterDate("2021-09-01")} - {formatterDate("2025-09-01")}
              </p>
              <p className="text__para mt-3 font-medium text-[15px]">
                Good doctor, very professional and friendly. I would recommend
                him to anyone.
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <AiFillStar key={index} color="#0067ff"></AiFillStar>
            ))}
          </div>
        </div>
      </div>
      {!showFeedback && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedback(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedback && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
