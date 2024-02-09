import React from "react";
import { getDay, format } from "date-fns";
import SingleEvent from "./SingleEvent";

const SingleDay = ({
  day,
  colorStrong,
  today,
  handleModal,
  eventsByDate,
  isSmallScreen,
  weekDays,
  deleteEvent,
}) => {
  const dateKey = format(day, "yyyy-MM-dd");
  const todaysEvents = eventsByDate[dateKey] || [];

  return (
    <div
      className="p-2 bg-white"
      style={{
        border: `2px solid ${colorStrong}`,
        color: today ? "black" : `${colorStrong}`,
      }}
      onClick={() => handleModal(day, todaysEvents)}
    >
      {isSmallScreen && <div>{weekDays[getDay(day)]}</div>}
      <strong>{format(day, "d")}</strong>
      {todaysEvents.map((event, index) => (
        <SingleEvent
          key={`event-${index}`}
          event={event}
          deleteEvent={(index) => deleteEvent(index)}
          style={{
            backgroundColor: "#f75959",
            color: "white",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "5px",
          }}
        />
      ))}
    </div>
  );
};

export default SingleDay;
