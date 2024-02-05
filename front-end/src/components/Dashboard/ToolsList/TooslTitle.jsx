import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

const ToolsTitle = ({ id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const dashboardId = localStorage.getItem("dashboardId");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      fetch(
        `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      )
        .then((response) => {
          if (response.ok) {
            console.log("Title updated");
          } else {
            console.error(
              "Error updating title:",
              response.status,
              response.statusText
            );
          }
        })
        .catch((error) => {
          console.error("Error updating title:", error);
        });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-around">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            style={{ borderRadius: "10px" }}
          />
          <Button variant="transparent" onClick={handleEdit}>
            Save
          </Button>
        </>
      ) : (
        <>
          <h5>{title}</h5>
          <PencilFill onClick={handleEdit} />
        </>
      )}
    </div>
  );
};

export default ToolsTitle;
