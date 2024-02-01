import React from "react";
import { Button } from "react-bootstrap";
import useJwt from "../../hooks/useJwt";
import useUserData from "../../hooks/useUserData";
import Loading from "../Loading";
import Settings from "./Tools/Settings";
import { useStateContext } from "./Tools/context/ContextProvider";
import { GearFill, Trash3Fill } from "react-bootstrap-icons";
import tinycolor from "tinycolor2";
import Calendar from "./Tools/Calendar/Calendar";
import Money from "./Tools/Money";
import List from "./Tools/List";
import Notes from "./Tools/Notes";

function Dashboard() {
  /* DON'T TUCH MY BRAIL --->*/
  const { userId, token } = useJwt();
  const { userData } = useUserData(userId, token);
  const {
    currentTheme,
    setCurrentTheme,
    showSettings,
    handleShow,
    colorStrong,
  } = useStateContext();

  const activityComponents = {
    Calendar: <Calendar colorStrong={colorStrong} title={"My calendar"} />,
    Money: <Money colorStrong={colorStrong} title={"Counts"} />,
    List: (
      <List colorStrong={colorStrong} title={"My list"} description={"prova"} />
    ),
    Notes: (
      <Notes
        colorStrong={colorStrong}
        title={"My notes"}
        description={"prova"}
      />
    ),
  };
  if (!userData) {
    return <Loading />;
  }
  const dashboardData = userData.dashboards[0];
  const dashboardId = dashboardData._id;
  localStorage.setItem("dashboardId", dashboardId);
  if (!dashboardData) {
    return <Loading />;
  }

  if (!currentTheme || currentTheme === null) {
    let theme = dashboardData.theme;
    localStorage.setItem("themeMode", theme);
    const colorStrong = tinycolor(theme).darken(10).toString();
    localStorage.setItem("colorStrong", colorStrong);
    setCurrentTheme(theme);
  }
  /* <--- DON'T TUCH MY BRAIL */

  const dashboardToken = dashboardData.dashboardToken;
  console.log(dashboardData.activities);

  return (
    <div
      className="d-flex flex-column"
      style={{
        backgroundColor: colorStrong,
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <h1 className="text-center">{dashboardData.title}</h1>

      <div
        className="dashboardContainer"
        style={{ backgroundColor: currentTheme }}
      >
        {showSettings && (
          <Settings
            dashboardToken={dashboardToken}
            partecipants={dashboardData.partecipants}
          />
        )}

        {dashboardData.activities.map((activity, i) => {
          const component = activityComponents[activity.type];
          return (
            component && <React.Fragment key={i}>{component}</React.Fragment>
          );
        })}

        <div content="settings">
          <Button
            style={{
              backgroundColor: colorStrong,
              marginRight: "10px",
              paddingBottom: "8px",
              color: "black",
            }}
          >
            <Trash3Fill />
          </Button>

          <Button
            onClick={handleShow}
            style={{
              backgroundColor: colorStrong,
              paddingBottom: "8px",
              color: "black",
            }}
          >
            <GearFill />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
