import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
  };

  const banners = [
    { src: "/images/banner1.jpg", alt: "Banner 1" },
    { src: "/images/banner2.jpg", alt: "Banner 2" },
    { src: "/images/banner3.jpg", alt: "Banner 3" },
  ];

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {banners.map((b, i) => (
          <div
            key={i}
            className="slider-item"
          >
            <img
              src={b.src}
              alt={b.alt}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
