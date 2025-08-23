import React, { useState, useEffect } from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import { carouselImages } from "../data/products";

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Auto play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container mb-4">
      <BootstrapCarousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={true}
        interval={5000}
        pause="hover"
        className="custom-carousel"
        fade={false}
      >
        {carouselImages.map((image) => (
          <BootstrapCarousel.Item key={image.id}>
            <div className="carousel-image-wrapper">
              <img
                className="carousel-image"
                src={image.src}
                alt={image.alt}
              />
            </div>
            <BootstrapCarousel.Caption className="carousel-caption">
              <div className="caption-content">
                <h2 className="carousel-title">{image.title}</h2>
                <p className="carousel-description">{image.description}</p>
                <div className="carousel-cta">
                  <button className="btn btn-primary btn-lg">Order Now</button>
                </div>
              </div>
            </BootstrapCarousel.Caption>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;
