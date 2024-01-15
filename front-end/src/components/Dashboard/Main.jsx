import { Col, Container, Row } from "react-bootstrap";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useJwt from "../../hooks/useJwt";

function Main() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const { userId, token } = useJwt();
  console.log(userId, token);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        console.log(user);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate, token, userId]);

  return (
    <Container>
      <Row>
        <Col md={7} className="mx-auto my-5 rounded p-4 bg-white text-center">
          {user ? (
            <div className="">
              <h1 className="mb-4">WELCOME {user.name}</h1>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
