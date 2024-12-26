import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState(Array(4).fill("")); // Array with 4 empty strings
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
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
  const handleCheckEmail = async (e) => {
    if (!formData.email) {
      toast.warning("Please enter your email address");
      e.preventDefault();
    } else {
      const otp = Math.floor(1000 + Math.random() * 9000);
      setOtp(otp.toString().split(""));
      try {
        const res = await fetch(`${BASE_URL}/auth/get-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, otpGender: otp }),
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        toast.success("OTP sent to your email address");
        navigate("/forgot-password", {
          state: { email: formData.email, otpGender: otp },
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello <span className="text-primaryColor">Welcome</span> Back 🎉
        </h3>
        <form className="py-4 md:py-0" onSubmit={submitHandle}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your mail"
              name="email"
              value={FormData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              autoComplete="on"
              placeholder="Enter your password"
              name="password"
              value={FormData.password}
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
                "Login"
              )}
            </button>
          </div>
          <div className="flex justify-between items-center mt-5">
            <p className="text-textColor">
              Do not have an account?
              <Link
                to={"/register"}
                className="text-primaryColor ml-1 font-medium"
              >
                Register
              </Link>
            </p>
            <p>
              <NavLink
                className="text-primaryColor ml-1 font-medium"
                onClick={handleCheckEmail}
              >
                Forgot Password
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
