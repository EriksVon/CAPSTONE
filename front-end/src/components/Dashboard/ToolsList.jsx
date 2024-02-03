import React from "react";
import Calendar from "./Tools/Calendar/Calendar";
import Money from "./Tools/Money";
import List from "./Tools/List";
import Notes from "./Tools/Notes";
import Kanban from "./Tools/Kanban/Kanban";
import Photos from "./Tools/Photos";

const ToolsList = ({ activities, colorStrong }) => {
  const activityComponents = {
    Calendar: <Calendar colorStrong={colorStrong} title={"My calendar"} />,
    Money: <Money colorStrong={colorStrong} title={"Counts"} />,
    List: (
      <List colorStrong={colorStrong} title={"My list"} description={"prova"} />
    ),
    Notes: (
      <Notes
        colorStrong={colorStrong}
        title={"My notes"}
        description={"prova"}
      />
    ),
    Kanban: <Kanban colorStrong={colorStrong} title={"My kanban"} />,
    Photos: <Photos colorStrong={colorStrong} title={"My photos"} />,
  };

  return (
    <div className="dashboardContainer">
      {activities.map((activity, i) => {
        const component = activityComponents[activity.type];
        return (
          component && <React.Fragment key={i}>{component}</React.Fragment>
        );
      })}
    </div>
  );
};

export default ToolsList;
