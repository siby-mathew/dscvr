export const PROGRAM_ID = import.meta.env.VITE_PROGRAM_ID;
export const RPC_ENDPOINT = import.meta.env.VITE_RPC;
export const DEFAULT_TOKEN_DECIMAL = 6;
export const NATIVE_TOKEN_ADDRESS =
  "so11111111111111111111111111111111111111112";
export const NATIVE_TOKEN_DECIMAL = 9;

const interval = 6 * 60 * 1000;
const j = new Date("10/18/2014 00:00:00");
const k = new Date("10/18/2014 00:22:00");
const between = new Date(
  k.getTime() - ((k.getTime() - j.getTime()) % interval)
);
console.log(between);
