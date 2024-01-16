import { Container } from "react-bootstrap";
import useJwt from "../../hooks/useJwt";
import useUserData from "../../hooks/useUserData";

function Dashboard() {
  const { userId, token } = useJwt();
  const { userData } = useUserData(userId, token);

  console.log(userData);

  if (!userData) {
    return <div>Error loading user data</div>;
  }

  const dashboardData = userData.dashboards[0];
  console.log(dashboardData);

  if (!dashboardData) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <Container className="mx-auto text-center">
      {userData ? <h1>WELCOME {userData.name}</h1> : <div>Loading...</div>}

      {dashboardData ? (
        <>
          <h2>{dashboardData.title}</h2>
          <h3>
            {dashboardData.activities.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </h3>
          <h3>
            {dashboardData.emails.map((email, i) => (
              <li key={i}>{email}</li>
            ))}
          </h3>
          <h3>{dashboardData.theme}</h3>
          <h3>
            {dashboardData.partecipants.map((partec, i) => (
              <li key={i}>{partec}</li>
            ))}
          </h3>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default Dashboard;
