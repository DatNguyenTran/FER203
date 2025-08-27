import React from "react";
import ProfileForm from "./components/ProfileForm";
import "./App.css";

function App() {
  const handleProfileSubmit = (data) => {
    console.log("Dữ liệu đã submit:", data);
  };

  return (
    <div className="App">
      <ProfileForm onSubmit={handleProfileSubmit} />
    </div>
  );
}

export default App;
