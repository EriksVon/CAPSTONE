import { Button, Col, Container, Form, Offcanvas, Row } from "react-bootstrap";
import combinedThemes from "../../../data/data";
import { useState } from "react";
import useUserData from "../../../hooks/useUserData";
import { CheckLg } from "react-bootstrap-icons";
import { useStateContext } from "./context/ContextProvider";

const Settings = () => {
  const { userId, token } = useUserData();
  const dashboardId = window.localStorage.getItem("dashboardId");

  const { showSettings, handleClose } = useStateContext();

  const [title, setTitle] = useState("");
  const [activity, setActivity] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [themeValue, setThemeValue] = useState("");
  const [email, setEmail] = useState("");

  const dashboard = {
    emails: email,
    title: title,
    theme: themeValue,
    activities: activity,
    avatar: avatar,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dashboard);
    if (dashboard.emails === "") {
      delete dashboard.emails;
    }
    if (dashboard.title === "") {
      delete dashboard.title;
    }
    if (dashboard.activities.length === 0) {
      delete dashboard.activities;
    }
    if (dashboard.avatar === "") {
      delete dashboard.avatar;
    }
    if (dashboard.theme === "") {
      delete dashboard.theme;
    }

    console.log(dashboard);

    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_URL}/profile/${userId}/${dashboardId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dashboard),
      }
    );
    if (!response.ok) {
      console.error(
        "Errore nella richiesta PUT:",
        response.status,
        response.statusText
      );
    } else {
      await response.json();
      const theme = dashboard.theme;
      localStorage.setItem("themeMode", theme);
      handleClose();
      window.location.reload();
    }
  };

  return (
    <Offcanvas placement="end" show={showSettings} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Dashboard Settings:</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form className="d-flex flex-column gap-4">
          <Form.Group controlId="formHorizontalDashboardName">
            <Form.Label>Change the title</Form.Label>

            <Form.Control
              type="text"
              placeholder="Cip & Ciop"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formHorizontalEmail">
            <Form.Label>Add someone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email@email.de"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Change the theme</Form.Label>
            <Col className="d-flex">
              {combinedThemes.map((option) => (
                <Col key={option.id} xs={2}>
                  <Button
                    style={{
                      position: "relative",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    id={`radio-${option.id}`}
                    type="button"
                    onClick={() => {
                      console.log(option.color);
                      setThemeValue(option.color);
                    }}
                  >
                    {option.image}
                    <CheckLg
                      style={{
                        position: "absolute",
                        top: "30%",
                        left: "35%",
                      }}
                      className={`text-black ${
                        option.id === themeValue ? "d-block" : "d-none"
                      }`}
                    />
                  </Button>
                </Col>
              ))}
            </Col>
          </Form.Group>

          <Form.Group controlId="formThemes">
            <Form.Label column>Add an activity to your dashboard:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Calendar"
              onChange={(e) => setActivity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formImg">
            <Container>
              <Row className="d-flex align-items-center">
                <Form.Label>Choose an image</Form.Label>

                <Form.Group as={Col} controlId="avatar">
                  <Form.Control
                    type="file"
                    multiple={false}
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </Form.Group>
              </Row>
            </Container>
          </Form.Group>

          <button type="submit" className="pinkBgButton" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Settings;
