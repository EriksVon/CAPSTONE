import Quill from "quill";
import "quill/dist/quill.snow.css?sourceMap=false";
import React, { useEffect, useRef, useState } from "react";
import { PencilFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const Notes = ({ colorStrong, id }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dashboardId = localStorage.getItem("dashboardId");
  const quillRef = useRef(null);

  useEffect(() => {
    const quill = new Quill("#editor-container", {
      modules: {
        toolbar: [
          ["bold", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          /*   ["image"], */
        ],
      },
      placeholder: "Write here",
      theme: "snow",
    });

    quillRef.current = quill;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`
        );

        if (response.ok) {
          const responseData = await response.json();
          const content = responseData.content || "";
          const loadedTitle = responseData.title || "My Notes"; // Use a default title if not present
          quillRef.current.clipboard.dangerouslyPasteHTML(content);
          setDescription(content);
          setTitle(loadedTitle);
        } else {
          console.error(
            "Error loading data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, [dashboardId, id]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on("text-change", () => {
        const content = quillRef.current.root.innerHTML;
        setDescription(content);
      });
    }
  }, []);

  useEffect(() => {
    const saveToBackend = async () => {
      const content = {
        title: title,
        content: description,
      };
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(content),
          }
        );

        if (response.ok) {
          await response.json();
        } else {
          console.error(
            "Error saving data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    saveToBackend();
  }, [dashboardId, id, description, title]);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  console.log(description, title);
  return (
    <div className="toolsWrapper">
      <div className="d-flex align-items-center justify-content-around">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              style={{ borderRadius: "10px" }}
            />
            <Button variant="transparent" onClick={handleSaveClick}>
              Save
            </Button>
          </>
        ) : (
          <>
            <h5>{title}</h5>
            <PencilFill onClick={handleEditClick} />
          </>
        )}
      </div>
      <div className="toolsContainer p-0" style={{ borderColor: colorStrong }}>
        <div
          id="editor-container"
          className="border-0"
          style={{ height: 100 }}
        ></div>
      </div>
      <button
        className="coralBgButton"
        style={{ backgroundColor: colorStrong }}
      >
        Delete
      </button>
    </div>
  );
};

export default Notes;
