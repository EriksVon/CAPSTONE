import { useState } from "react";
import { Container, Row, Modal, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, redirect, useNavigate } from "react-router-dom";
import { ReactComponent as ImgLogin } from "../../styles/images/img-home.svg";
import { ReactComponent as GoogleLogo } from "../../styles/images/google.svg";

function Register() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [body, setBody] = useState({
    name: "",
    surname: "",
    email: "",
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
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);
      localStorage.setItem("email", data.email);
      setValidated(true);
      navigate("/create-or-join");
    } else {
      const errorData = await response.json();
      alert(errorData.message);
      setBody({ ...body, password: "" });
      redirect("/login");
    }
  };

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center">
        <Col xl={6} className="d-none d-xl-inline m-0 p-0">
          <ImgLogin />
        </Col>

        <Col xs={10} xl={6}>
          <Modal.Dialog>
            <Link to="/login" className="text-end text-decoration-none">
              Back to sign in
            </Link>
            <Modal.Header className="d-flex flex-column">
              <Modal.Title className="fs-1 fw-bolder mb-3">
                Create a new account
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="d-flex flex-column gap-3 mb-3">
              <Form
                noValidate
                validated={validated}
                onSubmit={(event) => handleSubmit(event)}
              >
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={body.email}
                    required
                    onInput={(e) => setBody({ ...body, email: e.target.value })}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={body.name}
                    required
                    onInput={(e) => setBody({ ...body, name: e.target.value })}
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

                {/*<Form.Group className="mb-1" controlId="formBasicUserId">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control value={body.username} type="username"
                      onInput={(e) => setBody({ ...body, username: e.target.value }) }
                      placeholder="Enter you username" />
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

                <div className="text-center mt-3">
                  <button
                    type="submit"
                    className="coralBgButton fs-5"
                    style={{ width: "100%" }}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Modal.Body>

            <Modal.Body className="d-flex flex-column gap-3">
              {/* LOGIN CON GOOGLE */}
              <Modal.Title className="fs-6 fw-bold text-center">
                Or:
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
              </button>
              <small className="mb-3">
                Effettuando l'accesso o creando un account accetti i Termini, le
                Condizioni e l'informativa sulla privacy
              </small>
            </Modal.Body>
          </Modal.Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
