import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useJwt = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (userId) {
      localStorage.setItem("userId", userId);
      if (token) localStorage.setItem("token", token);
      if (email) localStorage.setItem("email", email);
    }

    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (!storedUserId || !storedToken) {
      navigate("/login");
    }

    if (window.location.search) {
      navigate(window.location.pathname);
    }
  }, [navigate]);

  return {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  };
};

export default useJwt;
