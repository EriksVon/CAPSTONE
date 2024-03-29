import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import AddCard from "./AddCard";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const Kanban = ({ colorStrong, dashId, id }) => {
  const [todoItems, setTodoItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);

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
            setTodoItems(content.todo || []);
            setDoneItems(content.done || []);
            setInProgressItems(content.inProgress || []);
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
    const intervalId = setInterval(fetchData, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [id, dashId]);

  const prevTodoItems = useRef(todoItems);
  const prevDoneItems = useRef(doneItems);
  const prevInProgressItems = useRef(inProgressItems);

  useEffect(() => {
    const arraysAreEqual = (arr1, arr2) =>
      JSON.stringify(arr1) === JSON.stringify(arr2);

    if (
      !arraysAreEqual(todoItems, prevTodoItems.current) ||
      !arraysAreEqual(doneItems, prevDoneItems.current) ||
      !arraysAreEqual(inProgressItems, prevInProgressItems.current)
    ) {
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
              body: JSON.stringify(
                {
                  content: JSON.stringify({
                    todo: [...todoItems],
                    done: [...doneItems],
                    inProgress: [...inProgressItems],
                  }),
                },
                id
              ),
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

      prevTodoItems.current = todoItems;
      prevDoneItems.current = doneItems;
      prevInProgressItems.current = inProgressItems;
    }
  }, [id, todoItems, doneItems, inProgressItems, dashId]);

  const handleDeleteItem = ({ index, parent }) => {
    if (parent === "ToDo") {
      setTodoItems((prevItems) => [
        ...prevItems.slice(0, index),
        ...prevItems.slice(index + 1),
      ]);
    } else if (parent === "Done") {
      setDoneItems((prevItems) => [
        ...prevItems.slice(0, index),
        ...prevItems.slice(index + 1),
      ]);
    } else {
      setInProgressItems((prevItems) => [
        ...prevItems.slice(0, index),
        ...prevItems.slice(index + 1),
      ]);
    }
  };

  return (
    <div
      style={{
        borderColor: colorStrong,
      }}
    >
      <ChakraProvider theme={theme}>
        <DndContext
          collisionDetection={rectIntersection}
          onDragEnd={(e) => {
            const container = e.over?.id;
            const title = e.active.data.current?.title || "";
            const index = e.active.data.current?.index || 0;
            const parent = e.active.data.current?.parent || "ToDo";

            if (parent === "ToDo") {
              setTodoItems((prevItems) => [
                ...prevItems.slice(0, index),
                ...prevItems.slice(index + 1),
              ]);
            } else if (parent === "Done") {
              setDoneItems((prevItems) => [
                ...prevItems.slice(0, index),
                ...prevItems.slice(index + 1),
              ]);
            } else {
              setInProgressItems((prevItems) => [
                ...prevItems.slice(0, index),
                ...prevItems.slice(index + 1),
              ]);
            }

            if (container === "ToDo") {
              setTodoItems((prevItems) => [...prevItems, { title }]);
            } else if (container === "Done") {
              setDoneItems((prevItems) => [...prevItems, { title }]);
            } else {
              setInProgressItems((prevItems) => [...prevItems, { title }]);
            }
          }}
        >
          <AddCard
            addCard={(title) =>
              setTodoItems((prevItems) => [...prevItems, { title }])
            }
          />

          <div className="kanbanContainer mt-2">
            <KanbanLane
              title="ToDo"
              items={todoItems}
              color="red"
              onDelete={handleDeleteItem}
            />
            <KanbanLane
              title="InProgress"
              items={inProgressItems}
              color="yellow"
              onDelete={handleDeleteItem}
            />
            <KanbanLane
              title="Done"
              items={doneItems}
              color="green"
              onDelete={handleDeleteItem}
            />
          </div>
        </DndContext>
      </ChakraProvider>
    </div>
  );
};

export default Kanban;
