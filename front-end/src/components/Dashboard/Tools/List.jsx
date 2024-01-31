import { useState } from "react";
import { Button } from "react-bootstrap";
import { DashLg, PlusLg } from "react-bootstrap-icons";

const List = ({ title, colorStrong }) => {
  const [listItem, setListItem] = useState("");
  const [list, setList] = useState([]);

  const handleAddItem = () => {
    if (listItem.trim() !== "") {
      setList((prevList) => [...prevList, listItem]);
      setListItem("");
    }
  };

  console.log(list);

  return (
    <div className="toolsWrapper">
      <h5>{title}</h5>
      <div className="toolsContainer" style={{ borderColor: colorStrong }}>
        <div className="d-flex mb-2">
          <input
            type="text"
            value={listItem}
            onChange={(e) => setListItem(e.target.value)}
            style={{
              borderRadius: "10px",
              fontSize: "small",
            }}
          />
          <Button variant="transparent" onClick={handleAddItem}>
            <PlusLg />
          </Button>
        </div>
        <div>
          {list.map((item, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between my-0 text-break"
            >
              {item}
              <Button
                className="p-0"
                variant="transparent"
                onClick={() => setList(list.filter((_, i) => i !== index))}
              >
                <DashLg />
              </Button>
            </div>
          ))}
        </div>
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

export default List;
