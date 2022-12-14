import React, { useState } from "react";
import type { NextPage } from "next";
import { Field, Form, Formik } from "formik";
import { useCatFetcher, renderMessage } from "../hooks/use-cat-fetcher";

import { CatsDisplayer } from "../components/cats-displayer";
import styles from "../styles/Home.module.css";

export type Color = "red" | "green" | "blue";
export type FormInputType = {
  color: Color;
  text: string;
};
const initialFormData: FormInputType = {
  color: "red",
  text: "",
};

const Home: NextPage = () => {
  const { blobUrl, fetcher, status } = useCatFetcher();
  console.log({ status });

  return (
    <div className={styles.centerBothDir}>
      <Formik<FormInputType> onSubmit={fetcher} initialValues={initialFormData}>
        {({ submitForm }) => (
          <Form onChange={submitForm}>
            <div className={styles.form}>
              <div className={styles.formOption}>
                <label>Text</label>
                <Field type="text" name="text" />
              </div>

              <div className={styles.formOption}>
                <label>Color</label>
                <div className={styles.formSuboptions}>
                  <div>
                    <Field type="radio" id="red" value="red" name="color" />
                    <label htmlFor="red">red</label>
                  </div>
                  <div>
                    <Field type="radio" id="green" value="green" name="color" />
                    <label htmlFor="green">green</label>
                  </div>
                  <div>
                    <Field type="radio" id="blue" value="blue" name="color" />
                    <label htmlFor="blue">blue</label>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {status === "success" ? (
        <CatsDisplayer src={blobUrl} />
      ) : (
        renderMessage(status)
      )}
    </div>
  );
};

export default Home;
