import { ReactComponent as Yellow } from "../styles/images/yellow.svg";
import { ReactComponent as Red } from "../styles/images/red.svg";
import { ReactComponent as Blue } from "../styles/images/blue.svg";
import { ReactComponent as Green } from "../styles/images/green.svg";
import { ReactComponent as Orange } from "../styles/images/orange.svg";

const combinedThemes = [
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

export default combinedThemes;
