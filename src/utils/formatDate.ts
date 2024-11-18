import dayjs from "dayjs";

export const formatDate = (
  timestamp?: number,
  short: boolean = false
): string =>
  timestamp
    ? dayjs
        .unix(timestamp)
        .format(`DD MMM[,] YYYY${!short ? " [-] HH:mm:ss" : ""}`)
    : "";
