import React from "react";
import useJwt from "../../hooks/useJwt";
import useUserData from "../../hooks/useUserData";
import Loading from "../Loading";
import Settings from "./Tools/Settings";
import { useStateContext } from "./Tools/context/ContextProvider";
import DashboardTitle from "./DashboardTitle";
import ToolsList from "./ToolsList";
import tinycolor from "tinycolor2";
// import { fetchDashboardData } from "";

function Dashboard() {
  const { userId, token } = useJwt();
  const { userData } = useUserData(userId, token);
  const { handleShow, showSettings } = useStateContext();

  const themeMode = localStorage.getItem("themeMode");
  const colorStrong = tinycolor(themeMode).darken(10).toString();

  if (!userData) {
    return <Loading />;
  }

  const dashboardData = userData.dashboards[0];

  if (!dashboardData) {
    return <Loading />;
  }

  const dashboardToken = dashboardData.dashboardToken;

  return (
    <div
      className="d-flex flex-column"
      style={{
        backgroundColor: themeMode,
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <DashboardTitle
        title={dashboardData.title}
        handleShow={handleShow}
        colorStrong={colorStrong}
      />
      <ToolsList
        activities={dashboardData.activities}
        colorStrong={colorStrong}
      />
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
