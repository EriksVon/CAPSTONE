import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ReactComponent as Ullalla } from "../styles/images/planMe2.svg";

function MyNav() {
  return (
    <Navbar expand="lg" sticky="top" className="bg-white p-0">
      <Container>
        <Navbar.Brand href="/">
          <img href="../styles/images/planMe.svg" alt="" />
          {/*           <FbLogo /> */}
          <Ullalla width="120px" />
        </Navbar.Brand>
        <Nav.Link href="/wip" className="ms-auto me-3">
          About Us
        </Nav.Link>
        <Nav.Link href="/wip">How it works</Nav.Link>
      </Container>
    </Navbar>
  );
}

export default MyNav;
