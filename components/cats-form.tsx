import React from "react";
import { Form, Formik, Field } from "formik";
import debounce from "lodash.debounce";

import type { Color } from "./cats-displayer";
import styles from "../styles/Home.module.css";

type Props = {
  debounceTimeInMs: number;
};
type FormInputType = {
  color: Color;
  text: string;
};
const formInputDefaultValues: FormInputType = {
  color: "red",
  text: "",
};
export const useCatsForm = ({ debounceTimeInMs }: Props) => {
  const [data, setData] = React.useState<FormInputType>(formInputDefaultValues);

  const updateDataOnFormValuesChange = (data: FormInputType) => {
    setData(() => data);
  };
  const debouncedUpdateDataOnFormValuesChange = debounce(
    updateDataOnFormValuesChange,
    debounceTimeInMs
  );
  const Component = () => (
    <Formik<FormInputType>
      onSubmit={(values) => setData(values)}
      initialValues={data}
    >
      {({ values }) => (
        <Form onChange={() => debouncedUpdateDataOnFormValuesChange(values)}>
          <div className={styles.form}>
            <div className={styles.formOption}>
              <label>Text</label>
              <Field type="text" name="text" />
            </div>

            <div className={styles.formOption}>
              <label>Color</label>
              <div className={styles.formSuboptions}>
                <div>
                  <div>
                    <Field type="radio" id="red" value="red" name="color" />
                    <label htmlFor="red">red</label>
                  </div>
                </div>
                <div>
                  <div>
                    <Field type="radio" id="green" value="green" name="color" />
                    <label htmlFor="green">green</label>
                  </div>
                </div>
                <div>
                  <div>
                    <Field type="radio" id="blue" value="blue" name="color" />
                    <label htmlFor="blue">blue</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
  return {
    Component,
    data,
    debouncing: false,
  };
};
