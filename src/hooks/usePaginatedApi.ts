import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "../features/products/types";
import { AnyAction } from "redux";

const usePaginatedApi = (
  pageNo: number,
  baseUrl: string,
  dispatchFunc: (p: Product[]) => AnyAction
) => {
  const { products } = useSelector((state: RootState) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const nextUrl = useRef<string>(baseUrl);

  const loadItems = async (signal: AbortSignal) => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: nextUrl.current,
      signal: signal,
    })
      .then((res) => {
        dispatch(dispatchFunc(res.data.data));
        setIsLoading(false);
        nextUrl.current = res.data.next_url;
      })
      .catch((err) => {
        if (signal.aborted) return;
        console.error(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    loadItems(controller.signal);
    return () => {
      controller.abort();
    };
  }, [pageNo]);

  return { products, isLoading };
};

export default usePaginatedApi;
