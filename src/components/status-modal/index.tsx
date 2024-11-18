import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import React from "react";
import { useCanvasContext } from "../../provider/CanvasProvider";
type StatusModalProps = Pick<ModalProps, "isOpen" | "onClose"> & {
  type: "SUCCESS" | "ERROR";
  txn?: string;
  message?: string;
};
export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type,
  message = "",
  txn = "",
}) => {
  const canvasContext = useCanvasContext();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={300}>
        <ModalHeader>{type}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign={"center"} pb={3}>
            {message}
          </Box>
          {txn && (
            <Button
              onClick={() => {
                canvasContext.client?.openLink(
                  `https://explorer.solana.com/tx/${txn}?cluster=devnet`
                );
              }}
            >
              View Transaction
            </Button>
          )}
          {txn && (
            <Box>
              <Button
                as="a"
                href={`https://explorer.solana.com/tx/${txn}?cluster=devnet`}
                target="_blank"
                w="100%"
              >
                View Transaction
              </Button>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
