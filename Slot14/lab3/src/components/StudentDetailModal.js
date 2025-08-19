import React, { useState } from "react";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

const StudentDetailModal = ({ show, onHide, student }) => {
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
          className="rounded-circle shadow mx-auto d-flex align-items-center justify-content-center bg-secondary text-white avatar-container"
          style={{ width: "150px", height: "150px" }}
        >
          <i
            className="bi bi-person-fill"
            style={{ fontSize: "4rem" }}
          ></i>
        </div>
      );
    }

    if (imageError) {
      return (
        <div
          className="rounded-circle shadow mx-auto d-flex align-items-center justify-content-center bg-warning text-white avatar-container"
          style={{ width: "150px", height: "150px" }}
        >
          <i
            className="bi bi-exclamation-triangle"
            style={{ fontSize: "4rem" }}
          ></i>
        </div>
      );
    }

    return (
      <div className="position-relative avatar-container">
        {imageLoading && (
          <div
            className="rounded-circle shadow mx-auto d-flex align-items-center justify-content-center bg-light avatar-loading"
            style={{ width: "150px", height: "150px" }}
          >
            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <img
          src={student.avatar}
          alt={student.name}
          className={`img-fluid rounded-circle shadow avatar-image ${
            imageLoading ? "d-none" : ""
          }`}
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    );
  };

  if (!student) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="student-modal"
    >
      <Modal.Header
        closeButton
        className={
          student.isProfile ? "bg-success text-white" : "bg-primary text-white"
        }
      >
        <Modal.Title>
          <i className="bi bi-person-circle me-2"></i>
          {student.isProfile ? "Profile Details" : "Student Details"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Row>
          <Col
            md={4}
            className="text-center mb-3"
          >
            {renderAvatar()}
          </Col>

          <Col md={8}>
            <div className="mb-3">
              <Badge
                bg={student.isProfile ? "success" : "primary"}
                className="fs-6"
              >
                {student.isProfile ? "Profile" : `ID: ${student.id}`}
              </Badge>
            </div>

            <h4 className="mb-3">{student.name}</h4>

            {student.isProfile && student.profile ? (
              <>
                <Row className="mb-3">
                  <Col xs={6}>
                    <strong>Username:</strong>
                    <p className="text-muted mb-0">
                      @{student.profile.username}
                    </p>
                  </Col>
                  <Col xs={6}>
                    <strong>Email:</strong>
                    <p className="text-muted mb-0">{student.email}</p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={6}>
                    <strong>Phone:</strong>
                    <p className="text-muted mb-0">{student.profile.phone}</p>
                  </Col>
                  <Col xs={6}>
                    <strong>Country:</strong>
                    <p className="text-muted mb-0">{student.profile.country}</p>
                  </Col>
                </Row>

                <div className="mt-4">
                  <h6>Address Information:</h6>
                  <p className="text-muted mb-1">
                    <i className="bi bi-geo-alt me-2"></i>
                    {student.profile.street}
                  </p>
                  <p className="text-muted mb-1">
                    {student.profile.city}, {student.profile.state}{" "}
                    {student.profile.zipCode}
                  </p>
                  <p className="text-muted mb-0">{student.profile.country}</p>
                </div>

                <div className="mt-4">
                  <h6>Account Information:</h6>
                  <p className="text-muted mb-1">
                    <strong>Secret Question:</strong>{" "}
                    {student.profile.secretQuestion}
                  </p>
                  <p className="text-muted mb-0">
                    <strong>Created:</strong>{" "}
                    {new Date(student.profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </>
            ) : (
              <>
                <Row className="mb-3">
                  <Col xs={6}>
                    <strong>Age:</strong>
                    <p className="text-muted mb-0">{student.age} years old</p>
                  </Col>
                  <Col xs={6}>
                    <strong>Email:</strong>
                    <p className="text-muted mb-0">{student.email}</p>
                  </Col>
                </Row>

                <div className="mt-4">
                  <h6>Contact Information:</h6>
                  <p className="text-muted">
                    <i className="bi bi-envelope me-2"></i>
                    {student.email}
                  </p>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          <i className="bi bi-x-circle me-1"></i>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

StudentDetailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  student: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    isProfile: PropTypes.bool,
    profile: PropTypes.object,
  }),
};

export default StudentDetailModal;
