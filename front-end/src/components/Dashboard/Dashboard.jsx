import { useEffect, useState } from "react";
import useJwt from "../../hooks/useJwt";
import Loading from "../Loading.jsx";
import useUserData from "../../hooks/useUserData.js";

const Dashboard = () => {
  const { userId, token } = useJwt();
  const { userData } = useUserData(userId, token);
  const [loading, setLoading] = useState(true);
  console.log(userData);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>Dashboard</h1>
          {/*           <div>{dashboard.title}</div>
          <div>{dashboard.dashboardToken}</div>
          <div>{dashboard.theme}</div>
          <div>{dashboard.avatar}</div>
          <div>{dashboard.partecipants.map((part) => part)}</div>*/}
          {/* <div>{dashboard.activities.map((act) => act)}</div> */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
