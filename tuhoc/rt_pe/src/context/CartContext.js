import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const initialCart = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];

    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR":
      return [];

    case "INCREASE":
      return state.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
      );

    case "DECREASE":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      );

    case "UPDATE_QTY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty > 0 ? action.payload.qty : 1 }
          : item
      );

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
