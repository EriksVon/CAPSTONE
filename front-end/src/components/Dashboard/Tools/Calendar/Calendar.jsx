import React, { useMemo, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSunday,
  isToday,
  startOfMonth,
  subMonths,
  addMonths,
} from "date-fns";
import { Col, Container, Row } from "react-bootstrap";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import tinycolor from "tinycolor2";
import AddEvent from "./AddEvent";

const Calendar = ({ colorStrong, id }) => {
  const [modalState, setModalState] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [todayEvents, setTodayEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      title: "All Day Event very long title",
      start: "2024-01-01",
      end: "2024-01-03",
      time: "10:00",
    },
    {
      title: "Long Event",
      start: "2024-01-07",
      end: "2024-01-10",
      time: "10:00",
    },
    {
      title: "Meeting",
      start: "2024-01-31",
      time: "10:30",
    },
  ]);

  const deleteEvent = (index) => {
    const eventToDelete = todayEvents[index];
    const updatedTodayEvents = todayEvents.filter(
      (event) => event.start !== eventToDelete.start
    );
    const updatedEvents = events.filter(
      (event) => event.start !== eventToDelete.start
    );
    setTodayEvents(updatedTodayEvents);
    setEvents(updatedEvents);
  };

  const addEvent = (e) => {
    const timeInput = document.querySelector("#time").value;
    const titleInput = document.querySelector("#title").value;
    const newEvent = {
      title: titleInput,
      time: timeInput,
      start: format(selectedDay, "yyyy-MM-dd"),
      // end: format(selectedDay, "yyyy-MM-dd"),
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setModalState(!modalState);
  };

  const handleModal = (day, todaysEvents) => {
    setSelectedDay(day);
    setTodayEvents(todaysEvents);
    setModalState(!modalState);
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const colorStronger = tinycolor(colorStrong).darken(10).toString();

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, event) => {
      const startDate = new Date(event.start);
      if (!isNaN(startDate.getTime())) {
        const dateKey = format(startDate, "yyyy-MM-dd");
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(event);
      }
      return acc;
    }, {});
  }, [events]);

  return (
    <div className="calendarContainer" style={{ borderColor: colorStrong }}>
      <h5 className="d-flex align-items-center">
        <Container>
          <Row>
            <Col xs={2}>
              <CaretLeftFill onClick={goToPreviousMonth} />{" "}
            </Col>
            <Col xs={8}> {format(currentDate, "MMMM yyyy")} </Col>
            <Col xs={2}>
              <CaretRightFill onClick={goToNextMonth} />
            </Col>
          </Row>
        </Container>
      </h5>
      <Container>
        <Row>
          {daysInMonth.map((day, i) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const todaysEvents = eventsByDate[dateKey] || [];
            const sundays = isSunday(day);
            const today = isToday(day);

            return (
              <Col
                xs={12}
                md={3}
                key={i}
                className=" p-2 text-center"
                style={{
                  backgroundColor: sundays ? colorStrong : "transparent",
                  border: today
                    ? `3px solid ${colorStronger}`
                    : "1px solid lightgrey",
                }}
                onClick={() => handleModal(day, todaysEvents)}
              >
                {format(day, "d")}
                {todaysEvents.map((event, index) => (
                  <div
                    key={`event-${index}`}
                    style={{
                      fontSize: "small",
                      backgroundColor: colorStronger,
                      borderRadius: "10px",
                      margin: "5px",
                    }}
                  >
                    {event.time ? event.time + " - " : ""} {event.title}
                  </div>
                ))}
              </Col>
            );
          })}
        </Row>
      </Container>

      {selectedDay && todayEvents && (
        <AddEvent
          selectedDay={selectedDay}
          setModalState={setModalState}
          colorStrong={colorStrong}
          format={format}
          modalState={modalState}
          todayEvents={todayEvents}
          handleModal={handleModal}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
          colorStronger={colorStronger}
        />
      )}
    </div>
  );
};

export default Calendar;
