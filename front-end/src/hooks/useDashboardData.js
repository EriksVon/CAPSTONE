import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.get("userId")) {
    localStorage.setItem("userId", searchParams.get("userId"));
    if (searchParams.get("token"))
      localStorage.setItem("token", searchParams.get("token"));
  }
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch user data:", response.statusText);
          navigate("/login");
          localStorage.clear();
        } else {
          const data = await response.json();
          const dashData = data.dashboards;
          setDashboardData(dashData);
          console.log("Dati dashboard:", dashData);
          if (dashData.length === 0) {
            navigate("/create-or-join");
          }
        }
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
        navigate("/login");
        localStorage.clear();
      }
    };

    fetchData();
  }, [token, navigate]);

  return { dashboardData };
};

export default useDashboardData;
