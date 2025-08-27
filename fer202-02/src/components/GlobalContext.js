import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();
export const BikeContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_QTY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item
      );
    default:
      return state;
  }
};

const bikeReducer = (state, action) => {
  switch (action.type) {
    case "SET_BIKES":
      return action.payload;
    case "DECREASE_STOCK":
      return state.map((bike) =>
        bike.id === action.payload ? { ...bike, stock: bike.stock - 1 } : bike
      );
    case "INCREASE_STOCK":
      return state.map((bike) =>
        bike.id === action.payload ? { ...bike, stock: bike.stock + 1 } : bike
      );
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [cart, cartDispatch] = useReducer(cartReducer, []);
  const [bikes, bikeDispatch] = useReducer(bikeReducer, []);

  useEffect(() => {
    axios.get("http://localhost:3001/Motorbikes").then((res) => {
      bikeDispatch({ type: "SET_BIKES", payload: res.data });
    });
  }, []);

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      <BikeContext.Provider value={{ bikes, bikeDispatch }}>
        {children}
      </BikeContext.Provider>
    </CartContext.Provider>
  );
};
