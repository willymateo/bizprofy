const getInitialStateFromLocalStorage = <T>({
  parseObject = true,
  emptyState,
  key,
}: {
  parseObject?: boolean;
  emptyState: T;
  key: string;
}) => {
  if (typeof window === "undefined") {
    return emptyState;
  }

  const stateFromLocalStorage = localStorage.getItem(key);

  if (stateFromLocalStorage) {
    if (!parseObject) {
      return stateFromLocalStorage;
    }

    let state = emptyState;

    try {
      state = JSON.parse(stateFromLocalStorage);
    } catch (err) {
      console.error(`Error parsing ${key} state from local storage`, err);
    }

    return state;
  }

  localStorage.setItem(key, JSON.stringify(emptyState));

  return emptyState;
};

export { getInitialStateFromLocalStorage };
