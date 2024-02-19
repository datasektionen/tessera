import * as Yup from "yup";

export const formFieldSchema = Yup.object().shape({
  formFields: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Field name is required")
        .max(255, "Name is too long"),
      type: Yup.string().required("Field type is required"),
      description: Yup.string()
        .required("Field description is required")
        .max(1000, "Description is too long"),
      is_required: Yup.boolean(),
    })
  ),
});
