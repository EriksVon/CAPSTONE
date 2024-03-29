import { Col, Container, Row } from "react-bootstrap";
import { ReactComponent as ImgDashboard } from "../styles/images/img-dashboard.svg";

function WorkInProgress() {
  return (
    <Container className="text-center">
      <Row>
        <Col md={12} className="mx-auto my-5 rounded text-center">
          <ImgDashboard />
          <h5 className="mt-3">Work in progress... please be patient!</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default WorkInProgress;
