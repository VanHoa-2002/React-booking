import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
const SlidePanel = ({ doctorId, ticketPrice, timeSlots, role }) => {
  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("token")
              ?.replace(/['"]+/g, "")}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const formatTime = (time) => moment(time, "HH:mm").format("hh:mm A");
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice ? ticketPrice + " USD" : "No data"}
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
      {role === "patient" && ticketPrice && (
        <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
          Book Appointment
        </button>
      )}
    </div>
  );
};

export default SlidePanel;
