import React from "react";
import ProfileForm from "./components/ProfileForm";
import "./App.css";

function App() {
  const handleProfileSubmit = (data) => {
    console.log("Form submitted data:", data);
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", padding: "40px" }}>
      <ProfileForm onSubmit={handleProfileSubmit} />
    </div>
  );
}

export default App;
