import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import AddCard from "./AddCard";
import { ChakraProvider, theme, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Kanban = ({ colorStrong, dashboardId, id, onDelete }) => {
  const [todoItems, setTodoItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT_URL}/profile/me/${dashboardId}/${id}`
        );
        if (response.ok) {
          const responseData = await response.json();

          if (responseData.content) {
            const content = JSON.parse(responseData.content);
            setTodoItems(content.todo);
            setDoneItems(content.done);
            setInProgressItems(content.inProgress);
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

  const arrayLanes = [
    {
      title: "ToDo",
      items: todoItems,
      color: "red",
    },
    {
      title: "InProgress",
      items: inProgressItems,
      color: "yellow",
    },
    {
      title: "Done",
      items: doneItems,
      color: "green",
    },
  ];

  const addNewCard = (title) => {
    setTodoItems([...todoItems, { title }]);
  };

  const handleDeleteItem = ({ title, index, parent }) => {
    if (parent === "ToDo") {
      setTodoItems([
        ...todoItems.slice(0, index),
        ...todoItems.slice(index + 1),
      ]);
    } else if (parent === "Done") {
      setDoneItems([
        ...doneItems.slice(0, index),
        ...doneItems.slice(index + 1),
      ]);
    } else {
      setInProgressItems([
        ...inProgressItems.slice(0, index),
        ...inProgressItems.slice(index + 1),
      ]);
    }
    list.push(todoItems, doneItems, inProgressItems);
    setList(list);
  };

  useEffect(() => {
    const saveListToBackend = async () => {
      const content = {
        todo: todoItems,
        inProgress: inProgressItems,
        done: doneItems,
      };
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
  }, [id, todoItems, doneItems, inProgressItems, dashboardId]);

  return (
    <div className="calendarContainer" style={{ borderColor: colorStrong }}>
      <ChakraProvider theme={theme}>
        <DndContext
          collisionDetection={rectIntersection}
          onDragEnd={(e) => {
            const container = e.over?.id;
            const title = e.active.data.current?.title || "";
            const index = e.active.data.current?.index || 0;
            const parent = e.active.data.current?.parent || "ToDo";

            if (container === "ToDo") {
              setTodoItems([...todoItems, { title }]);
            } else if (container === "Done") {
              setDoneItems([...doneItems, { title }]);
            } else {
              setInProgressItems([...inProgressItems, { title }]);
            }
            if (parent === "ToDo") {
              setTodoItems([
                ...todoItems.slice(0, index),
                ...todoItems.slice(index + 1),
              ]);
            } else if (parent === "Done") {
              setDoneItems([
                ...doneItems.slice(0, index),
                ...doneItems.slice(index + 1),
              ]);
            } else {
              setInProgressItems([
                ...inProgressItems.slice(0, index),
                ...inProgressItems.slice(index + 1),
              ]);
            }
            list.push(todoItems, doneItems, inProgressItems);
            setList(list);
          }}
        >
          <Flex flexDirection="column">
            <AddCard addCard={addNewCard} />

            <Flex>
              {arrayLanes.map(({ title, items, color }, index) => (
                <KanbanLane
                  key={index}
                  title={title}
                  items={items}
                  color={color}
                  onDelete={handleDeleteItem}
                />
              ))}
            </Flex>
          </Flex>
        </DndContext>
      </ChakraProvider>
    </div>
  );
};

export default Kanban;
