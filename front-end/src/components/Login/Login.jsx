import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";

function Login() {
  const navigate = useNavigate();

  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${process.env.REACT_APP_ENDPOINT_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      let data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.payload.id);
      navigate("/main");
    } else {
      document.getElementById("error").innerHTML = "Wrong Credentaials!";
      setBody({ ...body, password: "" });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={7} className="mx-auto my-5 rounded p-4 bg-white">
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Modal.Dialog>
              <Container>
                <Row>
                  <Modal.Header>
                    <Modal.Title>Sign in</Modal.Title>
                    <div>
                      New on this platform?{" "}
                      <Link to="/register">Create an account</Link>
                    </div>
                  </Modal.Header>
                </Row>
              </Container>

              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={body.email}
                    required
                    onInput={(e) => setBody({ ...body, email: e.target.value })}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
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
                <p
                  id="error"
                  className="text-danger mt-3 mb-0 fw-semibold text-center"
                />
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <GoogleLoginButton
                  onClick={() => {
                    window.location.assign(
                      "http://localhost:3001/profile/oauth-google"
                    );
                  }}
                />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
