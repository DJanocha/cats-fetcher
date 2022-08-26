import debounce from "lodash.debounce";
import React, { Reducer, useCallback, useMemo } from "react";

import type { Color } from "../components/cats-displayer";

const baseUrl = "https://cataas.com/cat";
const debounceTimeInMs = 1000;

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

export const useCatFetcher = () => {
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
    dispatch({ type: "START" });
    try {
      const res = await fetch(`${baseUrl}/says/${text}?color=${color}`);
      if (!res.ok) {
        throw new Error("cat could not be generated");
      }
      const imageBlob = await res.blob();
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      dispatch({ type: "READY", blobUrl: imageObjectUrl });
    } catch (error: any) {
      dispatch({ type: "ERROR", error });
    }
  };

  const fetcher = React.useCallback(_fetcher, []);
  const _debouncedFetcher = debounce(fetcher, debounceTimeInMs);
  const debouncedFetcher = React.useCallback(_debouncedFetcher, []);

  const waitAndFetch = useCallback(
    (values: FetchVariables) => {
      dispatch({ type: "DELAY" });
      debouncedFetcher(values);
    },
    [debouncedFetcher]
  );
  return {
    ...state,
    fetcher: waitAndFetch,
  };
};
