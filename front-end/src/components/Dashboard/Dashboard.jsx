import { Button, Col, Container, Row } from "react-bootstrap";
import useJwt from "../../hooks/useJwt";
import useUserData from "../../hooks/useUserData";
import Loading from "../Loading";
import Settings from "./Tools/Settings";
import Calendar from "./Tools/Calendar";
import Notes from "./Tools/Notes";
import Money from "./Tools/Money";
import { useStateContext } from "./Tools/context/ContextProvider";
import { GearFill, Trash3Fill } from "react-bootstrap-icons";
import tinycolor from "tinycolor2";

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
    <div className="text-center">
      <h1
        style={{
          backgroundColor: colorStrong,
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {dashboardData.title}
      </h1>
      <div
        style={{
          backgroundColor: currentTheme,
          borderRadius: "10px",
          height: "70vh",
          width: "90vw",
          padding: "20px",
        }}
      >
        {showSettings && (
          <Settings
            dashboardToken={dashboardToken}
            partecipants={dashboardData.partecipants}
          />
        )}
        <Container className="mx-auto text-center">
          <Row>
            {dashboardData.activities.map((activity, i) => (
              <Col xs={4} key={i}>
                <Notes
                  title={activity.title}
                  description={activity.description}
                />
              </Col>
            ))}
          </Row>
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
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;
