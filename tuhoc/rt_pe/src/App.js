import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Motorbikes from "./components/Motorbikes";
import MotorbikeDetails from "./components/MotorbikeDetails";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Trang Login */}
          <Route
            path="/"
            element={<Login />}
          />

          {/* Trang danh sách motorbikes */}
          <Route
            path="/motorbikes"
            element={<Motorbikes />}
          />

          {/* Trang chi tiết 1 motorbike */}
          <Route
            path="/view/:id"
            element={<MotorbikeDetails />}
          />

          {/* Trang giỏ hàng */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Trang 404 */}
          <Route
            path="*"
            element={<h2 className="text-center mt-5">404 Not Found</h2>}
          />
          <Route
            path="/view/:id"
            element={<MotorbikeDetail />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
