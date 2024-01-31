import { Button } from "react-bootstrap";
import useJwt from "../../hooks/useJwt";
import useUserData from "../../hooks/useUserData";
import Loading from "../Loading";
import Settings from "./Tools/Settings";
import { useStateContext } from "./Tools/context/ContextProvider";
import { GearFill, Trash3Fill } from "react-bootstrap-icons";
import tinycolor from "tinycolor2";
import Notes from "./Tools/Notes";
import List from "./Tools/List";
import Money from "./Tools/Money";
import Calendar from "./Tools/Calendar/Calendar";

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
  console.log(dashboardData.partecipants);

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

        {/*           {dashboardData.activities.map((activity, i) => (
            <Col xs={4} key={i}>
              <div>
                {activity.title}
                {activity.description}
              </div>
            </Col>
          ))} */}
        <Notes
          colorStrong={colorStrong}
          title={"prova"}
          description={"prova prova prova"}
        />
        <List
          colorStrong={colorStrong}
          title={"lista della spesa"}
          description={"prova prova prova"}
        />
        <Money colorStrong={colorStrong} title={"conti"} />
        <Calendar colorStrong={colorStrong} title={"calendario"} />

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
