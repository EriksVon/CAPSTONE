import { useState } from "react";
import { Container, Row, Modal, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";

function Register() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    navigate("/access");
  };

  return (
    <Container>
      <Row>
        <Col md={7} className="mx-auto my-5 rounded p-4 bg-white">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Create a new account</Modal.Title>
                <Link to="/">Back to sign in</Link>
              </Modal.Header>
              <div className="mx-3">
                <Modal.Body>
                  <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1" controlId="formBasicUserId">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      required
                      type="userId"
                      placeholder="Enter you user name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-1" controlId="formBasicPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Phone number"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3
                  "
                    controlId="formBasicCheckbox"
                  >
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <GoogleLoginButton onClick={() => alert("Hello")} />
                </Modal.Body>
              </div>

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

export default Register;
