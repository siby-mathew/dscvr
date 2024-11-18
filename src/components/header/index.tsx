import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { GoChevronDown } from "react-icons/go";
import { useWalletConnection } from "../../hooks/useWallet";
import { useWallet } from "@solana/wallet-adapter-react";
import { shrinkText } from "../../utils/shrinkText";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "@tanstack/react-router";
import { useMintAddress } from "../../hooks/useMintAddress";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>();
  const mintAddress = useMintAddress();
  const navigate = useNavigate();
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mintAddress !== query) {
      navigate({
        to: `/lock/$mint`,
        params: {
          mint: query ?? "",
        },
      });
      setQuery("");
    }
  };
  return (
    <form onSubmit={onSubmitHandler} style={{ position: "relative" }}>
      <Box
        position={"absolute"}
        right={1}
        top={1}
        bottom={1}
        width={"33px"}
        left="auto"
        display={"flex"}
        cursor={"pointer"}
        zIndex={999}
        bg="rgba(0,0,0,.5)"
        borderEndRadius={"5px"}
        opacity={query ? 1 : 0}
        transition={"all ease .3s"}
        as="button"
        type="submit"
      ></Box>
      <InputGroup>
        <InputRightElement pointerEvents="none">
          <IoSearch cursor={"pointer"} />
        </InputRightElement>
        <Input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Mint Address"
          spellCheck="false"
        />
      </InputGroup>
    </form>
  );
};
export const Header: React.FC = () => {
  const {
    isConnected,
    connecting,
    disconnect,
    conectWallet,
    connectors,
    connect,
    wallet,
  } = useWalletConnection();
  const { publicKey } = useWallet();

  return (
    <Box as="header" py={2} mb={3}>
      <Flex justifyContent={"space-between"}>
        <Flex>
          <Text fontSize={20} as="h1" fontWeight={"bold"}>
            Jupiter Lock
          </Text>
        </Flex>
        <Flex>
          <Box minW={300}>
            <Search />
          </Box>
        </Flex>
        <Flex>
          <Menu>
            {wallet?.adapter.name && (
              <Button onClick={() => connect()}>
                {`Connect ${wallet?.adapter.name}`}
              </Button>
            )}
            <MenuButton as={Button} rightIcon={<GoChevronDown />}>
              {isConnected && publicKey
                ? shrinkText({ string: publicKey.toString() })
                : "Connect Wallet"}
              {connecting && <Spinner boxSize={4} ml={2} />}
            </MenuButton>
            <MenuList>
              {!isConnected &&
                connectors.map((connector) => {
                  return (
                    <MenuItem
                      key={connector.adapter.name}
                      onClick={() => {
                        conectWallet(connector.adapter.name);
                      }}
                    >
                      {connector.adapter.name}
                    </MenuItem>
                  );
                })}
              {isConnected && (
                <MenuItem onClick={disconnect}>Disconnect</MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};
