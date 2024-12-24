import React, { useState } from "react";
import { useParams } from "react-router-dom";
import doctoring from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Feedback from "./Feedback";
import SlidePanel from "./SlidePanel";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
import DoctorAbout from "./DoctorAbout";
const DoctorDetail = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  const {
    name,
    qualifications,
    timeSlots,
    reviews,
    bio,
    about,
    specialization,
    averageRating,
    totalRating,
    photo,
    totalPatients,
    experiences,
    ticketPrice,
  } = doctor || {};
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loading />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} className="w-full" alt="" />
                </figure>
                <div>
                  <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" />
                      {averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-textColor">
                      ({totalRating})
                    </span>
                  </div>
                  <div className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                    {bio}
                  </div>
                </div>
              </div>
              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>
              <div className="mt-[50px]">
                {tab === "about" && (
                  <DoctorAbout
                    about={about}
                    experiences={experiences}
                    name={name}
                    qualifications={qualifications}
                    key={id}
                  />
                )}
                {tab === "feedback" && (
                  <Feedback totalRating={totalRating} reviews={reviews} />
                )}
              </div>
            </div>
            <div>
              <SlidePanel
                doctorId={doctor._id}
                ticketPrice={ticketPrice}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetail;
