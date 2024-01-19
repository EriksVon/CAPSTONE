import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as ImgJoin } from "../../styles/images/img-accesso.svg";
import useJwt from "../../hooks/useJwt";

const DashAccess = () => {
  useJwt();
  return (
    <Container>
      <Row className="text-center">
        <Col xs={12}>
          <ImgJoin />
          <h1 className="fw-bolder my-4">Let's start!</h1>
        </Col>
        <Col xs={12}>
          <button className="pinkBgButton p-4 fs-5 rounded-3">
            <Link
              style={{ textDecoration: "none", color: "#f75959" }}
              to="/create"
            >
              Create a new dashboard
            </Link>
          </button>
          <button className="pinkBgButton p-4 fs-5 m-2 rounded-3">
            <Link
              style={{ textDecoration: "none", color: "#f75959" }}
              to="/join-dashboard"
            >
              Join an existing dashboard
            </Link>
          </button>
        </Col>
        <Col xs={12}>
          <button className="pinkBgButton p-4 fs-5 rounded-3">
            <Link style={{ textDecoration: "none", color: "#f75959" }} to="/">
              Do you already have a dashboard? Click here
            </Link>
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default DashAccess;
