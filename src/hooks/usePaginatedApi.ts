import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

const usePaginatedApi = (
  pageNo: number,
  baseUrl: string,
  dispatchFunc: (p: any) => AnyAction
) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const nextUrl = useRef<string>(baseUrl);

  const hasMore = Boolean(nextUrl.current)

  useEffect(() => {
    if(!nextUrl.current) return;
    const controller = new AbortController();
    setIsLoading(true);
    axios({
      method: "GET",
      url: nextUrl.current,
      signal: controller.signal,
    })
      .then((res) => {
        dispatch(dispatchFunc(res.data.data));
        setIsLoading(false);
        nextUrl.current = res.data.next_url;
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
      });
    return () => {
      controller.abort();
    };
  }, [pageNo, dispatch, dispatchFunc]);

  return { isLoading, hasMore };
};

export default usePaginatedApi;
