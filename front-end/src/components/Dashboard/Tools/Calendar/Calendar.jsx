import React, { useEffect, useMemo, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isToday,
  startOfMonth,
  subMonths,
  addMonths,
  getDay,
} from "date-fns";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import AddEvent from "./AddEvent";
import { Flex } from "@chakra-ui/react";

const Calendar = ({ colorStrong, themeMode, id, dashboardId }) => {
  const [modalState, setModalState] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [todayEvents, setTodayEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [events, setEvents] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`
        );
        if (response.ok) {
          const responseData = await response.json();

          if (responseData.content) {
            const content = JSON.parse(responseData.content);
            setEvents(content);
          }
        } else {
          console.error(
            "Error loading list data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error loading list data:", error);
      }
    };
    fetchData();
  }, [id, dashboardId]);

  useEffect(() => {
    const saveListToBackend = async () => {
      const content = events;
      try {
        await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: JSON.stringify(content) }),
          }
        );
      } catch (error) {
        console.error("Error saving list data:", error);
      }
    };
    saveListToBackend();
  }, [id, events, dashboardId]);

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

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

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
    <>
      <Flex className="text-white fs-4 mb-5 justify-content-between">
        <div>
          <CaretLeftFill onClick={goToPreviousMonth} />
        </div>
        <div> {format(currentDate, "MMMM yyyy")} </div>
        <div>
          <CaretRightFill onClick={goToNextMonth} />
        </div>
      </Flex>

      <div className="calendarContainer">
        {weekDays.map((day, i) => (
          <strong
            key={day}
            className="text-center d-none d-md-inline"
            style={{
              backgroundColor: themeMode,
              color: colorStrong,
              border: `2px solid ${colorStrong}`,
            }}
          >
            {day}
          </strong>
        ))}
        {Array.from({ length: getDay(startOfMonth(currentDate)) }).map(
          (_, i) => (
            <div
              key={i}
              style={{
                border: `2px solid ${colorStrong}`,
                backgroundColor: "white",
              }}
            ></div>
          )
        )}
        {daysInMonth.map((day, dayIndex) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];
          const today = isToday(day);
          return (
            <div
              key={dayIndex}
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
                <div
                  key={`event-${index}`}
                  style={{
                    backgroundColor: "#f75959",
                    color: "white",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  {event.time ? event.time + " - " : ""} {event.title}
                </div>
              ))}
            </div>
          );
        })}
        {Array.from({ length: getDay(endOfMonth(currentDate)) }).map((_, i) => (
          <div
            key={i}
            style={{
              border: `2px solid ${colorStrong}`,
              backgroundColor: "white",
            }}
          ></div>
        ))}
      </div>

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
        />
      )}
    </>
  );
};

export default Calendar;
