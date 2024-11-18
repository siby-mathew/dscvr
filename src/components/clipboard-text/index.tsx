import React from "react";
import { Box, Flex, useClipboard } from "@chakra-ui/react";
import { shrinkText } from "../../utils/shrinkText";
import { BiSolidCopy } from "react-icons/bi";
import { TbCopyCheckFilled } from "react-icons/tb";
export const ClipboardText: React.FC<{
  children: string;
  maxLength?: number;
}> = ({ children, maxLength }) => {
  const { onCopy, hasCopied } = useClipboard(children);
  return (
    <Box
      display={"inline-flex"}
      justifyContent={"center"}
      onClick={onCopy}
      alignItems={"center"}
      flexDirection={"row"}
      cursor={"pointer"}
      _hover={{ opacity: 0.5 }}
    >
      <Flex mr={1}>{hasCopied ? <TbCopyCheckFilled /> : <BiSolidCopy />}</Flex>
      {shrinkText({ string: children, maxLength: maxLength })}
    </Box>
  );
};
