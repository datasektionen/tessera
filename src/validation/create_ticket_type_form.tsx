import * as Yup from "yup";

const isRoundedNumber = (num: number) => {
  return num % 1 === 0;
};

const CreateTicketTypeFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Too short")
    .max(50, "Too long"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Too short")
    .max(500, "Too long"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  quantity_total: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than or equal to 1")
    .test(
      "is-rounded-number",
      "Quantity must be a rounded number",
      isRoundedNumber
    ),
});

export default CreateTicketTypeFormSchema;
