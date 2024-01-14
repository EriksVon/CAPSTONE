import { useState } from "react";
import { Container, Row, Modal, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";

function Register() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [body, setBody] = useState({
    name: "",
    surname: "",
    email: "",
    /*  username: "", */
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_URL}/profile`,
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
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      setValidated(true);
      navigate("/");
    } else {
      setBody({ ...body, password: "" });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={7} className="mx-auto my-5 rounded p-4 bg-white">
          <Form
            noValidate
            validated={validated}
            onSubmit={(event) => handleSubmit(event)}
          >
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Create a new account</Modal.Title>
                <Link to="/login">Back to sign in</Link>
              </Modal.Header>
              <div className="mx-3">
                <Modal.Body>
                  <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      value={body.email}
                      required
                      onInput={(e) =>
                        setBody({ ...body, email: e.target.value })
                      }
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-1" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={body.name}
                      required
                      onInput={(e) =>
                        setBody({ ...body, name: e.target.value })
                      }
                      type="name"
                      placeholder="Enter your name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-1" controlId="formBasicSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      value={body.surname}
                      required
                      onInput={(e) =>
                        setBody({ ...body, surname: e.target.value })
                      }
                      type="surname"
                      placeholder="Enter your surname"
                    />
                  </Form.Group>

                  {/*                   <Form.Group className="mb-1" controlId="formBasicUserId">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      value={body.username}
                      type="username"
                      onInput={(e) =>
                        setBody({ ...body, username: e.target.value })
                      }
                      placeholder="Enter you username"
                    />
                  </Form.Group> */}

                  <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={body.password}
                      required
                      onInput={(e) =>
                        setBody({ ...body, password: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-1" controlId="formBasicPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Phone number"
                      value={body.phoneNumber}
                      onInput={(e) =>
                        setBody({ ...body, phoneNumber: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <GoogleLoginButton
                    onClick={() => {
                      window.location.assign(
                        `${process.env.REACT_APP_ENDPOINT_URL}/profile/oauth-google`
                      );
                    }}
                  />
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
