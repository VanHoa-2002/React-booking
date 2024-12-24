import React from "react";
import moment from "moment";
const SlidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const formatTime = (time) => moment(time, "HH:mm").format("hh:mm A");
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} BOT
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available time slots:
        </p>
        <ul className="mt-3">
          {timeSlots.map((slot, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold capitalize">
                {slot.day}
              </p>
              <p className="text-[15px] leading-5 text-textColor font-semibold">
                {formatTime(slot.startingTime)} - {formatTime(slot.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  );
};

export default SlidePanel;
