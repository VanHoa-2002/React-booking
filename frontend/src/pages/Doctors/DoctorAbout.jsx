import React from "react";
import { formatterDate } from "../../utils/formatterDate";
const DoctorAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            Muhi balamn
          </span>
        </h3>
        <p className="text__para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          veritatis incidunt. Ipsam exercitationem accusamus, labore unde
          aperiam minima dolor animi! Repellendus ab labore modi rem sed illum
          reiciendis et nihil.
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[18px] leading-6">
                {formatterDate("2021-09-01")} - {formatterDate("2025-09-01")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHP in Nel
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New York University of Art & Design
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[18px] leading-6">
                {formatterDate("01-05-2024")} - {formatterDate("05-02-2028")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                Hu in Jeal
              </p>
            </div>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New York University of Art & Design
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Expericence
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formatterDate("01-05-2024")} - {formatterDate("05-02-2028")}
            </span>
            <p className="text-[15px] leading-6 font-medium text-textColor">
              PHP in Nel
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New York University of Art & Design
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
