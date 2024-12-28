import { delay } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
import { BASE_URL, defaultImg } from "../../config";
import useFetchData from "../../hooks/useFetchData";

const Admin = () => {
  const [tab, setTab] = useState("doctor");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [doctorList, setDoctorList] = useState([]);
  let {
    data: userData,
    loading,
    error,
    pagination,
  } = useFetchData(`${BASE_URL}/users`);

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `${BASE_URL}/doctors/?page=${page}&perPage=${perPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`,
          },
        }
      );
      const result = await response.json();
      // Assuming the API response has `data` and `totalPages`
      setDoctorList(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const toggleModal = () => {};
  window.onkeyup = (e) => {
    if (e.key === "Escape" && isModalOpen) {
      setIsModalOpen(false);
    }
  };
  const handleAction = async () => {
    if (action === "approve") {
      await approveDoctor(id);
    } else {
      if (tab === "user") {
        await deleteAccount(id);
      } else {
        await deleteDoctor(id);
      }
    }
  };
  const approveDoctor = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/doctors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`,
        },
        body: JSON.stringify({ isApproved: "approved" }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      setIsModalOpen(false);
      if (data.message) {
        navigate(0);
      }
    } catch (error) {
      toast.error(error.message);
      setIsModalOpen(false);
    }
  };
  const deleteAccount = async () => {};
  const deleteDoctor = async () => {
    try {
      const res = await fetch(`${BASE_URL}/doctors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      setIsModalOpen(false);
      if (data.message) {
        delay(() => {
          navigate(0);
        }, 1000);
      }
    } catch (error) {
      toast.error(error.message);
      setIsModalOpen(false);
    }
  };
  const Modal = ({ action, id }) => {
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

            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to {action} this account?
              </h3>
              <button
                onClick={() => handleAction()}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I am sure
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
    );
  };
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid gap-2">
            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("user")}
                className={`${
                  tab === "user" &&
                  "border-b-[2px] border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                User Account
              </button>
              <button
                onClick={() => setTab("doctor")}
                className={`${
                  tab === "doctor" &&
                  "border-b-[2px] border-solid border-primaryColor"
                } py-2 px-5 mr-5 text-[16px] leading-7  text-headingColor font-semibold`}
              >
                Doctor Account
              </button>
            </div>
            <div className="mt-[50px] overflow-x-auto">
              {tab === "doctor" && (
                <>
                  <nav className="mb-2">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={`${page === 1 ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-100 hover:text-gray-700"} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                        >
                          <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 1 1 5l4 4"
                            />
                          </svg>
                        </a>
                      </li>
                      {Array.from(
                        { length: doctorList?.pagination?.pageCount },
                        (_, index) => index + 1
                      ).map((item) => {
                        return (
                          <li
                            key={item}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(item);
                            }}
                          >
                            <a
                              href="#"
                              className={`${item === page ? "bg-[#ebf5ff] text-primaryColor" : ""} font-medium flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                              {item}
                            </a>
                          </li>
                        );
                      })}

                      <li>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < doctorList?.pagination?.pageCount)
                              setPage(page + 1);
                          }}
                          href="#"
                          className={`${page >= doctorList.pagination.pageCount ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-100 hover:text-gray-700"} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 9 4-4-4-4"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <table className="w-full text-left text-sm text-gray-500 table-auto min-h-[400px] border border-solid border-[#f9fafb]">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Rating
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Control
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorList?.data?.length > 0 &&
                        doctorList?.data?.map((doctor) => (
                          <tr
                            key={doctor._id}
                            className="border-b border-gray-200"
                          >
                            <th
                              scope="row"
                              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                            >
                              <img
                                src={doctor?.photo ? doctor?.photo : defaultImg}
                                onError={(e) => {
                                  e.target.src = defaultImg;
                                }}
                                className="w-10 h-10 rounded-full"
                                alt=""
                              />
                              <div className="pl-3">
                                <div className="text-base font-semibold">
                                  {doctor?.name}
                                </div>
                                <div className="text-normal text-gray-500">
                                  {doctor?.email}
                                </div>
                                <span className="text-stone-400 font-normal text-[14px]">
                                  {doctor?.specialization}{" "}
                                  {doctor?.specialization &&
                                    doctor?.phone &&
                                    "-"}{" "}
                                  {doctor?.phone}
                                </span>
                              </div>
                            </th>
                            <td className="px-6 py-4 capitalize">
                              {doctor?.gender}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div
                                  className={`${doctor?.isApproved === "approved" ? "bg-green-500" : "bg-red-500"} h-2.5 w-2.5 rounded-full mr-2`}
                                ></div>
                                {doctor?.isApproved}
                              </div>
                            </td>
                            <td className="px-6 py-4">{doctor?.ticketPrice}</td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2 flex-col">
                                <span>Total: {doctor.totalRating}</span>
                                <span>Average: {doctor.averageRating}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 flex">
                              <button
                                type="button"
                                title="Approve"
                                disabled={doctor.isApproved === "approved"}
                                className={`${
                                  doctor.isApproved === "approved"
                                    ? "cursor-not-allowed bg-slate-300"
                                    : "cursor-pointer bg-green-500 hover:bg-green-200 "
                                } text-white focus:outline-none font-medium rounded-md text-sm p-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700`}
                                onClick={() => {
                                  setIsModalOpen(true);
                                  setAction("approve");
                                  setId(doctor._id);
                                }}
                              >
                                <svg
                                  className="w-6 h-6 text-white dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 11.917 9.724 16.5 19 7.5"
                                  />
                                </svg>
                              </button>

                              <button
                                type="button"
                                title="Delete"
                                className="text-white active:outline-none border-none bg-red-500 hover:bg-red-200 focus:outline-none  font-medium rounded-md text-sm p-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                                onClick={() => {
                                  setIsModalOpen(true);
                                  setAction("delete");
                                  setId(doctor._id);
                                }}
                              >
                                <svg
                                  className="w-6 h-6 text-white dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                              </button>
                              {isModalOpen && <Modal action={action} />}
                            </td>
                          </tr>
                        ))}
                      {doctorList?.data?.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-[14px] text-center py-4"
                          >
                            No data found!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              )}
              {tab === "user" && (
                <h1>aaa</h1>

                //   <Feedback
                //     totalRating={totalRating}
                //     reviews={reviews}
                //     setReviews={setReviews}
                //     role={role}
                //     token={token}
                //   />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
