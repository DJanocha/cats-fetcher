import type { NextPage } from "next";
import React from "react";
import { CatsDisplayer } from "../components/cats-displayer";
import { useCatsForm } from "../components/cats-form";
import { useCatFetcher } from "../hooks/use-cat-fetcher";

const baseUrl = "https://cataas.com/cat";
const Home: NextPage = () => {
  const { blobUrl, loading, fetcher } = useCatFetcher({ baseUrl });
  const {
    Component: CatsForm,
    data: { color, text },
    debouncing,
  } = useCatsForm({ debounceTimeInMs: 1000 });
  React.useEffect(() => {
    console.info({ color, text });
    fetcher({ color, text });
  }, [color, text, fetcher]);
  return (
    <div className="container">
      <CatsForm />
      <CatsDisplayer src={blobUrl} />
      <div>
        {!debouncing && !loading && text.length === 0 && (
          <span>Use form to generate a cat</span>
        )}
        {(debouncing || loading) && text.length > 0 && <span>Loading...</span>}
      </div>
    </div>
  );
};

export default Home;
