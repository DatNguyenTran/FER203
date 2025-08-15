import React, { useState } from "react";
import { Card, Badge, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

export default function MovieCard({ movie, isFav, onToggleFav }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={movie.poster}
          alt={movie.title}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="text-muted mb-2">
            {movie.description.slice(0, 80)}…
          </Card.Text>
          <div className="mb-2 small">
            {movie.year} • {movie.country} • {movie.duration} min
          </div>
          <div>
            <Badge bg="secondary">{movie.genre}</Badge>
          </div>
          <div className="mt-auto d-flex gap-2 pt-2">
            <Button
              size="sm"
              className={isFav ? "btn-remove-fav" : "btn-add-fav"}
              onClick={onToggleFav}
            >
              {isFav ? "Remove Favourite" : "Add to Favourites"}
            </Button>
            <Button
              size="sm"
              variant="info"
              onClick={() => setOpen(true)}
            >
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={open}
        onHide={() => setOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={movie.poster}
            alt={movie.title}
            className="img-fluid mb-3"
          />
          <p>{movie.description}</p>
          <p>
            <strong>Year:</strong> {movie.year}
          </p>
          <p>
            <strong>Country:</strong> {movie.country}
          </p>
          <p>
            <strong>Duration:</strong> {movie.duration} minutes
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
  isFav: PropTypes.bool.isRequired,
  onToggleFav: PropTypes.func.isRequired,
};
