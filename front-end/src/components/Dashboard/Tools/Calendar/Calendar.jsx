import React, { useEffect, useState } from "react";
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
import AddEvent from "./AddEvent";
import NavigationControls from "./NavigationControls";
import SingleDay from "./SingleDay";

const Calendar = ({
  colorStrong,
  themeMode,
  id,
  dashboardId,
  updateComponentChanges,
}) => {
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
    updateComponentChanges(events, id);
  }, [id, events, updateComponentChanges]);

  /*   useEffect(() => {
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
  }, [id, events, dashboardId]); */

  const deleteEvent = (index) => {
    const eventToDelete = todayEvents[index];
    const updatedTodayEvents = todayEvents.filter(
      (event) => event.id !== eventToDelete.id
    );
    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
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
      id: Math.random().toString(36).substr(2, 9),
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

  const eventsByDate = events.reduce((acc, event) => {
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

  return (
    <>
      <NavigationControls
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
        currentDate={currentDate}
      />

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
        {daysInMonth.map((day, dayIndex) => (
          <SingleDay
            key={dayIndex}
            day={day}
            colorStrong={colorStrong}
            today={isToday(day)}
            handleModal={handleModal}
            eventsByDate={eventsByDate}
            isSmallScreen={isSmallScreen}
            weekDays={weekDays}
          />
        ))}
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
