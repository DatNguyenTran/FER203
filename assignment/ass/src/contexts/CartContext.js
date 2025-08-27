import React, { createContext, useReducer, useEffect } from "react";

// Tạo context
const CartContext = createContext();

// State mặc định
const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

// Reducer xử lý các action
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exist = state.items.find((p) => p.id === action.payload.id);
      if (exist) {
        return {
          ...state,
          items: state.items.map((p) =>
            p.id === action.payload.id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((p) => p.id !== action.payload),
      };

    case "INC_QTY":
      return {
        ...state,
        items: state.items.map((p) =>
          p.id === action.payload ? { ...p, qty: p.qty + 1 } : p
        ),
      };

    case "DEC_QTY":
      return {
        ...state,
        items: state.items.map((p) =>
          p.id === action.payload && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

// Provider bao bọc toàn bộ app
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Lưu giỏ hàng vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  // Tính tổng số lượng & tổng tiền
  const count = state.items.reduce((sum, p) => sum + p.qty, 0);
  const subtotal = state.items.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items || [],
        count,
        subtotal,
        addToCart: (product) =>
          dispatch({ type: "ADD_TO_CART", payload: product }),
        removeFromCart: (id) =>
          dispatch({ type: "REMOVE_FROM_CART", payload: id }),
        incQty: (id) => dispatch({ type: "INC_QTY", payload: id }),
        decQty: (id) => dispatch({ type: "DEC_QTY", payload: id }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
