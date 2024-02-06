import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

const ToolsTitle = ({ id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [toolTitle, setToolTitle] = useState("");
  const dashboardId = localStorage.getItem("dashboardId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setToolTitle(responseData.toolTitle);
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

  const handleTitleChange = (e) => {
    setToolTitle(e.target.value);
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
          body: JSON.stringify({ toolTitle }),
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
          <Input value={toolTitle} onChange={handleTitleChange} />
          <Button variant="transparent" onClick={handleEdit}>
            Save
          </Button>
        </>
      ) : (
        <>
          <h5>{toolTitle}</h5>
          <PencilFill onClick={handleEdit} />
        </>
      )}
    </div>
  );
};

export default ToolsTitle;
