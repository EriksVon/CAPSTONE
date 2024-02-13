import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DashLg, PlusLg } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const List = ({ dashId, id, token, colorStrong }) => {
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
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashId}/${id}`
        );

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.content) {
            const content = JSON.parse(responseData.content);
            setList(content);
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
    const updateComponent = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashId}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ content: JSON.stringify(list) }),
          }
        );
        if (response.ok) {
          console.log("List updated");
        } else {
          console.error(
            "Error updating list:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error updating list:", error);
      }
    };
    updateComponent();
  }, [dashId, id, token, list]);

  return (
    <div className="toolsContainer" style={{ borderColor: colorStrong }}>
      <div className="d-flex justify-content-between mb-2">
        <Input
          value={listItem}
          onChange={(e) => setListItem(e.target.value)}
          size="sm"
          className="flex-grow-1"
          mx="2"
          borderRadius="md"
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
