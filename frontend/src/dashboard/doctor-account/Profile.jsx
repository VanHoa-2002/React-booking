import cloneDeep from "lodash/cloneDeep";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const qualifiItem = {
  startingDate: "",
  endingDate: "",
  degree: "",
  university: "",
};
const experiencesItem = {
  startingDate: "",
  endingDate: "",
  position: "",
  hospital: "",
};
const timeSlotItem = {
  day: "",
  startingTime: "",
  endingTime: "",
};
const Profile = ({ doctorData, setTab, setUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: "",
    password: "",
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      { startingDate: "", endingDate: "", position: "", hospital: "" },
    ],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
    photo: "",
  });
  useEffect(() => {
    setFormData({
      name: doctorData.name,
      email: doctorData.email,
      phone: doctorData.phone,
      bio: doctorData.bio,
      gender: doctorData.gender,
      specialization: doctorData.specialization,
      ticketPrice: doctorData.ticketPrice,
      qualifications: doctorData.qualifications,
      experiences: doctorData.experiences,
      timeSlots: doctorData.timeSlots,
      about: doctorData.about,
      photo: doctorData.photo,
    });
  }, [doctorData]);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleReusableInputChange = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItem = [...prevFormData[key]];
      updateItem[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItem,
      };
    });
  };
  const handleQualificationChange = (event, key, index) => {
    handleReusableInputChange(key, index, event);
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };
  const updateProfileHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("token")
            ?.replace(/['"]+/g, "")}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setUpdate(result.data);
      setTimeout(() => {
        setTab("overview");
      }, 500);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const addItem = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], value],
    }));
  };
  const addNewForm = (e, key, item) => {
    e.preventDefault();
    addItem(key, item);
  };
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };
  const deleteForm = (e, key, index) => {
    e.preventDefault();
    deleteItem(key, index);
  };
  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form onSubmit={updateProfileHandle}>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            placeholder="Phone"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization || ""}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="form__label">Ticket Price*</p>
              <select
                name="ticketPrice"
                value={formData.ticketPrice || ""}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form__label">Qualifications*</p>
          {formData.qualifications.map((qualification, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={qualification.startingDate}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "qualifications", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={qualification.endingDate}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "qualifications", index)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Degree*</p>
                    <input
                      type="text"
                      placeholder="Degree"
                      name="degree"
                      value={qualification.degree}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "qualifications", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form__label">University*</p>
                    <input
                      type="text"
                      placeholder="University"
                      name="university"
                      value={qualification.university}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "qualifications", index)
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteForm(e, "qualifications", index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete></AiOutlineDelete>
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={(e) =>
              addNewForm(e, "qualifications", cloneDeep(qualifiItem))
            }
            className="bg-[#000] py-2 px-5 rounded text-white h-fit"
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Experiences*</p>
          {formData.experiences.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "experiences", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "experiences", index)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Hospital*</p>
                    <input
                      type="text"
                      placeholder="Hospital"
                      name="hospital"
                      value={item.hospital}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "experiences", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      type="text"
                      placeholder="Position"
                      name="position"
                      value={item.position}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "experiences", index)
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteForm(e, "experiences", index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete></AiOutlineDelete>
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={(e) =>
              addNewForm(e, "experiences", cloneDeep(experiencesItem))
            }
            className="bg-[#000] py-2 px-5 rounded text-white h-fit"
          >
            Add Experience
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Time Slot*</p>
          {formData.timeSlots.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form__label">Day*</p>
                    <select
                      name="day"
                      value={item.day}
                      className="form__input py-3.5"
                      onChange={(e) =>
                        handleQualificationChange(e, "timeSlots", index)
                      }
                    >
                      <option value="">Select</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form__label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "timeSlots", index)
                      }
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form__input"
                      onChange={(e) =>
                        handleQualificationChange(e, "timeSlots", index)
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteForm(e, "timeSlots", index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2  cursor-pointer"
                    >
                      <AiOutlineDelete></AiOutlineDelete>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={(e) => addNewForm(e, "timeSlots", cloneDeep(timeSlotItem))}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit"
          >
            Add Time Slot
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            value={formData.about || ""}
            onChange={handleInputChange}
            placeholder="Write about yourself"
            className="form__input"
            rows={5}
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                className="w-full rounded-full"
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
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
