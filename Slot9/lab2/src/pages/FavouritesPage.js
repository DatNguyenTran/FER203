import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import MovieCard from "../components/MovieCard";

export default function FavouritesPage({ movies, onToggleFav }) {
  if (!movies.length) return <Alert variant="info">No favourites yet.</Alert>;
  return (
    <Row className="g-3">
      {movies.map((m) => (
        <Col
          key={m.id}
          sm={6}
          md={4}
          lg={3}
        >
          <MovieCard
            movie={m}
            isFav
            onToggleFav={() => onToggleFav(m.id)}
          />
        </Col>
      ))}
    </Row>
  );
}
FavouritesPage.propTypes = {
  movies: PropTypes.array.isRequired,
  onToggleFav: PropTypes.func.isRequired,
};
