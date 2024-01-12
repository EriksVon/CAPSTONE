import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function MyNav() {
  return (
    <Navbar expand="lg" sticky="top" className="bg-white">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="planMe"
            src="src/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          PlanMe
        </Navbar.Brand>
        <Nav.Link href="#action1" disabled>
          Home
        </Nav.Link>
        <Nav.Link href="#action2">Link</Nav.Link>
      </Container>
    </Navbar>
  );
}

export default MyNav;
