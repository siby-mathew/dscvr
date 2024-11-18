import { Box } from "@chakra-ui/react";
import React from "react";
import { usePositions } from "../../hooks/usePositions";

export const Positions: React.FC = () => {
  const data = usePositions();
  return (
    <Box>
      Positions
      <code>{JSON.stringify(data, null, 2)}</code>
    </Box>
  );
};
