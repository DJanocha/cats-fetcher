import { Form, Formik, Field } from "formik";
import { NodejsRequestData } from "next/dist/server/web/types";
import React from "react";
import { Color } from "./cats-displayer";

type SubmitFormFn = (() => Promise<void>) & (() => Promise<any>);

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

  //todo debouncing!!!!

  const Component = () => (
    <Formik<FormInputType>
      onSubmit={(values) => setData(values)}
      initialValues={data}
    >
      {({}) => (
        <Form>
          <label>Text</label>
          <Field type="text" name="text" />
          <p>Color</p>
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
          <button type="submit">submit</button>
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
