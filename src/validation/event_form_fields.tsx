import * as Yup from "yup";

export const formFieldSchema = Yup.object().shape({
  formFields: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Field name is required"),
      type: Yup.string().required("Field type is required"),
    })
  ),
});
