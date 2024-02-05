import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowsMove, PencilFill } from "react-bootstrap-icons";
import Draggable from "react-draggable";

const Kanban = ({ colorStrong, id }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };
  console.log(position);
  const boxStyle = {
    maxWidth: "200px",
    border: "3px solid",
    borderRadius: "5px",
    borderColor: colorStrong,
    margin: "auto",
    userSelect: "none",
    left: position.x,
    top: position.y,
  };

  return (
    <div className="calendarContainer" style={{ borderColor: colorStrong }}>
      <Container>
        <Row>
          <Col xs={4}>To do</Col>
          <Col xs={4}>Work in progress</Col>
          <Col xs={4}>Done</Col>
        </Row>
      </Container>
      <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
        <div className="d-flex align-items-center" style={boxStyle}>
          <h5 className="me-auto mb-0"> Wash the car</h5>
          <PencilFill className="me-2" />
          <ArrowsMove id="handle" />
        </div>
      </Draggable>
      <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
        <div className="d-flex align-items-center" style={boxStyle}>
          <h5 className="me-auto mb-0">Plan the day</h5>
          <PencilFill className="me-2" />
          <ArrowsMove id="handle" />
        </div>
      </Draggable>
      <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
        <div className="d-flex align-items-center" style={boxStyle}>
          <h5 className="me-auto mb-0">Read a book</h5>
          <PencilFill className="me-2" />
          <ArrowsMove id="handle" />
        </div>
      </Draggable>
    </div>
  );
};
export default Kanban;
