import React from "react";
import Calendar from "./Tools/Calendar/Calendar";
import Money from "./Tools/Money";
import List from "./Tools/List";
import Notes from "./Tools/Notes";
import Kanban from "./Tools/Kanban/Kanban";
import Photos from "./Tools/Photos";

const ToolsList = ({ activities, colorStrong }) => {
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
        const id = activity._id;
        const propsWithId = { ...activity, id };
        return <Tool key={id} {...propsWithId} colorStrong={colorStrong} />;
      })}
    </div>
  );
};

export default ToolsList;
