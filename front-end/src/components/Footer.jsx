import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ReactComponent as FbLogo } from "../styles/images/facebook-footer.svg";
import { ReactComponent as IgLogo } from "../styles/images/insta-footer.svg";
import { ReactComponent as LkLogo } from "../styles/images/linkedin-footer.svg";

function Footer() {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Navbar
      expand="lg"
      fixed="bottom"
      className="pinkBg py-3 d-none d-sm-block"
    >
      <Container>
        <Nav.Item>
          <small>&copy; Copyright {getYear()} , Example Corporation</small>
        </Nav.Item>
        <Nav.Link href="/wip" className="ms-auto">
          <FbLogo />
        </Nav.Link>
        <Nav.Link href="/wip" className="mx-3">
          <IgLogo />
        </Nav.Link>
        <Nav.Link href="/wip">
          <LkLogo />
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default Footer;
