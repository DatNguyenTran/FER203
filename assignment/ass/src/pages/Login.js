import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const { login, setRedirectAfterLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    const ok = await login(email, password);
    if (ok) {
      toast.success("Login successful!");
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect_uri") || "/";
      navigate(redirect);
    } else toast.error("Invalid credentials!");
  };

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "400px" }}
    >
      <h2>Sign in</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleLogin}>Sign in</Button>
        <p className="mt-3">
          New customer? <Link to="/register">Create an account</Link>
        </p>
      </Form>
    </div>
  );
}
export default Login;
