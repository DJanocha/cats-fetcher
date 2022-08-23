import { useCatFetcher } from "../hooks/use-cat-fetcher";
import { useCatsFormData } from "./cats-form";

type Props = {
  baseUrl: string;
  debounceTimeInMs: number;
};
export const useCats = ({ baseUrl, debounceTimeInMs }: Props) => {
  const { debouncing } = useCatsFormData({ debounceTimeInMs });
  const { blobUrl, error, fetcher, loading } = useCatFetcher({ baseUrl });

  return {
    blobUrl,
    loading: loading || debouncing,
    error,
  };
};
