const getNumRowsToCompletePageSize = ({
  currentPageNumber = 0,
  numTotalRows = 0,
  pageSize = 0,
} = {}): number => {
  const numTotalPages = Math.ceil(numTotalRows / pageSize);

  if (currentPageNumber === numTotalPages - 1) {
    return pageSize - (numTotalRows % pageSize);
  }

  return 0;
};

export { getNumRowsToCompletePageSize };
