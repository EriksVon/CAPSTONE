import React, { useEffect, useState } from "react";
import { PencilFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const ToolsTitle = ({ id, dashboardId, colorStrong }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [toolTitle, setToolTitle] = useState("");
  const token = localStorage.getItem("token");

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
          Authorization: `Bearer ${token}`,
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tool?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          console.log("Tool successfully deleted!");
          window.location.reload();
        } else {
          console.error(
            "Error in the DELETE request:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error in the DELETE request:", error);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between mt-3 mx-1 text-white">
      <div></div>
      {isEditing ? (
        <div className="justify-content-center">
          <input
            value={toolTitle}
            className="rounded"
            onChange={handleTitleChange}
          />
          <Button onClick={handleEdit} variant="transparent">
            <PencilFill />
          </Button>
        </div>
      ) : (
        <h3 onClick={handleEdit}>{toolTitle}</h3>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="white"
        className="bi bi-x-circle"
        viewBox="0 0 16 16"
        onClick={() => handleDelete(id)}
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
    </div>
  );
};

export default ToolsTitle;
