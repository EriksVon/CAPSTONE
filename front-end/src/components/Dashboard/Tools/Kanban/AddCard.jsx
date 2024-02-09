import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const AddCard = ({ addCard }) => {
  const [title, setTitle] = useState("");

  return (
    <Flex>
      <Input
        placeholder="Activity title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        bgColor={"white"}
        size="sm"
        me="2"
        mx="2"
        borderRadius="md"
      />

      <Button
        size="sm"
        onClick={() => {
          addCard(title);
          setTitle("");
        }}
      >
        Add
      </Button>
    </Flex>
  );
};

export default AddCard;
