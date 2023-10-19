export const shortenAddress = (address: `0x${string}` | string) => {
  return address ? address?.slice(0, 5) + '...' + address?.slice(-4) : '_';
};