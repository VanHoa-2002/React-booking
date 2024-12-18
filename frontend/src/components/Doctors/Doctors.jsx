import React from "react";
import DoctorCard from "./DoctorCard";
import { doctors } from "../../assets/data/doctors";
const DoctorsList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {doctors.map((doctor, index) => (
        <DoctorCard key={index} doctor={doctor}></DoctorCard>
      ))}
    </div>
  );
};

export default DoctorsList;
