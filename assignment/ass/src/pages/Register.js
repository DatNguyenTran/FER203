import React, { useState, useContext } from "react";
import { Form, Button, ProgressBar } from "react-bootstrap";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    avatar: null,
    avatarPreview: null,
    username: "",
    password: "",
    confirm: "",
    secretQuestion: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files[0]) {
      const file = files[0];
      // validate type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Avatar phải là JPG hoặc PNG");
        return;
      }
      // validate size
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ảnh ≤ 2MB");
        return;
      }
      setForm({
        ...form,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNext = () => {
    if (!form.fullName.trim()) {
      toast.error("Tên không được bỏ trống");
      return;
    }
    if (!form.email.includes("@")) {
      toast.error("Email phải có ký tự @");
      return;
    }
    if (!form.avatar) {
      toast.error("Bạn phải chọn avatar hợp lệ (JPG/PNG ≤2MB)");
      return;
    }
    setStep(2);
  };

  const handlePrev = () => setStep(1);

  const handleSubmit = async () => {
    if (form.password !== form.confirm) {
      toast.error("Mật khẩu không khớp!");
      return;
    }
    // Validate password: ≥6, có hoa, thường, ký tự đặc biệt
    if (
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/\W/.test(form.password) ||
      form.password.length < 6
    ) {
      toast.error("Mật khẩu ≥6 ký tự, có chữ hoa, thường và ký tự đặc biệt");
      return;
    }
    if (!form.username.trim()) {
      toast.error("Username không được bỏ trống");
      return;
    }
    if (!form.secretQuestion || !form.answer.trim()) {
      toast.error("Secret question và answer không được bỏ trống");
      return;
    }

    const res = await fetch("http://localhost:3001/accounts");
    const accounts = await res.json();
    const newId = accounts.length
      ? Math.max(...accounts.map((a) => a.id)) + 1
      : 1;

    const newUser = {
      id: newId,
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      password: form.password,
      secretQuestion: form.secretQuestion,
      answer: form.answer,
      wishlist: [],
      avatar: form.avatarPreview, // lưu base64/url để hiển thị avatar
    };

    await fetch("http://localhost:3001/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    toast.success("Registration successful. You are now signed in.");
    await login(form.email, form.password);
    navigate("/");
  };

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "600px" }}
    >
      <h2>Register</h2>
      <ProgressBar
        now={(step / 2) * 100}
        className="mb-3"
      />
      {step === 1 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Avatar *</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              accept="image/jpeg,image/png"
              onChange={handleChange}
            />
            {form.avatarPreview && (
              <img
                src={form.avatarPreview}
                alt="preview"
                style={{
                  maxHeight: "120px",
                  marginTop: "10px",
                  borderRadius: "50%",
                }}
              />
            )}
          </Form.Group>
          <Button onClick={handleNext}>Next</Button>
        </Form>
      )}
      {step === 2 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username *</Form.Label>
            <Form.Control
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Re-enter password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Secret Question *</Form.Label>
            <Form.Select
              name="secretQuestion"
              value={form.secretQuestion}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option>Your first pet?</option>
              <option>Favorite color?</option>
              <option>Your birthplace?</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Answer *</Form.Label>
            <Form.Control
              name="answer"
              value={form.answer}
              onChange={handleChange}
              placeholder="Answer your secret question"
            />
          </Form.Group>
          <Button
            variant="secondary"
            onClick={handlePrev}
          >
            Previous
          </Button>{" "}
          <Button onClick={handleSubmit}>Submit</Button>
        </Form>
      )}
    </div>
  );
}

export default Register;
