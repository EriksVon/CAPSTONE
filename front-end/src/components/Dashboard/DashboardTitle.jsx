import React from "react";
import { Button } from "react-bootstrap";
import { GearFill } from "react-bootstrap-icons";

const DashboardTitle = ({ title, colorStrong, handleSettings }) => {
  return (
    <div className="d-flex align-items-center justify-content-between dashTitle mb-2">
      <h1 className="mx-auto mb-0 mt-1" style={{ color: colorStrong }}>
        {title}
      </h1>
      <Button
        onClick={handleSettings}
        style={{ backgroundColor: "white", border: "none" }}
      >
        <GearFill fill={colorStrong} />
      </Button>
    </div>
  );
};

export default DashboardTitle;
