import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Import fade effect CSS
import "./Header.css"; // Import custom CSS

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import { assest } from "../../assest/assest";

const Header = () => {
  return (
    <div className="hero-container">
      {/* Left Side - Headings */}
      <div className="hero-text">
        <h1>AUDIO DIARY STUDIO</h1>
        <h2>Begin Your Musical Journey Today</h2>
        <p>Start your musical journey today and explore a world of rhythm, melody, and creativity.</p>
        <div className="hero-buttons">
          <button className="hero-button">Explore Now</button>
          <button className="hero-button contact-button">Contact Us</button>
        </div>
      </div>

      {/* Right Side - Image Carousel */}
      <div className="hero-carousel">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="swiper-container"
        >
          <SwiperSlide>
            <img src={assest.L4} alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={assest.L10} alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={assest.L2} alt="Slide 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={assest.L6} alt="Slide 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={assest.L9} alt="Slide 5" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Header;