import React from "react";

const ToolsDelete = ({ colorStrong, id }) => {
  const token = localStorage.getItem("token");
  const dashboardId = localStorage.getItem("dashboardId");
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
    <button
      className="coralBgButton"
      style={{ backgroundColor: colorStrong }}
      onClick={() => handleDelete(id)}
    >
      Delete
    </button>
  );
};

export default ToolsDelete;
