const getProfitClassName = ({ profit = 0 }: { profit: number }): string => {
  if (profit === 0) {
    return "";
  }

  if (profit > 0) {
    return "text-green-500";
  }

  return "text-red-500";
};

export { getProfitClassName };
