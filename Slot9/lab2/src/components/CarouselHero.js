import React from "react";
import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";

export default function CarouselHero({ items }) {
  return (
    <Carousel
      interval={3500}
      pause="hover"
      controls
      indicators
      fade
      className="mb-4"
    >
      {items.map((m) => (
        <Carousel.Item key={m.id}>
          <img
            className="d-block w-100"
            src={m.poster}
            alt={m.title}
          />
          <Carousel.Caption>
            <h3>{m.title}</h3>
            <p>{m.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

CarouselHero.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
    })
  ).isRequired,
};
