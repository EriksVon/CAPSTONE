import React from "react";
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
  console.log(userData);
  const themeMode = localStorage.getItem("themeMode");
  const colorStrong = tinycolor(themeMode).darken(25).toString();
  const dashboardId = localStorage.getItem("dashboardId");

  if (!dashboardId) {
    navigate("/create-or-join");
  }
  if (!userData) {
    return <Loading />;
  }

  const dashboardData = userData.dashboards[0];
  console.log(dashboardData);

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
