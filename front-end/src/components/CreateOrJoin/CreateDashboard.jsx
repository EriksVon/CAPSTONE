import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { combinedThemes } from "../../data/data";
import { useEffect, useState } from "react";
import useJwt from "../../hooks/useJwt";
import { useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import tinycolor from "tinycolor2";
import { activities } from "../../data/data";

function CreateDashboard() {
  const { userId, token } = useJwt();
  const { userData } = useUserData(userId, token);
  const navigate = useNavigate();
  const [themeValue, setThemeValue] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  /*  const [avatar, setAvatar] = useState(""); */

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const addEmailField = () => {
    setEmailList([...emailList, ""]);
  };

  const removeEmailField = (index) => {
    if (emailList.length > 1) {
      const updatedEmailList = [...emailList];
      updatedEmailList.splice(index, 1);
      setEmailList(updatedEmailList);
    }
  };

  const handleEmailChange = (index, value) => {
    const updatedEmailList = [...emailList];
    updatedEmailList[index] = value;
    setEmailList(updatedEmailList);
  };

  const handleActivities = (activity) => {
    if (selectedActivities.includes(activity.type)) {
      setSelectedActivity(activity.tool);
      setSelectedActivities(
        selectedActivities.filter((item) => item !== activity.type)
      );
    } else {
      setSelectedActivities([...selectedActivities, activity.type]);
      setSelectedActivity(activity);
    }
    console.log(selectedActivities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData && userData.dashboards.length === 0) {
        const dashboard = {
          emails: emailList,
          title: dashboardTitle,
          theme: themeValue,
          activities: selectedActivities.map((activity) => ({
            type: activity,
            description: "",
          })),
          /*   avatar: avatar, */
          partecipants: [userId],
          dashboardToken: Math.random().toString(36).substr(2, 9),
        };
        if (themeValue === "") {
          dashboard.theme = "#ffe0d3";
        }

        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/create-dashboard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dashboard),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Dashboard creata con successo:", data);

          const dashboardId = data.newDashboard._id;
          console.log("dashboardId:", dashboardId);
          localStorage.setItem("dashboardId", dashboardId);

          const mode = data.newDashboard.theme;
          const colorStrong = tinycolor(mode).darken(10).toString();
          localStorage.setItem("themeMode", mode);
          localStorage.setItem("colorStrong", colorStrong);

          navigate("/");
        } else if (response.status === 500) {
          setAlertMessage(
            "Please insert a valid email address and/or a title for your dashboard"
          );
        }
      } else {
        alert("You already have a dashboard!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating a new dashboard:", error);
    }
  };

  return (
    <>
      {alertMessage && (
        <Alert
          variant="warning"
          style={{ zIndex: "10000", position: "absolute", top: "10%" }}
        >
          {alertMessage}
        </Alert>
      )}
      <Container>
        <Form className="d-flex flex-column gap-4">
          <h1 className="text-center">Create your Dashboard</h1>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column xs={3}>
              Add someone
            </Form.Label>
            <Col xs={7}>
              {emailList.map((email, index) => (
                <div key={index} className="d-flex mt-1">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => removeEmailField(index)}
                      className="ms-3 px-3 border-0 pinkBgButton"
                    >
                      -
                    </Button>
                  )}
                </div>
              ))}
            </Col>
            <Col xs={2}>
              <Button
                type="button"
                onClick={addEmailField}
                className="mt-1 pinkBgButton"
              >
                +
              </Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDashboardName">
            <Form.Label column xs={3}>
              Choose a title
            </Form.Label>
            <Col xs={9}>
              <Form.Control
                type="text"
                required
                placeholder="Es: Cip & Ciop"
                onChange={(e) => setDashboardTitle(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label as="legend" column xs={3}>
              Choose a theme
            </Form.Label>
            <Col xs={9} className="d-flex">
              {combinedThemes.map((option) => (
                <Col key={option.color} xs={2}>
                  <Button
                    style={{
                      padding: "1px",
                      backgroundColor: "transparent",
                      border:
                        themeValue === option.color
                          ? "2px solid black"
                          : "none",
                    }}
                    id={`radio-${option.color}`}
                    type="button"
                    onClick={() => {
                      setThemeValue(option.color);
                    }}
                  >
                    {option.image}
                  </Button>
                </Col>
              ))}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formThemes">
            <Form.Label column sm={3}>
              Choose some activities you would share with your PlanMe Team:
            </Form.Label>
            <Col sm={2}>
              <Row>
                {activities.map((activity, index) => (
                  <Col key={index}>
                    <Button
                      key={activity.type}
                      className={`whiteBgButton m-1 ${
                        selectedActivities.includes(activity.type)
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        handleActivities(activity);
                      }}
                    >
                      {activity.type}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col
              sm={7}
              className="mt-3 text-center"
              style={{ height: "250px" }}
            >
              <p>Preview:</p>
              {selectedActivity && <div>{selectedActivity.tool}</div>}
            </Col>
          </Form.Group>

          {/*         <Form.Group controlId="formImg">
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={3} className="p-0">
                <Form.Label>Choose an image</Form.Label>
              </Col>
              <Col xs={9}>
                <Form.Group as={Col} controlId="avatar">
                  <Form.Control
                    type="file"
                    multiple={false}
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form.Group> */}

          <button type="submit" className="pinkBgButton" onClick={handleSubmit}>
            Submit
          </button>
        </Form>
      </Container>
    </>
  );
}
export default CreateDashboard;
