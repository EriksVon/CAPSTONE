import React, { useState } from "react";
import { ArrowsMove } from "react-bootstrap-icons";
import Draggable from "react-draggable";

const Notes = ({ title, description }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };
  console.log(position);

  return (
    <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
      <div className="box d-flex flex-column mt-3">
        <div className="d-flex justify-content-center">
          <h5> {title}</h5>
          <ArrowsMove id="handle" className="ms-auto" />
        </div>
        <textarea name="ciao" placeholder="Write here"></textarea>
      </div>
    </Draggable>
  );
};

export default Notes;
