import React from "react";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import { Flex } from "@chakra-ui/react";
import { format } from "date-fns";

const NavigationControls = ({
  goToPreviousMonth,
  goToNextMonth,
  currentDate,
}) => {
  return (
    <Flex className="text-white fs-4 mb-3 justify-content-between">
      <div>
        <CaretLeftFill onClick={goToPreviousMonth} />
      </div>
      <div>{format(currentDate, "MMMM yyyy")}</div>
      <div>
        <CaretRightFill onClick={goToNextMonth} />
      </div>
    </Flex>
  );
};

export default NavigationControls;
