import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { combinedThemes } from "../../../data/data";
import { useState } from "react";
import { CheckLg, Trash } from "react-bootstrap-icons";
import { useStateContext } from "./context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { activities } from "../../../data/data";

const Settings = ({ dashboardToken, partecipants }) => {
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const handleButtonClick = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const dashboardId = localStorage.getItem("dashboardId");
  const { showSettings, handleClose } = useStateContext();
  const [title, setTitle] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);
  /* const [activity, setActivity] = useState([]); */
  /* const [avatar, setAvatar] = useState(""); */
  const [themeValue, setThemeValue] = useState("");
  const [email, setEmail] = useState("");

  const handleActivities = (act) => {
    console.log(act);
    if (selectedActivity === act.type) {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(act.type);
    }
  };
  const dashboard = {
    emails: email,
    title: title,
    theme: themeValue,
    activities: [
      {
        type: selectedActivity,
        description: "Write here",
      },
    ],
    dashboardToken,
    /*  avatar: avatar, */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dashboard);
    if (dashboard.emails === "") {
      delete dashboard.emails;
      delete dashboard.dashboardToken;
    }
    if (dashboard.title === "") {
      delete dashboard.title;
    }
    if (dashboard.activities[0].length === 0) {
      delete dashboard.activities;
    }
    /*     if (dashboard.avatar === "") {
      delete dashboard.avatar;
    } */
    if (dashboard.theme === "") {
      delete dashboard.theme;
    }

    const response = await fetch(
      `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}`,
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
      const updatedDashboard = await response.json();
      console.log(updatedDashboard);

      const theme = updatedDashboard.theme;
      if (theme) localStorage.setItem("themeMode", theme);
      handleClose();
      window.location.reload();
    }
  };

  const deleteDashboard = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Dashboard eliminata con successo");
        navigate("/create-or-join");
      } else {
        console.error(
          "Errore nella richiesta DELETE:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Errore nella richiesta DELETE:", error);
    }
  };

  const deleteUser = (i) => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (userConfirmed) {
        const newPartecipants = [...partecipants];
        newPartecipants.splice(i, 1);

        const newDashboard = {
          ...dashboard,
          emails: newPartecipants,
        };
        handleSubmit(newDashboard);
      }
    } catch (error) {
      console.error("Errore nella richiesta DELETE:", error);
    }
  };

  return (
    <>
      <Modal fullscreen show={showSettings} onHide={handleClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>Dashboard Settings:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                <Col className="d-flex" xs={2}>
                  {combinedThemes.map((option) => (
                    <Col key={option.color}>
                      <Button
                        style={{
                          position: "relative",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        id={`radio-${option.id}`}
                        type="button"
                        onClick={() => {
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
                            option.color === themeValue ? "d-block" : "d-none"
                          }`}
                        />
                      </Button>
                    </Col>
                  ))}
                </Col>
              </Form.Group>

              <Form.Group controlId="formThemes">
                <Form.Label column>
                  Add an activity to your dashboard:
                </Form.Label>
                <Col className="d-flex gap-2" xs={2}>
                  {activities.map((act, index) => (
                    <Col key={index}>
                      <Button
                        className={`whiteBgButton d-flex flex-grow-1 ${
                          selectedActivity === act.type ? "active" : ""
                        }`}
                        onClick={() => {
                          handleActivities(act);
                        }}
                      >
                        {act.type}
                      </Button>
                    </Col>
                  ))}
                </Col>
              </Form.Group>

              {/*           <Form.Group controlId="formImg">
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
          </Form.Group> */}

              <button
                type="submit"
                className="pinkBgButton"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </Form>
            <h3 className="mt-5">DANGER ZONE</h3>
            <Container className="border border-danger">
              <Row className="d-flex gap-2">
                <Col>
                  <button
                    onClick={handleButtonClick}
                    className="pinkBgButton m-2"
                  >
                    {showPassword ? "Hide Token" : "Show Token"}
                  </button>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={dashboardToken}
                    readOnly
                    className="text-center mx-auto"
                  />
                </Col>

                <Col xs={12}>
                  <h5>Partecipants:</h5>
                  <div>
                    {partecipants.map((part, i) => (
                      <div className="my-1" key={i}>
                        <button
                          className="coralBgButton me-2 px-1 py-0"
                          onClick={() => deleteUser(i)}
                        >
                          <Trash />
                        </button>
                        {part.email}
                      </div>
                    ))}
                  </div>
                </Col>

                <Col>
                  <Button
                    variant="danger"
                    className="my-3"
                    onClick={() => setShow(true)}
                  >
                    Delete Dashboard Permanently
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Container>
      </Modal>
      <Alert show={show} variant="danger" style={{ zIndex: "10000" }}>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="light">
            Close
          </Button>
        </div>
        <Alert.Heading>Delete Dashboard</Alert.Heading>
        <p>
          Are you sure you want to delete this dashboard? This action cannot be
          undone. If you delete this dashboard, all the data will be lost.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={deleteDashboard} variant="danger">
            DELETE DASHBOARD PERMANENTLY
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default Settings;
