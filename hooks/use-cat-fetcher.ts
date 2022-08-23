import debounce from "lodash.debounce";
import React, { Reducer, useCallback, useMemo } from "react";

import type { Color } from "../components/cats-displayer";
import { FormInputType } from "../pages";

type Props = {
  baseUrl: string;
  debounceTimeInMs: number;
};
type FetchVariables = {
  text: string;
  color: Color;
};
type State = {
  status: "idle" | "waiting" | "loading" | "success" | "error";
  error: Error | null;
  blobUrl: string;
};

type Action =
  | { type: "RESET" }
  | { type: "DELAY" }
  | { type: "START" }
  | { type: "READY"; blobUrl: string }
  | { type: "ERROR"; error: Error };

export const renderMessage = (status: State["status"]): string => {
  switch (status) {
    case "error":
      return "Cat could not be generated";
    case "idle":
      return "Use form to generate a cat";
    case "loading":
    case "waiting":
      return "Loading...";
    default:
      return "";
  }
};

export const useCatFetcher = ({ baseUrl, debounceTimeInMs }: Props) => {
  const lastCalled = React.useRef<number>(Date.now());
  const initialState: State = {
    status: "idle",
    error: null,
    blobUrl: "",
  };

  const [state, dispatch] = React.useReducer<Reducer<State, Action>>(
    ((state, action) => {
      switch (action.type) {
        case "RESET":
          return { ...initialState };
        case "DELAY":
          return { ...initialState, status: "waiting" };
        case "START":
          return { ...initialState, status: "loading" };
        case "READY":
          return {
            ...initialState,
            status: "success",
            blobUrl: action.blobUrl,
          };
        case "ERROR":
          return { ...initialState, status: "error", error: action.error };
        default:
          return state;
      }
    }) as (state: State, action: Action) => State,
    initialState
  );

  const _fetcher = async ({ color, text }: FetchVariables) => {
    const now = Date.now();
    const milisecondsPassed = now - lastCalled.current;

    dispatch({ type: "START" });
    try {
      const res = await fetch(`${baseUrl}/says/${text}?color=${color}`);
      const imageBlob = await res.blob();
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      dispatch({ type: "READY", blobUrl: imageObjectUrl });
    } catch (error: any) {
      dispatch({ type: "ERROR", error });
    }
  };
  const fetcher = React.useCallback(_fetcher, [baseUrl]);
  const debouncedFetcher = debounce(fetcher, debounceTimeInMs);

  // const _fetcherWithWaiting = (values: FetchVariables) => {
  //   dispatch({ type: "DELAY" });
  // };
  console.log("usecatfetcher");
  const triggerLoading = React.useCallback(() => {
    dispatch({ type: "DELAY" });
  }, []);

  // const _both = async (values: FetchVariables) => {
  //   triggerLoading();
  //   await debouncedFetcher(values);
  // };
  // const both = React.useCallback(_both, [debouncedFetcher]);

  // const maybeThat = (values: FetchVariables) => React.useMemo(()=>{
  //   triggerLoading();
  //   debouncedFetcher(values)
  // },[])
  // const maybeThat = React.useMemo(
  //   () => (values: FetchVariables) => {
  //     triggerLoading();
  //     debouncedFetcher(values);
  //   },
  //   [debouncedFetcher]
  // );

  const whatAbout = useCallback((values: FetchVariables) => {
    triggerLoading();
    debouncedFetcher(values);
  }, []);
  return {
    ...state,
    // fetcher: debouncedFetcher, // ALMOST work because doesn't use 'loading' state from debouncing, only from waiting for api response
    // fetcher: both, // doesnt work because fires multiple api calls in parallel
    // fetcher: maybeThat,
    fetcher: debouncedFetcher,
    triggerLoading: whatAbout,
  };
};
