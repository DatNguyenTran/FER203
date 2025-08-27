import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function LoginForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      // 🔹 Lấy toàn bộ danh sách user
      const res = await axios.get("http://localhost:3001/UserAccounts");
      const foundUser = res.data.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        alert(`Welcome, ${foundUser.username} login successful!`);
        navigate("/viewlist"); // 🔹 thành công → tới ViewList
      } else {
        setError("Invalid username or password!");
      }
    } catch (err) {
      console.error(err);
      setError("Server error!");
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <Card
      className="shadow-sm"
      style={{
        maxWidth: "400px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "8px",
      }}
    >
      <h3 className="text-center mb-4">Login</h3>
      <Form onSubmit={handleLogin}>
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

        <div className="d-flex justify-content-center mt-4">
          <Button
            type="submit"
            variant="primary"
            className="me-2"
            style={{ minWidth: "100px" }}
          >
            Login
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            style={{ minWidth: "100px" }}
          >
            Cancel
          </Button>
        </div>

        {error && (
          <Alert
            variant="danger"
            className="mt-4 text-center"
          >
            {error}
          </Alert>
        )}
      </Form>
    </Card>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
