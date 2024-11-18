type ShrinkTextProps = {
  ellipsis?: string;
  maxLength?: number;
  string: string;
};
export const shrinkText = ({
  ellipsis = "...",
  maxLength = 10,
  string,
}: ShrinkTextProps) => {
  if (string.length <= maxLength) {
    return string;
  }
  const size = Math.floor(maxLength / 2);
  return [string.slice(0, size), ellipsis, string.slice(-size)].join("");
};
