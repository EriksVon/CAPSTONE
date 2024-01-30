import Quill from "quill";
import "quill/dist/quill.snow.css?sourceMap=false";

import React, { useEffect } from "react";

const Notes = ({ title, description, colorStrong }) => {
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

    if (title || description) {
      quill.clipboard.dangerouslyPasteHTML(title || description);
    }
  }, [title, description]);

  return (
    <div className="toolsWrapper">
      <h5>{title}</h5>
      <div className="toolsContainer" style={{ borderColor: colorStrong }}>
        <div id="editor-container">{description}</div>
      </div>
      <button
        className="coralBgButton"
        style={{ backgroundColor: colorStrong }}
      >
        Whatever
      </button>
    </div>
  );
};

export default Notes;
