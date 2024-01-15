import { Container } from "react-bootstrap";
import "./Main.css";
import useJwt from "../../hooks/useJwt";
import useUserData from "../../hooks/useUserData";

function Main() {
  const { userId, token } = useJwt();
  const { userData, loading } = useUserData(userId, token);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!userData) {
    return <div>Error loading user data</div>;
  }

  return (
    <Container className="mx-auto text-center">
      {userData ? <h1>WELCOME {userData.name}</h1> : <div>Loading...</div>}
    </Container>
  );
}

export default Main;
