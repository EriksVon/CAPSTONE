import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found");
          navigate("/login");
          return;
        }

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
        }
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
        navigate("/login");
        localStorage.clear();
      }
    };

    fetchData();
  }, [navigate]);

  return { dashboardData };
};

export default useDashboardData;
