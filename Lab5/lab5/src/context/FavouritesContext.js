import React, { createContext, useContext, useReducer, useEffect } from "react";
import { safeGetItem, safeSetItem } from "../utils/localStorage";

const FavouritesContext = createContext();

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITES":
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state; // Already in favourites
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE_FROM_FAVOURITES":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_FAVOURITES":
      return {
        ...state,
        items: [],
      };

    case "LOAD_FAVOURITES":
      return {
        ...state,
        items: action.payload || [],
      };

    default:
      return state;
  }
};

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, {
    items: [],
  });

  // Load favourites from localStorage on mount - SỬA LẠI LOGIC NÀY
  useEffect(() => {
    const savedFavourites = safeGetItem("favourites", { items: [] });
    if (
      savedFavourites &&
      savedFavourites.items &&
      Array.isArray(savedFavourites.items)
    ) {
      // Load trực tiếp thay vì loop qua từng item
      dispatch({ type: "LOAD_FAVOURITES", payload: savedFavourites.items });
    }
  }, []);

  // Save favourites to localStorage whenever it changes
  useEffect(() => {
    safeSetItem("favourites", state);
  }, [state]);

  const addToFavourites = (product) => {
    dispatch({ type: "ADD_TO_FAVOURITES", payload: product });
  };

  const removeFromFavourites = (productId) => {
    dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: productId });
  };

  const clearFavourites = () => {
    dispatch({ type: "CLEAR_FAVOURITES" });
  };

  const isInFavourites = (productId) => {
    return state.items.some((item) => item.id === productId);
  };

  const getFavouritesCount = () => {
    return state.items.length;
  };

  return (
    <FavouritesContext.Provider
      value={{
        items: state.items,
        addToFavourites,
        removeFromFavourites,
        clearFavourites,
        isInFavourites,
        getFavouritesCount,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
