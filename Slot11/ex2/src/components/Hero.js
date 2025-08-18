import React from "react";
import { Container, Button } from "react-bootstrap";

const Hero = () => (
  <div className="bg-primary text-white py-5 text-center hero-section">
    <Container>
      <h1 className="display-4 fw-bold mb-3">
        <i className="bi bi-mortarboard me-3"></i>
        Student Management
      </h1>
      <p className="lead mb-4">
        Manage and view student information easily with our comprehensive
        dashboard.
      </p>
      <Button
        variant="light"
        size="lg"
      >
        <i className="bi bi-arrow-down me-2"></i>
        Explore Students
      </Button>
    </Container>
  </div>
);

export default Hero;
