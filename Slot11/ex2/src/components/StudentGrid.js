import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";
import PropTypes from "prop-types";

const StudentGrid = ({ students, onViewDetails }) => {
  return (
    <Row className="g-4">
      {students.map((student) => (
        <Col
          key={student.id}
          xs={12}
          sm={6}
          lg={4}
        >
          <StudentCard
            student={student}
            onViewDetails={onViewDetails}
          />
        </Col>
      ))}
      {students.length === 0 && (
        <Col xs={12}>
          <div className="text-center text-muted py-5">
            <i className="bi bi-search fs-1 d-block mb-3"></i>
            <h5>No students found</h5>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        </Col>
      )}
    </Row>
  );
};

StudentGrid.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default StudentGrid;
