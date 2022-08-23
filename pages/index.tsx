import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";
import { CatsDisplayer } from "../components/cats-displayer";
import { useCatsForm } from "../components/cats-form";
import { useCatFetcher } from "../hooks/use-cat-fetcher";

const baseUrl = "https://cataas.com/cat";
const Home: NextPage = () => {
  const {
    Component: CatsForm,
    data: { color, text },
    debouncing,
  } = useCatsForm({ debounceTimeInMs: 1000 });
  const { blobUrl, loading, fetcher, error } = useCatFetcher({ baseUrl });
  const isIdle = !debouncing && !loading && !error && !blobUrl;
  const isLoading = debouncing || loading;
  const isLoaded = blobUrl.length > 0;
  const isError = !!error;

  React.useEffect(() => {
    console.info({ color, text });
    fetcher({ color, text });
  }, [color, text, fetcher]);
  return (
    <div className={styles.centerBothDir}>
      <CatsForm />
      <div>
        {isIdle && <span>Use form to generate a cat</span>}
        {isLoading && <span>Loading...</span>}
        {isLoaded && <CatsDisplayer src={blobUrl} />}
        {isError && <span>cat could not be generated</span>}
      </div>
    </div>
  );
};

export default Home;
