import React, { useState, useReducer, useMemo, useCallback } from "react";
import {
  Modal,
  Button,
  Form,
  Nav,
  ProgressBar,
  Card,
  Toast,
  ToastContainer,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaMapMarkerAlt,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";
import PropTypes from "prop-types";
import "./ProfileWizardModal.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  avatar: null,

  username: "",
  password: "",
  confirmPassword: "",
  secretQuestion: "",
  answer: "",

  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const validateAbout = (data) => {
  const errors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!data.phone.trim()) errors.phone = "Phone is required";
  return errors;
};

const validateAccount = (data) => {
  const errors = {};
  if (!data.username.trim()) {
    errors.username = "Username is required";
  } else if (data.username.length < 6) {
    errors.username = "Username must be at least 6 characters";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(data.password)) {
    errors.password =
      "Password must contain uppercase, number, and special character";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!data.secretQuestion)
    errors.secretQuestion = "Secret question is required";
  if (!data.answer.trim()) errors.answer = "Answer is required";

  return errors;
};

const validateAddress = (data) => {
  const errors = {};
  if (!data.street.trim()) errors.street = "Street is required";
  if (!data.city.trim()) errors.city = "City is required";
  if (!data.state.trim()) errors.state = "State is required";
  if (!data.zipCode.trim()) errors.zipCode = "Zip code is required";
  if (!data.country) errors.country = "Country is required";
  return errors;
};

const saveProfileToLocalStorage = (profileData) => {
  try {
    const existingProfiles = JSON.parse(
      localStorage.getItem("userProfiles") || "[]"
    );

    let avatarData = null;
    if (profileData.avatar) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => {
          const newProfile = {
            id: Date.now(),
            ...profileData,
            avatar: reader.result,
            createdAt: new Date().toISOString(),
          };
          existingProfiles.push(newProfile);
          localStorage.setItem(
            "userProfiles",
            JSON.stringify(existingProfiles)
          );
          resolve({ success: true, profile: newProfile });
        };
        reader.readAsDataURL(profileData.avatar);
      });
    } else {
      const newProfile = {
        id: Date.now(),
        ...profileData,
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      existingProfiles.push(newProfile);
      localStorage.setItem("userProfiles", JSON.stringify(existingProfiles));
      return Promise.resolve({ success: true, profile: newProfile });
    }
  } catch (error) {
    console.error("Error saving profile to localStorage:", error);
    return Promise.resolve({ success: false, error: error.message });
  }
};

const ProfileWizardModal = ({ show, onHide, onProfileSaved }) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const steps = [
    { title: "About", icon: <FaUser /> },
    { title: "Account", icon: <FaLock /> },
    { title: "Address", icon: <FaMapMarkerAlt /> },
  ];

  const countries = [
    "Viet Nam",
    "Korea",
    "Italy",
    "United States",
    "United Kingdom",
    "France",
    "Germany",
    "Japan",
    "China",
    "Australia",
    "Canada",
  ];

  const secretQuestions = [
    "What is your first pet's name?",
    "What is your mother's maiden name?",
    "In which city were you born?",
    "Who was your favorite teacher?",
  ];

  const progressPercentage = useMemo(() => {
    return ((currentStep + 1) / steps.length) * 100;
  }, [currentStep, steps.length]);

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 0:
        return Object.keys(validateAbout(formData)).length === 0;
      case 1:
        return Object.keys(validateAccount(formData)).length === 0;
      case 2:
        return Object.keys(validateAddress(formData)).length === 0;
      default:
        return false;
    }
  }, [currentStep, formData]);

  const handleFieldChange = useCallback((field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFieldChange("avatar", file);
      }
    },
    [handleFieldChange]
  );

  const nextStep = useCallback(() => {
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [isStepValid, currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleFinish = useCallback(async () => {
    if (isStepValid) {
      const result = await saveProfileToLocalStorage(formData);

      if (result.success) {
        setSaveStatus("success");
        setShowSuccessModal(true);
        setShowToast(true);

        if (onProfileSaved) {
          onProfileSaved(result.profile);
        }
      } else {
        setSaveStatus("error");
        setShowToast(true);
      }
    }
  }, [isStepValid, formData, onProfileSaved]);

  const handleClose = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
    setCurrentStep(0);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowSuccessModal(false);
    setShowToast(false);
    setSaveStatus(null);
    onHide();
  }, [onHide]);

  const renderAboutTab = () => (
    <div>
      <h4 className="mb-4">About Information</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              value={formData.firstName}
              onChange={(e) => handleFieldChange("firstName", e.target.value)}
              isInvalid={!!validateAbout(formData).firstName}
            />
            <Form.Control.Feedback type="invalid">
              {validateAbout(formData).firstName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              value={formData.lastName}
              onChange={(e) => handleFieldChange("lastName", e.target.value)}
              isInvalid={!!validateAbout(formData).lastName}
            />
            <Form.Control.Feedback type="invalid">
              {validateAbout(formData).lastName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              isInvalid={!!validateAbout(formData).email}
            />
            <Form.Control.Feedback type="invalid">
              {validateAbout(formData).email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Phone *</Form.Label>
            <Form.Control
              type="tel"
              value={formData.phone}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              isInvalid={!!validateAbout(formData).phone}
            />
            <Form.Control.Feedback type="invalid">
              {validateAbout(formData).phone}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Form.Group>
    </div>
  );

  const renderAccountTab = () => (
    <div>
      <h4 className="mb-4">Account Information</h4>

      <Form.Group className="mb-3">
        <Form.Label>Username *</Form.Label>
        <Form.Control
          type="text"
          value={formData.username}
          onChange={(e) => handleFieldChange("username", e.target.value)}
          isInvalid={!!validateAccount(formData).username}
        />
        <Form.Control.Feedback type="invalid">
          {validateAccount(formData).username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password *</Form.Label>
        <div className="position-relative">
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            isInvalid={!!validateAccount(formData).password}
          />
          <Button
            variant="outline-secondary"
            size="sm"
            className="btn-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">
          {validateAccount(formData).password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password *</Form.Label>
        <div className="position-relative">
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              handleFieldChange("confirmPassword", e.target.value)
            }
            isInvalid={!!validateAccount(formData).confirmPassword}
          />
          <Button
            variant="outline-secondary"
            size="sm"
            className="btn-eye"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">
          {validateAccount(formData).confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret Question *</Form.Label>
        <Form.Select
          value={formData.secretQuestion}
          onChange={(e) => handleFieldChange("secretQuestion", e.target.value)}
          isInvalid={!!validateAccount(formData).secretQuestion}
        >
          <option value="">Select a secret question</option>
          {secretQuestions.map((question, index) => (
            <option
              key={index}
              value={question}
            >
              {question}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {validateAccount(formData).secretQuestion}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer *</Form.Label>
        <Form.Control
          type="text"
          value={formData.answer}
          onChange={(e) => handleFieldChange("answer", e.target.value)}
          isInvalid={!!validateAccount(formData).answer}
        />
        <Form.Control.Feedback type="invalid">
          {validateAccount(formData).answer}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );

  const renderAddressTab = () => (
    <div>
      <h4 className="mb-4">Address Information</h4>

      <Form.Group className="mb-3">
        <Form.Label>Street *</Form.Label>
        <Form.Control
          type="text"
          value={formData.street}
          onChange={(e) => handleFieldChange("street", e.target.value)}
          isInvalid={!!validateAddress(formData).street}
        />
        <Form.Control.Feedback type="invalid">
          {validateAddress(formData).street}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>City *</Form.Label>
            <Form.Control
              type="text"
              value={formData.city}
              onChange={(e) => handleFieldChange("city", e.target.value)}
              isInvalid={!!validateAddress(formData).city}
            />
            <Form.Control.Feedback type="invalid">
              {validateAddress(formData).city}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>State *</Form.Label>
            <Form.Control
              type="text"
              value={formData.state}
              onChange={(e) => handleFieldChange("state", e.target.value)}
              isInvalid={!!validateAddress(formData).state}
            />
            <Form.Control.Feedback type="invalid">
              {validateAddress(formData).state}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Zip Code *</Form.Label>
            <Form.Control
              type="text"
              value={formData.zipCode}
              onChange={(e) => handleFieldChange("zipCode", e.target.value)}
              isInvalid={!!validateAddress(formData).zipCode}
            />
            <Form.Control.Feedback type="invalid">
              {validateAddress(formData).zipCode}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Country *</Form.Label>
            <Form.Select
              value={formData.country}
              onChange={(e) => handleFieldChange("country", e.target.value)}
              isInvalid={!!validateAddress(formData).country}
            >
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option
                  key={index}
                  value={country}
                >
                  {country}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {validateAddress(formData).country}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const renderTabContent = () => {
    switch (currentStep) {
      case 0:
        return renderAboutTab();
      case 1:
        return renderAccountTab();
      case 2:
        return renderAddressTab();
      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        dialogClassName="profile-wizard-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Build Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <Nav
              variant="tabs"
              className="mb-3"
            >
              {steps.map((step, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    active={index === currentStep}
                    disabled={index > currentStep}
                    className="d-flex align-items-center"
                  >
                    {step.icon} <span className="ms-2">{step.title}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <ProgressBar
              now={progressPercentage}
              className="mb-3"
              variant="success"
            />
            <small className="text-muted">
              Step {currentStep + 1} of {steps.length} (
              {Math.round(progressPercentage)}% complete)
            </small>
          </div>

          {renderTabContent()}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {currentStep > 0 && (
            <Button
              variant="outline-primary"
              onClick={prevStep}
            >
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              variant="primary"
              onClick={nextStep}
              disabled={!isStepValid}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleFinish}
              disabled={!isStepValid}
            >
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        size="lg"
        centered
        dialogClassName="profile-wizard-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCheckCircle className="me-2 text-success" />
            Profile Created Successfully!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {saveStatus === "success" && (
            <Alert
              variant="success"
              className="mb-3"
            >
              <FaSave className="me-2" />
              Profile saved to local storage successfully!
            </Alert>
          )}
          {saveStatus === "error" && (
            <Alert
              variant="danger"
              className="mb-3"
            >
              <FaSave className="me-2" />
              Failed to save profile to local storage.
            </Alert>
          )}
          <Card className="success-card">
            <Card.Body>
              <Row>
                <Col
                  md={3}
                  className="text-center"
                >
                  <div className="mb-3">
                    {formData.avatar ? (
                      <img
                        src={URL.createObjectURL(formData.avatar)}
                        alt="Avatar"
                        className="img-fluid rounded-circle"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
                        style={{ width: "100px", height: "100px" }}
                      >
                        <FaUser
                          size={40}
                          className="text-white"
                        />
                      </div>
                    )}
                  </div>
                </Col>
                <Col md={9}>
                  <h5 className="section-title">About</h5>
                  <p>
                    <strong>Name:</strong> {formData.firstName}{" "}
                    {formData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>

                  <h5 className="section-title">Account</h5>
                  <p>
                    <strong>Username:</strong> {formData.username}
                  </p>
                  <p>
                    <strong>Secret Question:</strong> {formData.secretQuestion}
                  </p>

                  <h5 className="section-title">Address</h5>
                  <p>
                    <strong>Street:</strong> {formData.street}
                  </p>
                  <p>
                    <strong>City:</strong> {formData.city},{" "}
                    <strong>State:</strong> {formData.state}
                  </p>
                  <p>
                    <strong>Zip Code:</strong> {formData.zipCode}
                  </p>
                  <p>
                    <strong>Country:</strong> {formData.country}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer
        position="top-end"
        className="p-3"
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={4000}
          autohide
          bg={saveStatus === "success" ? "success" : "danger"}
        >
          <Toast.Header>
            <strong className="me-auto">
              {saveStatus === "success" ? "Success!" : "Error!"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {saveStatus === "success"
              ? "Profile saved to local storage successfully!"
              : "Failed to save profile to local storage."}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

ProfileWizardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onProfileSaved: PropTypes.func,
};

export default ProfileWizardModal;
