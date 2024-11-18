import React from "react";
import { AllFastPoolResponse } from "../..";
import { Card, Button, HStack, Flex, Spinner } from "@chakra-ui/react";
import { useClaim } from "../../hooks/useClaim";

import { BN } from "@project-serum/anchor";
import { ClipboardText } from "../clipboard-text";
import { formatDate } from "../../utils/formatDate";
import { formatNumber, NumberFormatType } from "../../utils/formatTime";
import { Token } from "../../utils/token";
// import { useWeb3React } from "../../hooks/useWeb3React";
import { StatusModal } from "../status-modal";
import dayjs from "dayjs";
export const LockedToken: React.FC<
  AllFastPoolResponse[0] & { bg?: string }
> = ({ account, bg }) => {
  const { onClaim, isLoading, message, txn, reset } = useClaim();
  const onClickHandler = () => {
    if (!isLoading) {
      onClaim(account);
    }
  };
  const endtime = account.vestingStartTime.add(account.frequency);

  const start = account.vestingStartTime;
  // const { publicKey } = useWeb3React();
  const isClaimed = new BN(account.totalClaimedAmount).gt(new BN(0));
  const isUnlocked = dayjs().isAfter(dayjs.unix(endtime));
  console.log(isUnlocked);
  // const isClaimable =
  //   isUnlocked &&
  //   !isClaimed &&
  //   publicKey?.toString() === account.creator.toString();

  return (
    <Card
      mb={6}
      p={3}
      bg={bg || `rgba(0,0,0,.2)`}
      fontSize={12}
      transition={"all ease .2s"}
      _hover={{ bg: "rgba(0,0,0,.4)" }}
    >
      <StatusModal
        isOpen={!isLoading && !!(message || txn)}
        onClose={reset}
        type={txn ? "SUCCESS" : "ERROR"}
        message={message}
        txn={txn}
      />
      <HStack justifyContent={"space-between"} mb={3}>
        <Flex direction={"column"}>
          <Flex fontWeight={"bold"}>Creator</Flex>
          <Flex color={"#999"}>
            <ClipboardText>{account.creator.toString()}</ClipboardText>
          </Flex>
        </Flex>
        <Flex direction={"column"}>
          <Flex fontWeight={"bold"}>Mint Address</Flex>
          <Flex color={"#999"}>
            <ClipboardText>{account.tokenMint.toString()}</ClipboardText>
          </Flex>
        </Flex>
        <Flex direction={"column"}>
          <Flex fontWeight={"bold"}>Recepient</Flex>
          <Flex color={"#999"}>
            <ClipboardText>{account.recipient.toString()}</ClipboardText>
          </Flex>
        </Flex>
        <Flex direction={"column"}>
          {isUnlocked && (
            <Button
              onClick={onClickHandler}
              display={"inline-flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {isClaimed ? "Claimed" : "Claim"}
              {isLoading && <Spinner ml={2} boxSize={3} />}
            </Button>
          )}
          {!isUnlocked ? "Locked" : ""}
        </Flex>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <Flex direction={"column"}>
          <Flex fontWeight={"bold"}>Vesting Period</Flex>
          <Flex color={"#999"}>
            {formatDate(start)} - {formatDate(endtime)}
          </Flex>
        </Flex>

        {isClaimed && (
          <Flex direction={"column"}>
            <Flex fontWeight={"bold"}>Claimed amount</Flex>
            <Flex color={"#999"} justifyContent={"flex-end"}>
              {formatNumber({
                input: Token.fromRawAmount(account.totalClaimedAmount, 6),
                type: NumberFormatType.TokenBalanceFormatter,
              })}
            </Flex>
          </Flex>
        )}
        {!isClaimed && (
          <Flex direction={"column"}>
            <Flex fontWeight={"bold"}>Claim Amount</Flex>
            <Flex color={"#999"} justifyContent={"flex-end"}>
              {formatNumber({
                input: Token.fromRawAmount(account.amountPerPeriod, 6),
                type: NumberFormatType.TokenBalanceFormatter,
              })}
            </Flex>
          </Flex>
        )}
      </HStack>
    </Card>
  );
};
