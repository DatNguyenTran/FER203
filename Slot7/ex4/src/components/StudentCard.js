import React from "react";
import { Card, Button } from "react-bootstrap";

const StudentCard = ({ student }) => {
  return (
    <Card
      style={{ width: "100%" }}
      className="mb-4 shadow-sm h-100"
    >
      <Card.Img
        variant="top"
        src={student.avatar}
        alt={`${student.name}'s avatar`}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>Age: {student.age}</Card.Text>
        <div className="mt-auto">
          <Button variant="primary">Edit</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
