import React, { useContext, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";

const FeedbackForm = ({ setUpdate }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useContext(authContext);
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!rating || !reviewText) {
        setLoading(false);
        toast.error("Please fill all the fields to submit the review");
      } else {
        const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage
              .getItem("token")
              ?.replace(/"/g, "")}`,
          },
          body: JSON.stringify({ rating, reviewText, user }),
        });
        const result = await res.json();
        if (!result.success) {
          throw new Error(result.message);
        }
        setLoading(false);
        toast.success("Review submitted successfully");
        console.log("result", result.data);

        setUpdate(result.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
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
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmitReview} className="btn">
        {loading ? <HashLoader color="#fff" size={25} /> : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
