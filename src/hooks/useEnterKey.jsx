import { useEffect } from "react";

const useEnterKey = (callback, active = true) => {
  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, active]);
};

export default useEnterKey;
