import { ReactComponent as Yellow } from "../styles/images/yellow.svg";
import { ReactComponent as Red } from "../styles/images/red.svg";
import { ReactComponent as Blue } from "../styles/images/blue.svg";
import { ReactComponent as Green } from "../styles/images/green.svg";
import { ReactComponent as Orange } from "../styles/images/orange.svg";
import ListImg from "../styles/images/toolsExamples/List.png";
import NoteImg from "../styles/images/toolsExamples/Notes.png";
import CalendarImg from "../styles/images/toolsExamples/Calendar.png";

export const combinedThemes = [
  {
    id: "orange",
    color: "#fce1d2",
    //color: "#f79453",
    image: <Orange />,
  },
  {
    id: "blue",
    color: "#99dff4",
    // color: '#2d95b4',
    image: <Blue />,
  },
  {
    id: "red",
    color: "#ffb7b7",
    // color: '#d13e3e',
    image: <Red />,
  },
  {
    id: "yellow",
    color: "#ffdc7c",
    // color: '#e29e07',
    image: <Yellow />,
  },
  {
    id: "green",
    color: "#6ed1a7",
    // color: '#267653',
    image: <Green />,
  },
  /*   {
    id: "default-theme",
    color: "#ffe0d3",
    // color: '#f75959',
    image: null, // Puoi specificare l'immagine di default o lasciare null se non è necessaria
  }, */
];

export const activities = [
  {
    type: "List",
    description: "",
    tool:
      typeof ListImg === "string" ? (
        <img
          src={ListImg}
          alt="holder.js/100px250"
          style={{ height: "200px" }}
        />
      ) : (
        ""
      ),
  },
  {
    type: "Calendar",
    description: "",
    tool:
      typeof CalendarImg === "string" ? (
        <img
          src={CalendarImg}
          alt="holder.js/100px250"
          style={{ height: "200px" }}
        />
      ) : (
        ""
      ),
  },
  {
    type: "Notes",
    description: "",
    tool:
      typeof NoteImg === "string" ? (
        <img
          src={NoteImg}
          alt="holder.js/100px250"
          style={{ height: "200px" }}
        />
      ) : (
        ""
      ),
  },
  {
    type: "Photos",
    description: "",
    tool: <div>Work in porgress, please be patient</div>,
  },
  {
    type: "Money",
    description: "",
    tool: <div>Work in porgress, please be patient</div>,
  },
];
