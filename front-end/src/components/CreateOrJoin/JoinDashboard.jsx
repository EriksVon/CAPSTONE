import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgDash } from "../../styles/images/img-dashboard.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function JoinDashboard() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const [body, setBody] = useState({
    email: "",
    dashboardToken: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(true);
    navigate("/wip");
  };

  return (
    <Container>
      <Row>
        <Col
          xs={7}
          className="mx-auto my-3 d-flex flex-column align-items-center justify-items-center"
        >
          <ImgDash />
          <h1 className="fw-bolder my-4">Join a dashboard!</h1>
        </Col>
        <Col xs={7} className="mx-auto">
          <Modal.Dialog>
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Modal.Body className="d-flex flex-column gap-3 mb-3">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={body.email}
                    required
                    onInput={(e) => setBody({ ...body, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Enter token"
                    value={body.dashboardToken}
                    /* required */
                    onInput={(e) =>
                      setBody({
                        ...body,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <button type="submit" className="coralBgButton fs-5">
                  Login
                </button>
              </Modal.Body>
            </Form>
            <p
              id="error"
              className={`text-danger fw-semibold text-center ${
                showError ? "d-block" : "d-none"
              }`}
            >
              Wrong Credentaials!
            </p>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}
export default JoinDashboard;
