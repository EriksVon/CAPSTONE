import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./components/Dashboard/Tools/context/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

reportWebVitals();
