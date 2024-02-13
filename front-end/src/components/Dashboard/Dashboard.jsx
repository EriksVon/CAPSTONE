import React, { useEffect, useState } from "react";
import useJwt from "../../hooks/useJwt";
import Loading from "../Loading";
import Settings from "./Tools/Settings";
import DashboardTitle from "./DashboardTitle";
import ToolsList from "./ToolsList/ToolsList";
import tinycolor from "tinycolor2";

function Dashboard() {
  const { token } = useJwt();
  const [showSettings, setShowSettings] = useState(false);
  const dashId = localStorage.getItem("dashboardId");
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const handleSettings = () => setShowSettings(!showSettings);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          console.error(
            "Error loading dashboard data:",
            response.status,
            response.statusText
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dashId, token]);

  if (loading) {
    return <Loading />;
  }

  const themeMode = dashboardData.theme.toString();
  const colorStrong = tinycolor(themeMode).darken(25).toString();

  return (
    <div style={{ backgroundColor: themeMode }} className="dashboardContainer">
      <DashboardTitle
        title={dashboardData.title}
        colorStrong={colorStrong}
        handleSettings={handleSettings}
      />

      <div>
        <ToolsList
          activities={dashboardData.activities}
          colorStrong={colorStrong}
          themeMode={themeMode}
          dashId={dashId}
        />
      </div>
      {showSettings && (
        <Settings
          dashboardToken={dashboardData.dashboardToken}
          partecipants={dashboardData.partecipants}
          handleSettings={handleSettings}
          showSettings={showSettings}
        />
      )}
    </div>
  );
}

export default Dashboard;
