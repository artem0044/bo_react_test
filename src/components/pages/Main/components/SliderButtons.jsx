import { React } from "react";
import { useSwiper } from "swiper/react";
import LeftArrow from "@assets/images/icons/grey-arrow-left.svg";
import RightArrow from "@assets/images/icons/grey-arrow-right.svg";

const SlideButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="slider-button-container">
      <button onClick={() => swiper?.slidePrev()}>
        <img src={LeftArrow} alt="" />
      </button>
      <button onClick={() => swiper?.slideNext()}>
        <img src={RightArrow} alt="" />
      </button>
    </div>
  );
};

export default SlideButtons;
