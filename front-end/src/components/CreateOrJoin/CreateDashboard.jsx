import { Button, Col, Container, Form, Row } from "react-bootstrap";
import combinedThemes from "../../data/data";
import { useState } from "react";
import useJwt from "../../hooks/useJwt";
import { useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import { useStateContext } from "../Dashboard/Tools/context/ContextProvider";

function CreateDashboard() {
  const { userId, token } = useJwt();
  const { userData } = useUserData(userId, token);
  const { getThemeFromLocalStorage } = useStateContext();

  const navigate = useNavigate();

  const [themeValue, setThemeValue] = useState("");

  const [emailList, setEmailList] = useState([""]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [dashboardTitle, setDashboardTitle] = useState("");
  const [avatar, setAvatar] = useState("");

  const activities = [
    "Money",
    "Shopping",
    "Calendar",
    "Notes",
    "Photos",
    "Recipes",
    "Contacts",
    "Music",
  ];

  const dashboard = {
    emails: emailList,
    title: dashboardTitle,
    theme: themeValue,
    activities: selectedActivities,
    avatar: avatar,
    partecipants: [userId],
    dashboardToken: Math.random().toString(36).substr(2, 9),
  };

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
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(
        selectedActivities.filter((item) => item !== activity)
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData && userData.dashboards.length === 0) {
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
          localStorage.setItem("themeMode", mode);
          navigate("/wip");
          getThemeFromLocalStorage();
        } else {
          console.error(
            "Errore durante la creazione della dashboard:",
            response.status,
            response.statusText
          );
        }
      } else {
        alert("Hai già una dashboard");
      }
    } catch (error) {
      console.error("Errore durante la creazione della dashboard:", error);
    }
  };

  return (
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
                      themeValue === option.color ? "2px solid black" : "none",
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

        <Form.Group controlId="formThemes">
          <Row>
            <Form.Label column xs={3}>
              Choose some activities you would share with your PlanMe Team:
            </Form.Label>
            <Col xs={9}>
              <Row className="d-flex justify-content-start gap-2 pt-3 ms-1">
                {activities.map((activity, index) => (
                  <Col
                    key={index}
                    as={Button}
                    className={`whiteBgButton col-auto ${
                      selectedActivities.includes(activity) ? "active" : ""
                    }`}
                    onClick={() => handleActivities(activity)}
                  >
                    {activity}
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formImg">
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
        </Form.Group>

        <button type="submit" className="pinkBgButton" onClick={handleSubmit}>
          Submit
        </button>
      </Form>
    </Container>
  );
}
export default CreateDashboard;
