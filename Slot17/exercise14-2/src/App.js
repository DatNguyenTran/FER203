import React, { useState, useEffect } from "react";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "./styles.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Khi darkMode thay đổi, update class cho body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark");
      document.getElementById("root").classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.classList.remove("dark");
      document.getElementById("root").classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <CartProvider>
      <div className={`App ${darkMode ? "dark" : ""}`}>
        <header>
          <h1>FoodApp</h1>
          <input
            type="text"
            placeholder="Tìm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>
        <DishesList
          dishes={[
            {
              id: 0,
              name: "Uthappizza",
              image: "images/uthappizza.png",
              price: "4.99",
              description:
                "A unique combination of Indian Uthappam and Italian pizza.",
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
          ]}
          searchTerm={searchTerm}
        />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
