import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const CheckoutSuccess = () => {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches zero
          navigate("/home");
          return prev; // Ensure the time doesn't go below zero
        }
      });
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [navigate]);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 flex flex-col  items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6459/6459980.png"
          alt=""
          width={100}
          className="mx-auto"
        />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done Successfully!
          </h3>
          <p className="text-gray-600 my-2">
            Your payment has been successfully processed. You will be redirected
            to the home page in {time} seconds
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <Link
              to={"/home"}
              className="px-12 bg-slate-700 text-white font-semibold py-3 uppercase"
            >
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
