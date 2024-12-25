import React, { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
import { BASE_URL, defaultImg } from "../../config";
import useGetProfile from "../../hooks/useFetchData";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Tabs from "./Tabs";
import Appointments from "./Appointments";
const Dashboard = () => {
  let { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );
  const [dataUpdate, setDataUpdate] = useState(data);
  const [tab, setTab] = useState("overview");
  if (dataUpdate) {
    data = dataUpdate;
  }
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a1 1 0 011 1v5a1 1 0 01-2 0V7a1 1 0 011-1zm0 8a1 1 0 110-2 1 1 0 010 2z"
                      clipRule={"evenodd"}
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    Your account is under review. You will be notified once it
                    is approved.
                  </div>
                </div>
              )}
              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px] overflow-hidden">
                        <img
                          src={data?.photo ? data?.photo : defaultImg}
                          className="w-full"
                          alt=""
                        />
                      </figure>
                      <div>
                        <span className="bg-[#ccf0f3] capitalize text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rouder text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.specialization
                            ? data.specialization
                            : "No data"}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>
                        <div
                          className="flex
                         items-center gap-[6px]"
                        >
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="" />
                            {data.averageRating}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                          {data.bio
                            ? data.bio
                            : "No data available, please update your profile!"}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      about={data.about}
                      experiences={data.experiences}
                      name={data.name}
                      qualifications={data.qualifications}
                      key={data._id}
                    />
                  </div>
                )}
                {tab === "appointments" && (
                  <Appointments appointments={data.appointments} />
                )}
                {tab === "settings" && (
                  <Profile
                    setTab={setTab}
                    doctorData={data}
                    setUpdate={setDataUpdate}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
