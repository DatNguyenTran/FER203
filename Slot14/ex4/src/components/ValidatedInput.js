// src/ValidatedInput.js
import React, { useState, useEffect } from "react";
import { Form, Button, Toast, Modal, Card } from "react-bootstrap";

// validate: ít nhất 5 ký tự (loại bỏ khoảng trắng ở hai đầu)
const validateInput = (value) => value.trim().length >= 5;

export default function ValidatedInput() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect chạy mỗi khi value thay đổi -> cập nhật isValid + errorMessage
  useEffect(() => {
    const ok = validateInput(value);
    setIsValid(ok);
    setErrorMessage(ok ? "" : "Giá trị phải có ít nhất 5 ký tự!");
  }, [value]);

  // submit: prevent reload, chỉ xử lý khi hợp lệ
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setShowToast(true);
    setShowModal(true);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        noValidate
      >
        <Form.Group
          controlId="validatedInput"
          className="mb-3"
        >
          <Form.Label>Nhập một giá trị</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập ít nhất 5 ký tự"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            isValid={isValid && value !== ""}
            isInvalid={!isValid && value !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!isValid}
        >
          Gửi
        </Button>
      </Form>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={2200}
        autohide
        style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kết quả</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>Giá trị đã gửi</Card.Title>
              <Card.Text>{value}</Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
