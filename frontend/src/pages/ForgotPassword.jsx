import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext";
const ForgotPassword = () => {
  const [page, setPage] = useState("E_OTP");
  const location = useLocation(); // Access the state here
  const { otpGender, email } = location.state;
  const [otp, setOtp] = useState(Array(4).fill("")); // Array with 4 empty strings
  const inputRefs = useRef([]); // Array of refs for each input field
  const [time, setTime] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches zero
          return prev; // Ensure the time doesn't go below zero
        }
      });
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  const [formData, setFormData] = useState({
    password: "",
    rePassword: "",
    email: email || "",
  });
  const handleKeyDown = (e) => {
    // Allow only numeric keys, Backspace, Delete, Tab, or Meta keys
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
      return;
    }

    const index = inputRefs.current.indexOf(e.target);

    if (e.key === "Delete" || e.key === "Backspace") {
      if (index >= 0 && index < inputRefs.current.length) {
        setOtp((prevOtp) => {
          // Prevent deleting if already empty
          if (prevOtp[index] === "") {
            return prevOtp;
          }

          // Replace current index with an empty string
          return [...prevOtp.slice(0, index), "", ...prevOtp.slice(index + 1)];
        });

        // Move focus to the previous input if Backspace
        if (e.key === "Backspace" && index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);

    if (index !== -1 && /^[0-9]{1}$/.test(target.value)) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);

      // Move focus to the next input if not the last field
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    // Automatically select the current input value on focus
    e.target.select();
  };

  const handlePaste = (e) => {
    console.log("Pasting...");
    e.preventDefault();

    const text = e.clipboardData.getData("text");

    // Ensure the pasted text has the same length as the OTP array and contains only digits
    if (!/^\d+$/.test(text) || text.length !== otp.length) {
      return;
    }

    const digits = text.split("");
    setOtp((prevOtp) =>
      digits.map((digit, i) => (i < prevOtp.length ? digit : prevOtp[i]))
    );

    // Focus the last input field
    const lastIndex = Math.min(digits.length - 1, inputRefs.current.length - 1);
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleOtp = (e) => {
    e.preventDefault();
    if (otp.some((digit) => !digit)) {
      toast.warning("Please enter a valid OTP code");
      return;
    }
    const otpValue = Number.parseInt(otp.join(""));
    if (otpValue !== otpGender) {
      toast.warning("Invalid OTP code");
      setOtp(Array(4).fill(""));
    } else {
      toast.success("OTP verified successfully");
      setPage("E_RESET");
    }
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      toast.warning("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.role,
          token: result.token,
        },
      });
      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const handleResend = async () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    try {
      const res = await fetch(`${BASE_URL}/auth/get-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, otpGender: otp }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.success("OTP sent to your email address");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {page === "E_OTP" && (
        <section className="px-5 lg:px-0">
          <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-2 text-center">
              Verification{" "}
              <span className="text-primaryColor">Your Email </span>
              Account 🛡
            </h3>
            <p className="text-center text-gray-500">
              Enter the 4-digit code sent to your email address to verify your
              email
            </p>
            <form
              onSubmit={handleOtp}
              id="otp-form"
              className="flex flex-col items-center mt-5"
            >
              <div className="flex gap-2 justify-center mt-5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
                  />
                ))}
              </div>
              <button type="submit" className="btn rounded-lg">
                Verify Account
              </button>
              <p className="text-center mt-5">
                Did not receive code?{" "}
                <button
                  type="button"
                  disabled={time !== 0}
                  onClick={handleResend}
                  className={`${time !== 0 ? "cursor-not-allowed" : "cursor-pointer"} text-primaryColor font-bold`}
                >
                  Resend (00:{time < 10 ? `0${time}` : time}){" "}
                </button>
              </p>
            </form>
          </div>
        </section>
      )}
      {page === "E_RESET" && (
        <section className="px-5 lg:px-0">
          <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-2 text-center">
              Reset <span className="text-primaryColor">Your Password </span>⚙
            </h3>
            <form className="py-4 md:py-0" onSubmit={submitHandle}>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter new password"
                  name="password"
                  value={FormData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  name="rePassword"
                  value={FormData.rePassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                />
              </div>
              <div className="mt-7">
                <button
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                  type="submit"
                >
                  {loading ? (
                    <HashLoader color="#fff" loading={loading} size={25} />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default ForgotPassword;
