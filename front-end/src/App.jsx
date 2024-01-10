import { useState } from "react";
import ThemeContext from "./context/theme";
import MyNav from "./components/Nav";
import Footer from "./components/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
// import MyComponent from "./components/MyComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashAccess from "./components/CreateOrJoin/DashAccess";
import Main from "./components/Dashboard/Main";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`${theme}`}>
          <BrowserRouter>
            <MyNav />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/access" element={<DashAccess />} />
              <Route path="/main" element={<Main />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
