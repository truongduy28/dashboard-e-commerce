import { useEffect, useState } from "react";

const useWindow = () => {
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, [window.innerHeight]);

  return { innerHeight };
};

export default useWindow;
