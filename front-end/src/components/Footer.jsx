import Container from "react-bootstrap/Container";
import { ReactComponent as FbLogo } from "../styles/images/facebook-footer.svg";
import { ReactComponent as IgLogo } from "../styles/images/insta-footer.svg";
import { ReactComponent as LkLogo } from "../styles/images/linkedin-footer.svg";
import { Link } from "react-router-dom";

function Footer() {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div
      fixed="bottom"
      className="text-white py-3"
      style={{ backgroundColor: "#f75959" }}
    >
      <Container className="d-flex align-items-center">
        <small>&copy; Copyright {getYear()} , Example Corporation</small>
        <Link to={"/wip"} className="ms-auto">
          <FbLogo />
        </Link>
        <Link to={"/wip"} className="mx-3">
          <IgLogo />
        </Link>
        <Link to={"/wip"}>
          <LkLogo />
        </Link>
      </Container>
    </div>
  );
}

export default Footer;
