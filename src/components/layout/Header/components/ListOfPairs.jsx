import React, { useState, useEffect, useRef } from "react";
import { CloseIcon } from "@components/library";
import { useDispatch, useSelector } from "react-redux";
import { TRADING } from "../../../../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const ListOfPairs = ({setShowPairs}) => {
  const { userPairList, pair: activePair } = useSelector(
    (state) => state.trading
  );
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [prevPairListLength, setPrevPairListLength] = useState(
    userPairList.length
  );

  const removePair = (slug) => {
    dispatch({ type: TRADING.DELETE_FROM_USER_PAIR_LIST, payload: slug });
  };

  const changeCurrentPair = (pair) => {
    dispatch({ type: TRADING.CHANGE_PAIR, payload: pair });
  };

  useEffect(() => {
    setPrevPairListLength(userPairList.length);
  }, [userPairList.length]);

  return (
    <div className="pairsList">
      <Swiper
        ref={swiperRef}
        onSlidesUpdated={(swiper) => {
          if (swiper.slides.length > prevPairListLength) {
            console.log(
              "onSlidesLengthChange",
              swiper.slides.length,
              prevPairListLength
            );
            swiper.slideTo(swiper.slides.length - 1);
          }
        }}
        resistanceRatio={0}
        spaceBetween={8}
        slidesPerView="auto"
      >
        {userPairList.map((pair) => (
          <SwiperSlide key={pair.slug}>
            <div
              onClick={() => changeCurrentPair(pair)}
              className={`pairTab${
                activePair.slug === pair.slug ? " active" : ""
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePair(pair.slug);
                }}
                type="button"
                className="pairTab__close"
              >
                <CloseIcon/>
              </button>

              <div className="pairTab__content">
                <picture className="pairTab__icon">
                  <img src={pair.cover}/>
                </picture>
                <div className="pairTab__info">
                  <p className="pairTab__name">{pair.name}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button onClick={() => setShowPairs(true)} type="button">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#707070" strokeWidth="1.5"/>
          <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#707070" strokeWidth="1.5"
                strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};
