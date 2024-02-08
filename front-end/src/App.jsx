import MyNav from "./components/Nav";
import Footer from "./components/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import WorkInProgress from "./components/WorkInProgress";
import JoinDashboard from "./components/CreateOrJoin/JoinDashboard";
import DashAccess from "./components/CreateOrJoin/DashAccess";
import CreateDashboard from "./components/CreateOrJoin/CreateDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HowItWorks from "./components/HowItWorks";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wip" element={<WorkInProgress />} />
        <Route path="/create-or-join" element={<DashAccess />} />
        <Route path="/join-dashboard" element={<JoinDashboard />} />
        <Route path="/create" element={<CreateDashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
