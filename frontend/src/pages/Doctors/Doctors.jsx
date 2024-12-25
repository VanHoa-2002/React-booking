import React, { useEffect, useState } from "react";
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import Empty from "../Empty/Empty";
const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounce}`);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = () => {
    setQuery(query.trim());
  };
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0006ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-2 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search doctor by name or speciality"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loading />}
          {error && <Error />}
          {!loading && !error && (
            <>
              {doctors.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                  {doctors.map((doctor, index) => (
                    <DoctorCard key={index} doctor={doctor} />
                  ))}
                </div>
              )}
              {!doctors.length && (
                <Empty
                  message={
                    <>
                      No result found for{" "}
                      <span className="text-xl font-bold text-red-500">
                        {query}
                      </span>
                    </>
                  }
                />
              )}
            </>
          )}
        </div>
      </section>
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center">
              We are committed to providing the best possible care for our
              patients. Our team is dedicated to providing the highest quality
              care to our patients.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
