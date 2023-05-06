import { MutableRefObject, useCallback, useEffect } from "react";

const useClickAwayListener = (
  ref: MutableRefObject<HTMLDivElement | null>,
  callbackFunc: () => void
) => {
  const callback = useCallback(() => {
    callbackFunc();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickAwayListener;
