import React, { useState, useContext } from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "./App.css";

const AppContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const dishes = [
    {
      id: 0,
      name: "Uthappizza",
      image: "images/uthappizza.png",
      price: "4.99",
      description: "A unique combination of Indian Uthappam and Italian pizza.",
    },
    {
      id: 1,
      name: "Zucchipakoda",
      image: "images/zucchipakoda.png",
      price: "1.99",
      description: "Deep fried Zucchini with chickpea batter.",
    },
    {
      id: 2,
      name: "Vadonut",
      image: "images/vadonut.png",
      price: "1.99",
      description: "A combination of vada and donut.",
    },
    {
      id: 3,
      name: "ElaiCheese Cake",
      image: "images/elaicheesecake.png",
      price: "2.99",
      description: "New York Style Cheesecake with Indian cardamoms.",
    },
  ];

  return (
    <div
      className={
        darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"
      }
    >
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        className="mb-4"
      >
        <Container>
          <Navbar.Brand>Foodapp</Navbar.Brand>
          <Form
            className="d-flex align-items-center"
            style={{ gap: "8px" }}
          >
            <Form.Control
              type="search"
              placeholder="Tìm món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control-sm"
              style={{ height: "38px" }} // ✅ chiều cao input
            />
            <Button
              className="theme-btn d-flex align-items-center justify-content-center"
              variant={darkMode ? "warning" : "dark"}
              onClick={toggleTheme}
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </Button>
          </Form>
        </Container>
      </Navbar>

      <Container>
        <DishesList
          dishes={dishes}
          searchTerm={searchTerm}
        />
        <Cart />
      </Container>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
