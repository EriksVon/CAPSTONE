import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/main");
  };
  return (
    <Container>
      <Row>
        <Col md={7} className="mx-auto my-5 rounded p-4 bg-white">
          <Form onSubmit={handleSubmit}>
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
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <GoogleLoginButton onClick={() => alert("Hello")} />
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
