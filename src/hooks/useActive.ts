import { useCallback, useState } from "react";

const useActive = (initialState: boolean = false) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  const toggle = useCallback(() => setIsActive((prev: boolean) => !prev), []);
  const disable = useCallback(() => setIsActive(false), []);
  const enable = useCallback(() => setIsActive(true), []);

  return {
    toggle,
    enable,
    disable,
    isActive,
  };
};

export { useActive };
