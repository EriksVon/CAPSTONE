import React, { useEffect, useState } from "react";
import useJwt from "../../hooks/useJwt";
import useUserData from "../../hooks/useUserData";
import Loading from "../Loading";
import Settings from "./Tools/Settings";
import { useStateContext } from "./Tools/context/ContextProvider";
import DashboardTitle from "./DashboardTitle";
import ToolsList from "./ToolsList/ToolsList";
import tinycolor from "tinycolor2";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { userId, token } = useJwt();
  const { userData } = useUserData(userId, token);
  const { handleShow, showSettings } = useStateContext();
  const [componentChanges, setComponentChanges] = useState({});
  const [componentId, setComponentId] = useState(null);
  const themeMode = localStorage.getItem("themeMode");
  const colorStrong = tinycolor(themeMode).darken(25).toString();
  const dashboardId = localStorage.getItem("dashboardId");

  const updateComponentChanges = (content, id) => {
    console.log("content", content);
    console.log("id", id);

    if (Array.isArray(content)) {
      setComponentChanges(JSON.stringify(content));
    } else {
      setComponentChanges(content);
    }
    setComponentId(id);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      const dashboardId = localStorage.getItem("dashboardId");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("themeMode", data.theme);
          /*   console.log("Dati dashboard:", data); */
        } else {
          console.error(
            "Error loading dashboard data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dashboardId, token, componentChanges, componentId]);

  useEffect(() => {
    const content = componentChanges;
    const id = componentId;
    const sendDataToBackend = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/update-all`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ activityId: id, content }),
          }
        );
        if (response.ok) {
        } else {
          console.error(
            "Error loading dashboard data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    if (componentChanges) {
      sendDataToBackend();
    }
  }, [dashboardId, token, componentChanges, componentId]);

  if (!dashboardId) {
    navigate("/create-or-join");
  }
  if (!userData) {
    return <Loading />;
  }

  const dashboardData = userData.dashboards[0];

  if (!dashboardData) {
    return <Loading />;
  }

  const dashboardToken = dashboardData.dashboardToken;

  return (
    <div style={{ backgroundColor: themeMode }} className="dashboardContainer">
      <DashboardTitle
        title={dashboardData.title}
        handleShow={handleShow}
        colorStrong={colorStrong}
      />

      <div>
        <ToolsList
          activities={dashboardData.activities}
          colorStrong={colorStrong}
          themeMode={themeMode}
          componentChanges={componentChanges}
          setComponentChanges={setComponentChanges}
          updateComponentChanges={updateComponentChanges}
        />
      </div>
      {showSettings && (
        <Settings
          dashboardToken={dashboardToken}
          partecipants={dashboardData.partecipants}
        />
      )}
    </div>
  );
}

export default Dashboard;
