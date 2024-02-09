import React from "react";
import Calendar from "../Tools/Calendar/Calendar";
import Money from "../Tools/Money";
import List from "../Tools/List";
import Notes from "../Tools/Notes";
import Kanban from "../Tools/Kanban/Kanban";
import ToolsTitle from "./TooslTitle";

const ToolsList = ({
  activities,
  colorStrong,
  themeMode,
  setComponentChanges,
  componentChanges,
  updateComponentChanges,
}) => {
  const dashboardId = localStorage.getItem("dashboardId");
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
              dashboardId={dashboardId}
              componentChanges={componentChanges}
              setComponentChanges={setComponentChanges}
            />
            <Tool
              id={activity._id}
              colorStrong={colorStrong}
              dashboardId={dashboardId}
              themeMode={themeMode}
              {...activity}
              componentChanges={componentChanges}
              setComponentChanges={setComponentChanges}
              updateComponentChanges={updateComponentChanges}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ToolsList;
