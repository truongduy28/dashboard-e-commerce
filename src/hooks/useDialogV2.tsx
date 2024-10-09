import { useCallback, useState } from "react";

export function useDialog() {
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setIsShow((prev) => !prev);
  }, []);

  return {
    isShow,
    toggle,
  };
}
