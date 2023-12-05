import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'

const Slider = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={2}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img src="images/compiler.png" style={{width: "100%"}}/></SwiperSlide>
      <SwiperSlide><img src="images/defichain.png" style={{width: "100%"}}/></SwiperSlide>
      <SwiperSlide><img src="images/deploy.png" style={{width: "100%"}}/></SwiperSlide>
      <SwiperSlide><img src="images/erc20.png" style={{width: "100%"}}/></SwiperSlide>
      <SwiperSlide><img src="images/goerli.png" style={{width: "100%"}}/></SwiperSlide>
      <SwiperSlide><img src="images/soltsdev.png" style={{width: "100%"}}/></SwiperSlide>
    </Swiper>
  );
};

export default Slider;
