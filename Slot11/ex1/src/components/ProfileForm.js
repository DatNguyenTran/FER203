import React, { useState } from "react";
import PropTypes from "prop-types";

const ProfileForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Validate
  const validateName = (value) => value.trim() !== "";
  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validateAge = (value) => Number(value) >= 1;

  const isFormValid =
    validateName(name) && validateEmail(email) && validateAge(age);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
      if (onSubmit) {
        onSubmit({ name, email, age });
      }
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="form-container">
      <h2>Profile Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name.length > 0 && !validateName(name) && (
            <p className="error">❌ Name cannot be empty</p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email.length > 0 && !validateEmail(email) && (
            <p className="error">❌ Invalid email format</p>
          )}
        </div>

        {/* Age */}
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {age.length > 0 && !validateAge(age) && (
            <p className="error">❌ Age must be at least 1</p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>

      {/* Toast */}
      {showToast && <div className="toast">✅ Submitted successfully!</div>}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Submitted Information</h3>
            <div className="modal-card">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Age:</strong> {age}
              </p>
            </div>
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ProfileForm;
