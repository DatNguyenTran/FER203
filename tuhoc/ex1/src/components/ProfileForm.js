import React, { useState } from "react";
import "../App.css";

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return !value.trim() ? "Name is required." : "";
      case "email":
        return !value.includes("@") ? "Email must include @." : "";
      case "age":
        return !value || Number(value) < 1 ? "Age must be at least 1." : "";
      default:
        return "";
    }
  };

  const handleInputChange = (fieldName, value) => {
    // Update the field value
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "age":
        setAge(value);
        break;
      default:
        break;
    }

    // Validate and update errors
    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const validate = () => {
    const newErrors = {};
    newErrors.name = validateField("name", name);
    newErrors.email = validateField("email", email);
    newErrors.age = validateField("age", age);
    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => !newErrors[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowToast(true);
      setShowModal(true);
      onSubmit({ name, email, age });
    }
  };

  // Check if form is valid for button disabled state
  const isFormValid =
    name.trim() && email.includes("@") && age && Number(age) >= 1;

  return (
    <div className="form-container">
      <h1>Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
        />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          onBlur={() => handleBlur("age")}
        />
        {touched.age && errors.age && <p className="error">{errors.age}</p>}

        <button
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>

      {showToast && <div className="toast">Submitted successfully!</div>}

      {showModal && (
        <div className="modal">
          <div className="card">
            <h2>Profile Information</h2>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Age:</strong> {age}
            </p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
