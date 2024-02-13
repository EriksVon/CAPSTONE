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

const Calendar = ({ colorStrong, themeMode, dashId, id }) => {
  const [modalState, setModalState] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [todayEvents, setTodayEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [isEditing, setIsEditing] = useState(false);

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
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashId}/${id}`
        );

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.content) {
            const content = JSON.parse(responseData.content);
            setEvents(content);
          }
        } else {
          console.error(
            "Error loading data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dashId, id]);

  useEffect(() => {
    const updateComponent = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashId}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ content: JSON.stringify(events) }),
          }
        );
        if (response.ok) {
          console.log("List updated");
        } else {
          console.error(
            "Error updating list:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error updating list:", error);
      }
    };
    updateComponent();
  }, [dashId, id, events]);

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
      id: Math.random().toString(36).substring(7),
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setModalState(!modalState);
  };

  const [editingIndex, setEditingIndex] = useState(null);

  const startEditing = (index) => {
    setEditingIndex(index);
    setIsEditing(true);
  };

  const modifyEvent = (index, updatedTitle, updatedTime) => {
    const updatedEvents = [...events];
    updatedEvents[index] = {
      ...updatedEvents[index],
      title: updatedTitle,
      time: updatedTime,
    };
    setEvents(updatedEvents);
    setModalState(!modalState);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleModal = (day, todaysEvents) => {
    setSelectedDay(day);
    setTodayEvents(todaysEvents);
    setModalState(!modalState);
    setIsEditing(false);
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
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          modifyEvent={modifyEvent}
          editingIndex={editingIndex}
          startEditing={startEditing}
        />
      )}
    </>
  );
};

export default Calendar;
