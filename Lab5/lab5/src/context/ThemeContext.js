import React, { createContext, useContext, useReducer, useEffect } from "react";

const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        isDark: !state.isDark,
      };
    case "SET_THEME":
      return {
        ...state,
        isDark: action.payload,
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    isDark: false,
  });

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const setTheme = (isDark) => {
    dispatch({ type: "SET_THEME", payload: isDark });
  };

  useEffect(() => {
    if (state.isDark) {
      document.body.classList.add("dark-mode");

      document.documentElement.style.setProperty("--bg-primary", "#0f172a");
      document.documentElement.style.setProperty("--bg-secondary", "#1e293b");
      document.documentElement.style.setProperty("--bg-card", "#334155");
      document.documentElement.style.setProperty("--text-primary", "#f8fafc");
      document.documentElement.style.setProperty("--text-secondary", "#cbd5e1");
      document.documentElement.style.setProperty("--text-muted", "#94a3b8");
      document.documentElement.style.setProperty("--border-color", "#475569");
      document.documentElement.style.setProperty(
        "--shadow-color",
        "rgba(0, 0, 0, 0.3)"
      );
    } else {
      document.body.classList.remove("dark-mode");

      document.documentElement.style.setProperty("--bg-primary", "#ffffff");
      document.documentElement.style.setProperty("--bg-secondary", "#f8fafc");
      document.documentElement.style.setProperty("--bg-card", "#ffffff");
      document.documentElement.style.setProperty("--text-primary", "#1e293b");
      document.documentElement.style.setProperty("--text-secondary", "#64748b");
      document.documentElement.style.setProperty("--text-muted", "#94a3b8");
      document.documentElement.style.setProperty("--border-color", "#e2e8f0");
      document.documentElement.style.setProperty(
        "--shadow-color",
        "rgba(0, 0, 0, 0.1)"
      );
    }
  }, [state.isDark]);

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark);
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("theme", state.isDark ? "dark" : "light");
  }, [state.isDark]);

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
