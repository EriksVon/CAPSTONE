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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_ENDPOINT_URL}/dashboard/join-dashboard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setShowError(false);
        navigate("/");
      } else {
        if (response.status === 404) {
          alert("Dashboard not found");
          body.dashboardToken = "";
        } else if (response.status === 401) {
          alert("Wrong credentials");
          body.dashboardToken = "";
          body.email = "";
        } else if (response.status === 400) {
          alert("Dashboard already joined");
          navigate("/");
        } else {
          alert("Error occurred while joining the dashboard");
        }
      }
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <Container>
      <Row>
        <Col
          xs={7}
          className="mx-auto my-3 d-flex flex-column align-items-center justify-items-center"
        >
          <ImgDash />
          <h1 className="fw-bolder my-4 text-center">Join a dashboard!</h1>
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
                    required
                    onInput={(e) =>
                      setBody({
                        ...body,
                        dashboardToken: e.target.value,
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
