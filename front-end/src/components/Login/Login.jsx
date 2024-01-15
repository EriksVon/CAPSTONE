import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ImgLogin } from "../../styles/images/img-home.svg";
/* import { ReactComponent as GoogleLogo } from "../../styles/images/google.svg"; */

function Login() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_URL}/profile/session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (response.ok) {
      let data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      navigate("/");
    } else {
      setShowError(true);
      setBody({ ...body, password: "" });
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center text-center my-1">
        <Col xl={6} className="d-none d-xl-inline">
          <ImgLogin />
        </Col>

        <Col xs={10} xl={6}>
          <Modal.Dialog>
            <Modal.Header className="d-flex flex-column">
              <strong>Ti diamo il benvenuto su PlanMe</strong>
              <Modal.Title className="fs-1 fw-bolder my-3">Login</Modal.Title>
            </Modal.Header>

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
                    placeholder="Enter password"
                    value={body.password}
                    required
                    onInput={(e) =>
                      setBody({
                        ...body,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  controlId="formBasicCheckbox"
                  className="text-start ms-3"
                >
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <p
                  id="error"
                  className={`text-danger fw-semibold text-center ${
                    showError ? "d-block" : "d-none"
                  }`}
                >
                  Wrong Credentaials!
                </p>
                <button type="submit" className="coralBgButton fs-5">
                  Login
                </button>
              </Modal.Body>
            </Form>

            <Modal.Body className="d-flex flex-column gap-3">
              {/*              <Modal.Title className="fs-6 fw-bold">
                Or choose between one of this options:
              </Modal.Title>
              <button
                className="pinkBgButton d-flex align-items-center justify-content-between"
                onClick={() => {
                  window.location.assign(
                    `${process.env.REACT_APP_ENDPOINT_URL}/profile/oauth-google`
                  );
                }}
              >
                <GoogleLogo />
                <span>Continue with Google</span>
                <span></span>
              </button> */}

              <strong>New on this platform?</strong>
              <Link
                as={Link}
                className="whiteBgButton fs-5"
                style={{ textDecoration: "none", color: "#f75959" }}
                to="/register"
              >
                Create an account
              </Link>
            </Modal.Body>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
