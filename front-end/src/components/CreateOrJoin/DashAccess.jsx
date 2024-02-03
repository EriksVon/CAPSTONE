import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ImgJoin } from "../../styles/images/img-accesso.svg";
import useJwt from "../../hooks/useJwt";
import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";

const DashAccess = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useJwt();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          navigate("/login");
          return;
        }
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          console.log("non hai ancora una dashboard");
        } else {
          const data = await response.json();
          const dashData = data.dashboards[0];
          console.log(dashData);
          localStorage.setItem("themeMode", dashData.theme);
          localStorage.setItem("dashboardId", dashData._id);
          const colorStrong = tinycolor(dashData.theme).darken(10).toString();
          localStorage.setItem("colorStrong", colorStrong);
          setDashboardData(dashData);
        }
      } catch (error) {
        console.log("Errore durante la richiesta:", error);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (dashboardData) {
      navigate("/");
    }
  }, [dashboardData, navigate]);

  if (!dashboardData) {
    return (
      <Container>
        <Row className="text-center">
          <Col xs={12}>
            <ImgJoin />
            <h1 className="fw-bolder my-4">Let's start!</h1>
          </Col>
          <Col xs={12}>
            <button className="pinkBgButton p-4 fs-5 rounded-3">
              <Link
                style={{ textDecoration: "none", color: "#f75959" }}
                to="/create"
              >
                Create a new dashboard
              </Link>
            </button>
            <button className="pinkBgButton p-4 fs-5 m-2 rounded-3">
              <Link
                style={{ textDecoration: "none", color: "#f75959" }}
                to="/join-dashboard"
              >
                Join an existing dashboard
              </Link>
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
  return null;
};

export default DashAccess;
