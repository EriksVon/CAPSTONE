import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Trash3Fill } from "react-bootstrap-icons";

const KanbanCard = ({ title, index, parent, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: `card-${title}`,
      data: {
        title,
        index,
        parent,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteItem = () => {
    onDelete({ title, index, parent });
  };

  return (
    <Flex alignItems="center" gap="2">
      <Flex
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        bg="white"
        p={2}
        mt={1}
        borderRadius="md"
        boxShadow="md"
        alignItems="center"
        justifyContent="center"
        cursor="grab"
        width="90%"
      >
        <Text style={{ overflow: "hidden" }}>{title}</Text>
      </Flex>
      <Trash3Fill onClick={deleteItem} />
    </Flex>
  );
};

export default KanbanCard;
