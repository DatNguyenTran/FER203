import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";

function RequestFormModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Recipe Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. chicken, broccoli..."
            />
            <Form.Control.Feedback type="invalid">
              Please enter desired ingredient
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select defaultValue="">
              <option value="">Select...</option>
              <option value="5">5 phút</option>
              <option value="10">10 phút</option>
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Additional notes..."
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
          >
            <FaPaperPlane className="me-2" /> Submit Request
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RequestFormModal;
