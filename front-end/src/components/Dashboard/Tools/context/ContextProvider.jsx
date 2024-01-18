import { createContext, useContext, useEffect, useState } from "react";
import tinycolor from "tinycolor2";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [colorStrong, setColorStrong] = useState(null);

  const handleShow = () => setShowSettings(true);
  const handleClose = () => setShowSettings(false);

  const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem("themeMode");
    const colorStrong = tinycolor(theme).darken(10).toString();
    localStorage.setItem("colorStrong", colorStrong);
    console.log("theme:", theme);
    console.log("colorStrong:", colorStrong);
    setColorStrong(colorStrong);
    setCurrentTheme(theme);
  };
  useEffect(() => {
    getThemeFromLocalStorage();
  }, []);

  return (
    <StateContext.Provider
      value={{
        showSettings,
        setShowSettings,
        handleClose,
        handleShow,
        currentTheme,
        getThemeFromLocalStorage,
        colorStrong,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
