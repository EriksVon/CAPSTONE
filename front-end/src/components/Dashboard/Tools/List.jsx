import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DashLg, PlusLg } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const List = ({ dashboardId, colorStrong, id, updateComponentChanges }) => {
  const [listItem, setListItem] = useState("");
  const [list, setList] = useState([]);

  const handleAddItem = () => {
    setList((prevList) => [...prevList, listItem]);
    setListItem("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`
        );
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.content) {
            setList(
              responseData.content ? JSON.parse(responseData.content) : []
            );
          }
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

  useEffect(() => {
    updateComponentChanges(list, id);
  }, [id, list, updateComponentChanges]);

  /*   useEffect(() => {
    const saveListToBackend = async () => {
      const content = list;
      try {
        await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: JSON.stringify(content) }),
          }
        );
      } catch (error) {
        console.error("Error saving list data:", error);
      }
    };

    saveListToBackend();
  }, [id, list, dashboardId]); */

  return (
    <div className="toolsContainer" style={{ borderColor: colorStrong }}>
      <div className="d-flex justify-content-between mb-2">
        <Input
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
          size="sm"
          className="flex-grow-1"
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
  );
};

export default List;
