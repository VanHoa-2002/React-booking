import React from "react";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import DoctorCard from "./DoctorCard";
import Loading from "../Loader/Loading";
import Error from "../Error/Error";
import Empty from "../../pages/Empty/Empty";
const DoctorsList = () => {
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?page=1&perPage=3`);
  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
          {!doctors.length && <Empty />}
        </div>
      )}
    </>
  );
};

export default DoctorsList;
