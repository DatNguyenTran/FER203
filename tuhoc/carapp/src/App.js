import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ViewList from "./components/ViewList";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginForm setUser={setUser} />}
      />
      <Route
        path="/viewlist"
        element={<ViewList user={user} />}
      />
    </Routes>
  );
}

export default App;
