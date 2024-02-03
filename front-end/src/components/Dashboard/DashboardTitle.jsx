import React from "react";
import { Button } from "react-bootstrap";
import { GearFill } from "react-bootstrap-icons";

const DashboardTitle = ({ title, handleShow, colorStrong }) => {
  return (
    <div className="d-flex align-items-center justify-content-between dashTitle mb-2">
      <h1 className="mx-auto mb-0 mt-1">{title}</h1>
      <Button
        onClick={handleShow}
        style={{ backgroundColor: "white", border: "none" }}
      >
        <GearFill fill={colorStrong} />
      </Button>
    </div>
  );
};

export default DashboardTitle;
