import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashAccess = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Container>
      <Row className="d-flex flex-column">
        <Col
          md={6}
          className="mx-auto mt-5 rounded p-4 bg-white d-flex gap-3 justify-content-center"
        >
          <Link to="/create">
            <Button>Create a new dashboard</Button>
          </Link>
          <Button onClick={handleShow}>Join a dashboard</Button>
        </Col>
        {show && (
          <Col
            md={6}
            className="mx-auto rounded p-4"
            style={{ backgroundColor: "lightgray" }}
          >
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title className="my-2">Join a dashboard: </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  E-mail: <input type="text" />
                </p>

                <p>
                  Enter the dashboard Token to join:{" "}
                  <input type="text" placeholder="TXRE34SE" />
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary">Join</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DashAccess;
