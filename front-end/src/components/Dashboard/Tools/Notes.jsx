import Quill from "quill";
import "quill/dist/quill.snow.css?sourceMap=false";
import React, { useEffect, useRef, useState } from "react";

const Notes = ({ colorStrong, id, dashboardId, updateComponentChanges }) => {
  const [content, setContent] = useState("");
  const quillRef = useRef(null);
  console.log("content", content);

  useEffect(() => {
    const quill = new Quill(`#editor-container-${id}`, {
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
          if (responseData.content) {
            const content = responseData.content;
            quillRef.current.clipboard.dangerouslyPasteHTML(content);
            setContent(content);
          }
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
        setContent(content);
        updateComponentChanges(content, id);
      });
    }
  }, [id, updateComponentChanges]);

  // Save notes to backend
  /*   useEffect(() => {
    const saveNotesToBackend = async () => {
      const content = content;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
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

    saveNotesToBackend();
  }, [dashboardId, id, content]); */

  return (
    <div className="toolsContainer p-0" style={{ borderColor: colorStrong }}>
      <div
        id={`editor-container-${id}`}
        className="border-0"
        style={{ height: 100 }}
      ></div>
    </div>
  );
};

export default Notes;
