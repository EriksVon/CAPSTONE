import { useState, useEffect } from "react";

const useDashboardData = (dashboardId, token) => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardId = localStorage.getItem("dashboardId");
      const token = localStorage.getItem("token");

      if (!dashboardId || !token) {
        console.error("dashboardId o token mancante");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(
            "Errore nella richiesta GET:",
            response.status,
            response.statusText
          );
        } else {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
      }
    };

    fetchData();
  }, []);

  return dashboardData;
};

export default useDashboardData;
