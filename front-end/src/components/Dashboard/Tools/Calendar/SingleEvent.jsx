import React from "react";

const SingleEvent = ({ event }) => {
  console.log("event: ", event);
  return (
    <div
      style={{
        backgroundColor: "#f75959",
        color: "white",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "5px",
        flex: "1",
      }}
    >
      {event.time ? event.time + " - " : ""} {event.title}
    </div>
  );
};

export default SingleEvent;
