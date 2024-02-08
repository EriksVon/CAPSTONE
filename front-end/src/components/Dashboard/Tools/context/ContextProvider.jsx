import { createContext, useContext, useState } from "react";
import tinycolor from "tinycolor2";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const themeMode = localStorage.getItem("themeMode");
  const [showSettings, setShowSettings] = useState(false);

  const handleShow = () => setShowSettings(true);
  const handleClose = () => setShowSettings(false);

  const dashboardId = localStorage.getItem("dashboardId");
  const colorStrong = tinycolor(themeMode).darken(20).toString();
  console.log("colorStrong", colorStrong, "themeMode", themeMode);

  return (
    <StateContext.Provider
      value={{
        showSettings,
        setShowSettings,
        dashboardId,
        handleClose,
        handleShow,
        themeMode,
        colorStrong,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
