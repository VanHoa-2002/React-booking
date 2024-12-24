import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex gap-[50px] lg:gap-[130px] xl:gap-0 lg:flex-row flex-col justify-between">
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>
          {/* content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">
              Proud to be one of the best medical care in the world
            </h2>
            <p className="text__para">
              We are a team of medical health professionals who are dedicated to
              providing the best medical care to our patients. Our team is made
              up of doctors, nurses, and other healthcare professionals who are
              committed to providing the best possible care for our patients. We
              are proud to be one of the best medical care providers in the
              world, and we are committed to providing the highest quality care
              to our patients.
            </p>{" "}
            <p className="text__para mt-[30px]">
              Our team is dedicated to providing the best possible care for our
              patients, and we are committed to providing the highest quality
              care to our patients. We are proud to be one of the best medical
              care providers in the world, and we are committed to providing the
              highest quality care to our patients.
            </p>
            <Link to={"/"}>
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      ;
    </section>
  );
};

export default About;
