import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
const Profile = ({ userData }) => {
  const [selectFile, setSelectFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    password: "",
    gender: "",
    bloodType: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        photo: userData.photo,
        password: userData.password,
        bloodType: userData.bloodType,
        gender: userData.gender,
      });
    }
  }, [userData]);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectFile(data);
    setFormData({ ...formData, photo: data.url });
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("token")
            ?.replace(/['"]+/g, "")}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="mt-10">
      <form onSubmit={submitHandle}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Fullname"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            aria-readonly
            readOnly
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-not-allowed"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="bloodType"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select
              value={formData.gender || ""}
              onChange={handleInputChange}
              name="gender"
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo || ""}
                className="w-full rounded-full object-cover"
                alt=""
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              onChange={handleFileChange}
              name="photo"
              id="customFile"
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectFile ? selectFile.display_name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            type="submit"
          >
            {loading ? (
              <HashLoader color="#fff" loading={loading} size={35} />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
