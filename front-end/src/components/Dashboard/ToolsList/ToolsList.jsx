import React from "react";
import Calendar from "../Tools/Calendar/Calendar";
import Money from "../Tools/Money";
import List from "../Tools/List";
import Notes from "../Tools/Notes";
import Kanban from "../Tools/Kanban/Kanban";
import Photos from "../Tools/Photos";
import ToolsDelete from "./ToolsDelete";
import ToolsTitle from "./TooslTitle";

const ToolsList = ({ activities, colorStrong }) => {
  const dashboardId = localStorage.getItem("dashboardId");
  const activityComponents = {
    Calendar: Calendar,
    Money: Money,
    List: List,
    Notes: Notes,
    Kanban: Kanban,
    Photos: Photos,
  };

  console.log(activities);

  return (
    <div className="dashboardContainer">
      {activities.map((activity) => {
        const Tool = activityComponents[activity.type];
        if (!Tool) {
          return null;
        }
        return (
          <div
            key={activity._id}
            className={`${
              activity.type === "Calendar" || "Kanban"
                ? "calendarWrapper"
                : "toolsWrapper"
            }`}
          >
            <ToolsTitle
              id={activity._id}
              colorStrong={colorStrong}
              dashboardId={dashboardId}
            />
            <Tool
              id={activity._id}
              colorStrong={colorStrong}
              dashboardId={dashboardId}
              {...activity}
            />
            <ToolsDelete
              id={activity._id}
              colorStrong={colorStrong}
              dashboardId={dashboardId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ToolsList;
