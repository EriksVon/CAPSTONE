import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as ImgJoin } from "../../styles/images/img-accesso.svg";

const DashAccess = () => {
  return (
    <Container>
      <Row>
        <Col
          xs={10}
          className="mx-auto my-5 d-flex flex-column align-items-center justify-items-center"
        >
          <ImgJoin />
          <h1 className="fw-bolder my-4">Let's start!</h1>
          <div className="d-flex align-items-center justify-items-center gap-2">
            <button className="pinkBgButton p-4 fs-5 rounded-3">
              <Link
                style={{ textDecoration: "none", color: "#f75959" }}
                to="/wip"
              >
                Create a new dashboard
              </Link>
            </button>
            <button className="pinkBgButton p-4 fs-5 rounded-3">
              <Link
                style={{ textDecoration: "none", color: "#f75959" }}
                to="/join-dashboard"
              >
                Join an existing dashboard
              </Link>
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashAccess;
