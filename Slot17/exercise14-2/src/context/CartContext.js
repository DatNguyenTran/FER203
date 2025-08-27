import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  const addToCart = (dish) => setCartItems((prev) => [...prev, dish]);

  // sửa: dùng index thay vì id
  const removeFromCart = (index) =>
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  //// sửa: dùng  id
  // const removeFromCart = (id) =>
  //   setCartItems((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => {
    setCartItems([]);
    setIsPaid(false);
  };

  const confirmPayment = () => {
    if (cartItems.length > 0) {
      setIsPaid(true);
      setCartItems([]);
    }
  };

  const totalValue = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price), 0)
    .toFixed(2);

  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        confirmPayment,
        totalValue,
        isPaid,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
