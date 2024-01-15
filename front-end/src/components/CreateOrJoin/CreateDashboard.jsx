import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ReactComponent as Yellow } from "../../styles/images/yellow.svg";
import { ReactComponent as Red } from "../../styles/images/red.svg";
import { ReactComponent as Blue } from "../../styles/images/blue.svg";
import { ReactComponent as Green } from "../../styles/images/green.svg";
import { ReactComponent as Orange } from "../../styles/images/orange.svg";
import { useState } from "react";

function CreateDashboard() {
  const [radioValue, setRadioValue] = useState("");

  const themeOptions = [
    { id: "yellow", label: <Yellow /> },
    { id: "red", label: <Red /> },
    { id: "blue", label: <Blue /> },
    { id: "green", label: <Green /> },
    { id: "orange", label: <Orange /> },
  ];

  const [emailList, setEmailList] = useState([""]);

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

  const [selectedActivities, setSelectedActivities] = useState([]);

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

  const handleActivities = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(
        selectedActivities.filter((item) => item !== activity)
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
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
            <Form.Control type="text" placeholder="Es: Cip & Ciop" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column xs={3}>
            Choose a theme
          </Form.Label>
          <Col xs={9} className="d-flex">
            {themeOptions.map((option) => (
              <Col key={option.id} xs={2}>
                <Button
                  style={{
                    backgroundColor: "transparent",
                    border:
                      radioValue === option.id ? "2px solid black" : "none",
                  }}
                  id={`radio-${option.id}`}
                  type="button"
                  onClick={() => {
                    setRadioValue(option.id);
                  }}
                >
                  {option.label}
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
                <Form.Control type="file" />
              </Col>
            </Row>
          </Container>
        </Form.Group>
        <button type="submit" className="pinkBgButton">
          Submit
        </button>
      </Form>
    </Container>
  );
}
export default CreateDashboard;
