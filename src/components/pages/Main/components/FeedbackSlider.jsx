import "swiper/css";
import "swiper/css/pagination";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SliderButtons from "./SliderButtons";
import { useTranslation } from "@helpers/translate";
import User from "@assets/images/icons/user.svg";

const feedbacks = Array(5).fill({
  text: "Binify is the most user-friendly platform I’ve used. Fast deposits and support that actually replies. Feels like it’s built for real traders.",
  userName: "John Smith",
  userExperience: "3 years of experience",
  userImage: User,
});

const FeedbackSlider = () => {
  const { __ } = useTranslation();

  return (
    <div className="slider-container">
      <Swiper
        modules={[Pagination, Navigation]}
        className="mySwiper"
        slidesPerView="auto"
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          428: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
        }}
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide
            className="swiper-slide"
            style={{ width: "fit-content" }}
            key={index}
          >
            <div className="feedback-card">
              <p className="feedback-card__text">{feedback.text}</p>
              <div className="feedback-card__user-info">
                <img src={feedback.userImage} alt="user" />
                <div className="feedback-card__user-decscription-container">
                  <p className="feedback-card__user-decscription feedback-card__user-decscription--bold">
                    {feedback.userName}
                  </p>
                  <p className="feedback-card__user-decscription">
                    {feedback.userExperience}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SliderButtons />
      </Swiper>
    </div>
  );
};

export default FeedbackSlider;
