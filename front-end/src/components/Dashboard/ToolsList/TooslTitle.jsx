import React, { useEffect, useState } from "react";
import { Pencil } from "react-bootstrap-icons";
import { Button, Form, InputGroup } from "react-bootstrap";

const ToolsTitle = ({ id, dashboardId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [toolTitle, setToolTitle] = useState("");
  const token = localStorage.getItem("token");
  const themeMode = localStorage.getItem("themeMode");

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
    <div className="d-flex justify-content-between text-white mb-3">
      <div className="ms-4"></div>
      {isEditing ? (
        <InputGroup className="mt-3">
          <Form.Control
            type="text"
            value={toolTitle}
            className="rounded"
            onChange={handleTitleChange}
          />
          <Button variant="transparent" onClick={handleEdit}>
            Save
          </Button>
        </InputGroup>
      ) : (
        <div className="mt-3 d-flex align-items-center" onClick={handleEdit}>
          <h3>{toolTitle}</h3>
          <Pencil className="ms-3" fill={themeMode} onClick={handleEdit} />
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
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
