import React from "react";
import { Color } from "../components/cats-displayer";

type Props = {
  baseUrl: string;
};
type FetchParams = {
  text: string;
  color: Color;
};

export const useCatFetcher = ({ baseUrl }: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [blobUrl, setBlobUrl] = React.useState<string>("");
  const [error, setError] = React.useState<any>([]);

  const _fetcher = async ({ color, text }: FetchParams) => {
    try {
      setError(null);
      setLoading(() => true);
      const res = await fetch(`${baseUrl}/says/${text}?color=${color}`);
      const imageBlob = await res.blob();
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setBlobUrl(() => imageObjectUrl);
    } catch (error: any) {
      setError(() => error);
      setBlobUrl(() => "");
    }
    setLoading(() => false);
  };
  const fetcher = React.useCallback(_fetcher, [baseUrl]);
  return { blobUrl, loading, error, fetcher };
};
