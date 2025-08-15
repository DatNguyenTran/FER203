import React, { useState } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRegex = /^\d{10,15}$/;

const ValidatedForm = ({ defaultValues, onSubmit }) => {
  const [form, setForm] = useState({
    fullName: defaultValues?.fullName ?? "",
    age: defaultValues?.age ?? "",
    email: defaultValues?.email ?? "",
    phone: defaultValues?.phone ?? "",
    gender: defaultValues?.gender ?? "",
    terms: !!defaultValues?.terms,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Tên không được để trống.";
    else if (
      form.fullName.trim().length < 3 ||
      form.fullName.trim().length > 50
    )
      newErrors.fullName = "Tên phải có từ 3 đến 50 ký tự!";

    if (form.age === "" || form.age === null)
      newErrors.age = "Tuổi không được để trống!";
    else if (isNaN(Number(form.age))) newErrors.age = "Tuổi phải là số.";
    else {
      const a = Number(form.age);
      if (a < 18 || a > 100)
        newErrors.age = "Tuổi phải nằm trong khoảng từ 18 đến 100!";
    }

    if (!form.email) newErrors.email = "Email không được để trống!";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Email không đúng định dạng!";

    if (!form.phone) newErrors.phone = "Số điện thoại không được để trống!";
    else if (!phoneRegex.test(form.phone))
      newErrors.phone = "Số điện thoại phải 10–15 chữ số!";

    if (!form.gender) newErrors.gender = "Vui lòng chọn giới tính!";

    if (!form.terms) newErrors.terms = "Bạn phải đồng ý với điều khoản!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      onSubmit({
        fullName: form.fullName.trim(),
        age: Number(form.age),
        email: form.email.trim(),
        phone: form.phone.trim(),
        gender: form.gender,
        terms: form.terms,
      });
    }
  };

  const showGlobal = submitted && Object.keys(errors).length > 0;

  return (
    <Container>
      <h3>Form đăng ký </h3>

      {showGlobal && (
        <Alert
          variant="danger"
          className="mb-3"
        >
          <strong>Lỗi:</strong> Vui lòng kiểm tra các trường hợp lỗi.
        </Alert>
      )}

      <Form
        onSubmit={handleSubmit}
        noValidate
      >
        <Form.Group
          controlId="vfFullName"
          className="mb-3"
        >
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={setField}
            isInvalid={!!errors.fullName}
            placeholder="Nhập tên đầy đủ"
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="vfAge"
          className="mb-3"
        >
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={form.age}
            onChange={setField}
            isInvalid={!!errors.age}
            placeholder="18–100"
            min={18}
            max={100}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="vfEmail"
          className="mb-3"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={setField}
            isInvalid={!!errors.email}
            placeholder="name@example.com"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="vfPhone"
          className="mb-3"
        >
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={form.phone}
            onChange={setField}
            isInvalid={!!errors.phone}
            placeholder="Chỉ chứa chữ số, 10–15 ký tự"
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="vfGender"
          className="mb-3"
        >
          <Form.Label>Giới tính</Form.Label>
          <Form.Select
            name="gender"
            value={form.gender}
            onChange={setField}
            isInvalid={!!errors.gender}
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.gender}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="vfTerms"
          className="mb-3"
        >
          <Form.Check
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={setField}
            isInvalid={!!errors.terms}
            label="Đồng ý với điều khoản"
            feedback={errors.terms}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
        >
          Gửi
        </Button>
      </Form>
    </Container>
  );
};

ValidatedForm.propTypes = {
  defaultValues: PropTypes.shape({
    fullName: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    phone: PropTypes.string,
    gender: PropTypes.string,
    terms: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default ValidatedForm;
