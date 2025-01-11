import React, { useState } from "react";
import { formatterDate } from "../../utils/formatterDate";
import { defaultImg } from "../../config";

const Appointments = ({ appointments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormDataRes] = useState({
    subject: "[Response] Medical Booking System",
    message: "",
  });
  const handleInputChange = (e) => {
    setFormDataRes({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandle = (e) => {};
  const handleAction = () => {};
  const Modal = ({ item }) => {
    return (
      <div>
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-10">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            <div className="p-4 md:p-5 flex flex-col gap-2">
              <h3 className="text-xl text-green-600 border-b mb-2">
                Response to patient
              </h3>
              <h3 className="text-headingColor border-b mb-2 pb-2">
                <span className="text-red-500"> To: </span>
                <span className="border rounded-full px-1">
                  {item?.user?.email}
                </span>
              </h3>
              <form onSubmit={submitHandle}>
                <div className="text-headingColor border-b mb-2 pb-2 flex">
                  <span> Subject:</span>
                  <input
                    className="w-full outline-none"
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="border p-1">
                  <textarea
                    className="outline-none w-full"
                    rows={5}
                    placeholder="Message"
                    name="message"
                    value={formData.message || ""}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
              <div className="flex gap-1 items-center justify-end">
                <button
                  onClick={() => handleAction()}
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Send
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <table className="flex flex-col w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Price (USD)
          </th>
          <th scope="col" className="px-6 py-3">
            Booked On
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody
        className="flex-1 max-h-[500px] overflow-auto
        [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {appointments.length > 0 &&
          appointments.map((appointment) => (
            <tr key={appointment._id}>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
              >
                <img
                  src={
                    appointment?.user?.photo
                      ? appointment?.user?.photo
                      : defaultImg
                  }
                  onError={(e) => {
                    e.target.src = defaultImg;
                  }}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {appointment?.user?.name}
                  </div>
                  <div className="text-normal text-gray-500">
                    {appointment?.user?.email}
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">{appointment?.user?.gender}</td>
              <td className="px-6 py-4">
                {appointment?.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    Paid
                  </div>
                )}
                {!appointment?.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    Unpaid
                  </div>
                )}
              </td>
              <td className="px-6 py-4">{appointment?.ticketPrice}</td>
              <td className="px-6 py-4">
                {formatterDate(appointment?.createdAt)}
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  title="Send mail to patient"
                  className={`${
                    appointment.isApproved === "approved"
                      ? "cursor-not-allowed bg-slate-300"
                      : "cursor-pointer bg-green-500 hover:bg-green-200 "
                  } text-white focus:outline-none font-medium rounded-md text-sm p-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700`}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  <svg
                    className="w-6 h-6 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Uploaded to svgrepo.com"
                    width="32"
                    height="32"
                    fill="#000"
                    viewBox="0 0 32 32"
                  >
                    <path d="M29.456,3.46L1.911,12.642L9,18.155v11.669l5.803-7.156l7.768,6.042L29.456,3.46z M6.089,13.358  l16.607-5.536l-12.443,8.775L6.089,13.358z M11,18.518l10.686-7.543L11,24.175V18.518z M16.055,21.109l9.827-12.144L21.43,25.29  L16.055,21.109z" />
                  </svg>
                </button>
                {isModalOpen && <Modal item={appointment} />}
              </td>
            </tr>
          ))}
        {appointments.length === 0 && (
          <tr>
            <td colSpan="5" className="text-[14px] text-center py-4">
              You have no appointments yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Appointments;
