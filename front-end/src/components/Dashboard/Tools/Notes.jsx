import Quill from "quill";
import "quill/dist/quill.snow.css?sourceMap=false";
import React, { useEffect, useRef, useState } from "react";

const Notes = ({ colorStrong, id, dashId }) => {
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    const quill = new Quill(`#editor-container-${id}`, {
      modules: {
        toolbar: [
          ["bold", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
      placeholder: "Write here",
      theme: "snow",
    });

    quillRef.current = quill;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashId}/${id}`
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
    const intervalId = setInterval(fetchData, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dashId, id]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on("text-change", () => {
        const content = quillRef.current.root.innerHTML;
        setContent(content);
      });
    }

    const saveNotesToBackend = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashId}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, [dashId, id, content]);

  return (
    <div className="toolsContainer p-0" style={{ borderColor: colorStrong }}>
      <div id={`editor-container-${id}`} className="border-0"></div>
    </div>
  );
};

export default Notes;
