import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { HiStar } from "react-icons/hi";
import { testimonials } from "../../assets/data/customer";
import { Pagination } from "swiper";
const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="py-[30px] px-5 rounded-3">
              <div className="flex items-center gap-[13px]">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                  <img src={testimonial.avatar} className="max-w-md" alt="" />
                </div>
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    {Array.from({ length: testimonial.rating }, (_, index) => (
                      <HiStar
                        key={index}
                        className="text-yellowColor w-[18px] h-5"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                {testimonial.feedback}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
