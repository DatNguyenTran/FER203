import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

export default function StudentCard({ student, onViewDetails }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const renderAvatar = () => {
    if (!student.avatar) {
      return (
        <div
          className="rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center bg-secondary text-white avatar-container"
          style={{ width: "80px", height: "80px" }}
        >
          <i className="bi bi-person-fill fs-1"></i>
        </div>
      );
    }

    if (imageError) {
      return (
        <div
          className="rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center bg-warning text-white avatar-container"
          style={{ width: "80px", height: "80px" }}
        >
          <i className="bi bi-exclamation-triangle fs-1"></i>
        </div>
      );
    }

    return (
      <div className="position-relative avatar-container">
        {imageLoading && (
          <div
            className="rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center bg-light avatar-loading"
            style={{ width: "80px", height: "80px" }}
          >
            <div
              className="spinner-border spinner-border-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <img
          src={student.avatar}
          alt={student.name}
          className={`rounded-circle mb-2 avatar-image ${
            imageLoading ? "d-none" : ""
          }`}
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    );
  };

  return (
    <Card className="shadow-sm rounded-3 h-100 student-card">
      <div className="text-center p-3">{renderAvatar()}</div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge
            bg="secondary"
            className="mb-2"
          >
            ID: {student.id}
          </Badge>
        </div>

        <Card.Title className="h6 mb-2">{student.name}</Card.Title>

        <Card.Text className="small text-muted mb-2">
          <i className="bi bi-envelope me-1"></i>
          {student.email}
        </Card.Text>

        <Card.Text className="small mb-3">
          <i className="bi bi-calendar me-1"></i>
          <strong>Age:</strong> {student.age}
        </Card.Text>

        <Button
          variant="outline-primary"
          size="sm"
          className="mt-auto"
          onClick={() => onViewDetails(student)}
        >
          <i className="bi bi-eye me-1"></i>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};
