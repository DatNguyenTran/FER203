import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Modal, Card, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  //username & password: lưu dữ liệu người dùng nhập vào ô login.
  // show: true/false để mở hoặc đóng Modal thông báo khi login thành công.
  // setUser: prop từ cha truyền vào để cập nhật thông tin user sau khi login.
  //error: chuỗi lưu thông báo lỗi (nếu nhập sai hoặc server lỗi)
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
    //Nếu bỏ trống username hoặc password → hiện lỗi luôn, không cần gọi API.
    try {
      const res = await axios.get("http://localhost:3001/UserAccounts");
      const user = res.data.find(
        (u) => u.username === username && u.password === password
      );
      // Gọi API lấy toàn bộ danh sách user.
      // find() kiểm tra có user nào trùng username và password không.
      if (user) {
        setUser(user);
        setError(""); // xoá lỗi cũ nếu có
        setShow(true);
        setTimeout(() => {
          window.location.href = "/motorbikes"; // sau 1.5s chuyển trang
        }, 1500);
      } else {
        setError("Invalid username or password!");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, please try again!");
    }
  };
  // Nếu login đúng → cập nhật setUser(user), hiện modal, redirect sang /motorbikes.
  // Nếu sai → báo lỗi "Invalid username or password!".
  // Nếu lỗi server → báo "Server error, please try again!".
  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setError(""); // clear lỗi
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card
        style={{ width: "400px" }}
        className="shadow-sm"
      >
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>

            {/* 2 nút căn giữa */}
            <div className="d-flex justify-content-center gap-3 mb-3">
              <Button
                variant="primary"
                onClick={handleLogin}
                size="sm"
                style={{ width: "120px" }}
              >
                Login
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                size="sm"
                style={{ width: "120px" }}
              >
                Cancel
              </Button>
            </div>

            {/* Alert lỗi nằm ngay dưới nút */}
            {error && (
              <Alert
                variant="danger"
                className="text-center"
              >
                {error}
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Modal thành công */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Welcome, <b>{username}</b> login successful!
        </Modal.Body>
      </Modal>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
