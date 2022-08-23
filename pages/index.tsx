import React, { useState } from "react";
import type { NextPage } from "next";
import debounce from "lodash.debounce";

import { CatsDisplayer } from "../components/cats-displayer";
import { CatsForm } from "../components/cats-form";

import styles from "../styles/Home.module.css";
import { Field, Form, Formik } from "formik";
import { useCatFetcher } from "../hooks/use-cat-fetcher";

const baseUrl = "https://cataas.com/cat";
const debounceTimeInMs = 1000;

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
  const { blobUrl, error, fetcher, status } = useCatFetcher({
    baseUrl,
    debounceTimeInMs,
  });

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
      <CatsDisplayer src={blobUrl} />
    </div>
  );
};

export default Home;
