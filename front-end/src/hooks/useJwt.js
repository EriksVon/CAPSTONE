import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useJwt() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.get("userId")) {
    localStorage.setItem("userId", searchParams.get("userId"));
    if (searchParams.get("token"))
      localStorage.setItem("token", searchParams.get("token"));
  }

  const userData = {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  };

  useEffect(() => {
    if (!userData.userId || !userData.token) {
      navigate("/login");
    }
    if (window.location.search) {
      navigate(window.location.pathname);
    }
  }, [userData.userId, userData.token, navigate]);
  return userData;
}
