import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MotorbikeList from "./components/MotorbikeList";
import MotorbikeDetail from "./components/MotorbikeDetail";
import CartPage from "./components/CartPage";
import { GlobalProvider } from "./components/GlobalContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <GlobalProvider>
      <Routes>
        {/* Trang login */}
        <Route
          path="/"
          element={<LoginForm setUser={setUser} />}
        />

        {/* Trang danh sách motorbike */}
        <Route
          path="/motorbikes"
          element={<MotorbikeList />}
        />

        {/* Trang chi tiết motorbike */}
        <Route
          path="/view/:id"
          element={<MotorbikeDetail />}
        />

        {/* Trang giỏ hàng */}
        <Route
          path="/cart"
          element={<CartPage />}
        />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
