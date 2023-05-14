export function timestampFromSnowflake(snowflake: string) {
  return Number((BigInt(snowflake) >> BigInt("22")) + BigInt("1420070400000"));
}

export const intToHex = (int: number) => int.toString(16);
export const hexToInt = (hex: string) => parseInt(hex, 16);
