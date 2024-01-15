import MyNav from "./components/Nav";
import Footer from "./components/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import WorkInProgress from "./components/WorkInProgress";
import JoinDashboard from "./components/CreateOrJoin/JoinDashboard";
import DashAccess from "./components/CreateOrJoin/DashAccess";
import Main from "./components/Dashboard/Main";
import CreateDashboard from "./components/CreateOrJoin/CreateDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <div className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wip" element={<WorkInProgress />} />
            <Route path="/create-or-join" element={<DashAccess />} />
            <Route path="/join-dashboard" element={<JoinDashboard />} />
            <Route path="/create" element={<CreateDashboard />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
