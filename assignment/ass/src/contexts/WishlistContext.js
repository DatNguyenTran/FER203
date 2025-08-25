import React, { createContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      if (state.ids.includes(action.id)) {
        return { ids: state.ids.filter((x) => x !== action.id) };
      }
      return { ids: [...state.ids, action.id] };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { ids: [] });

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) dispatch({ type: "LOAD", ids: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.ids));
  }, [state.ids]);

  const toggleWishlist = (id) => dispatch({ type: "TOGGLE", id });

  return (
    <WishlistContext.Provider value={{ state, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
