import { createContext, useContext, useEffect, useState } from "react";
import tinycolor from "tinycolor2";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [colorStrong, setColorStrong] = useState(null);

  const handleShow = () => setShowSettings(true);
  const handleClose = () => setShowSettings(false);

  useEffect(() => {
    const getThemeFromLocalStorage = () => {
      const theme = localStorage.getItem("themeMode");
      const colorStrong = tinycolor(theme).darken(10).toString();
      if (theme) {
        localStorage.setItem("colorStrong", colorStrong);
        setColorStrong(colorStrong);
        setCurrentTheme(theme);
      }
    };
    getThemeFromLocalStorage();
  }, [currentTheme]);

  return (
    <StateContext.Provider
      value={{
        showSettings,
        setShowSettings,
        handleClose,
        handleShow,
        currentTheme,
        setCurrentTheme,
        colorStrong,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
