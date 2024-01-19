import { Button, Container } from "react-bootstrap";
import useJwt from "../../hooks/useJwt";
import useUserData from "../../hooks/useUserData";
import Loading from "../Loading";
import Settings from "./Tools/Settings";
import Calendar from "./Tools/Calendar";
import Notes from "./Tools/Notes";
import Money from "./Tools/Money";
import { useStateContext } from "./Tools/context/ContextProvider";
import { GearFill } from "react-bootstrap-icons";
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
  console.log(dashboardToken);

  return (
    <div
      style={{
        backgroundColor: currentTheme,
        border: "solid 20px",
        borderColor: colorStrong,
        height: "80vh",
        width: "90vw",
      }}
    >
      {showSettings && <Settings dashboardToken={dashboardToken} />}
      <Container className="mx-auto text-center">
        {dashboardData ? (
          <>
            <h2>{dashboardData.title}</h2>
          </>
        ) : (
          <div>Loading...</div>
        )}

        <Calendar />
        <Notes />
        <Money />
        <div content="settings">
          <Button onClick={handleShow} style={{ backgroundColor: colorStrong }}>
            <GearFill />
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
