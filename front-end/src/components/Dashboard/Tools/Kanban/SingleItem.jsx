/* import React from "react";
import { ArrowsMove, PencilFill } from "react-bootstrap-icons";
import Draggable from "react-draggable";
import { useState } from "react";

const SingleItem = ({ colorStrong }) => {
  const [position, setPosition] = useState({ x: -100, y: 100 });
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
    <Draggable handle="#handle" onDrag={(data) => trackPos(data)}>
      <div className="d-flex align-items-center" style={boxStyle}>
        <h5 className="me-auto mb-0"> Wash the car</h5>
        <PencilFill className="me-2" />
        <ArrowsMove id="handle" />
      </div>
    </Draggable>
  );
};

export default SingleItem; */
