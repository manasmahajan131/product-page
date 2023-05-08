import { useCallback, useRef, useState } from "react";
import usePaginatedApi from "./usePaginatedApi";
import { AnyAction } from "@reduxjs/toolkit";

const useInfiniteScroll = (
  baseUrl: string,
  dispatchFunc: (p: any) => AnyAction
) => {
  const observer = useRef<IntersectionObserver | null>();
  const [pageNo, setPageNo] = useState(0);
  const { isLoading } = usePaginatedApi(pageNo, baseUrl, dispatchFunc);

  const lastItemRef = useCallback(
    (node: any) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNo((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading]
  );

  return { lastItemRef, isLoading };
};

export default useInfiniteScroll;
