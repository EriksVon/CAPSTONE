import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ReactComponent as PlanMeLogo } from "../styles/images/planMe2.svg";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import useUserData from "../hooks/useUserData";

function MyNav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { userData } = useUserData(userId, token);
  console.log("userData:", userData);

  const isUserLoggedIn = token && userId;

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_ENDPOINT_URL}/profile/session`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const deleteAccount = () => {
    try {
      fetch(`${process.env.REACT_APP_ENDPOINT_URL}/profile/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}}`,
        },
      }).then(() => {
        localStorage.clear();
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" sticky="top" className="bg-white">
      <Container className="d-flex gap-2">
        <Link to={isUserLoggedIn ? "/" : "/login"}>
          <Navbar.Brand>
            <PlanMeLogo width="120px" />
          </Navbar.Brand>
        </Link>
        <Nav.Link href="/wip" className="ms-auto d-none d-sm-inline">
          About Us
        </Nav.Link>
        <Nav.Link href="/wip" className="d-none d-sm-inline">
          How it works
        </Nav.Link>
        {isUserLoggedIn ? (
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown dropdown-drop-end"
              className="pinkBgButton text-decoration-none"
            >
              Hi {userData ? userData.name : ""}
            </Dropdown.Toggle>
            <Dropdown.Menu drop="end-start">
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              <Dropdown.Item onClick={deleteAccount}>
                Delete account
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/wip" className="d-md-none">
                About us
              </Dropdown.Item>
              <Dropdown.Item href="/wip" className="d-md-none">
                How it works
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          ""
        )}
      </Container>
    </Navbar>
  );
}

export default MyNav;
