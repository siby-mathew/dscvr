import { useMatch } from "@tanstack/react-router";
type Mint = {
  mint?: string;
};
export const useMintAddress = (): string => {
  const match = useMatch({ from: "__root__" });

  return (match.params as Mint).mint ?? "";
};
