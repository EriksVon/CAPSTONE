import React from "react";
import Calendar from "../Tools/Calendar/Calendar";
import Money from "../Tools/Money";
import List from "../Tools/List";
import Notes from "../Tools/Notes";
import Kanban from "../Tools/Kanban/Kanban";
import ToolsTitle from "./TooslTitle";

const ToolsList = ({ activities, colorStrong, themeMode, dashId }) => {
  const activityComponents = {
    Calendar: Calendar,
    Money: Money,
    List: List,
    Notes: Notes,
    Kanban: Kanban,
  };

  return (
    <div className="d-flex gap-2">
      {activities.map((activity) => {
        const Tool = activityComponents[activity.type];

        if (!Tool) {
          return null;
        }
        return (
          <div
            key={activity._id}
            className={
              activity.type === "Kanban" || activity.type === "Calendar"
                ? "bigToolsWrapper"
                : "toolsWrapper"
            }
            style={{
              backgroundColor: colorStrong,
            }}
          >
            <ToolsTitle
              id={activity._id}
              colorStrong={colorStrong}
              dashId={dashId}
            />
            <Tool
              id={activity._id}
              colorStrong={colorStrong}
              dashId={dashId}
              themeMode={themeMode}
              {...activity}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ToolsList;
