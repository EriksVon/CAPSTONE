import React from "react";
import { Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";

const SingleDay = ({ event, eventIndex, deleteEvent }) => {
  const updateEvent = (time, title, index) => {
    console.log(time, title, index);
  };

  return (
    <div className="d-flex justify-content-between">
      {
        <>
          {event.time} - {event.title}
          <div>
            <Button
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={() => {
                updateEvent(event.time, event.title, eventIndex);
              }}
            >
              <Pencil color="black" />
            </Button>
            <Button
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={() => deleteEvent(eventIndex)}
            >
              <Trash color="black" />
            </Button>
          </div>
        </>
      }
    </div>
  );
};

export default SingleDay;
