import * as yup from "yup";

const AddonFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Too short")
    .max(255, "Too long"),
  description: yup
    .string()
    .required("Description is required")
    .min(5, "Too short")
    .max(2000, "Too long"),
  price: yup
    .number()
    .required("Price is required")
    .test(
      "is-greater-than-or-equal-to-3-or-0",
      "Price must be 0 or greater than or equal to 3",
      (value) => value >= 0
    )
    .integer("Price must be a whole number"),
  min_quantity: yup
    .number()
    .required("Min Quantity is required")
    .test(
      "is-greater-than-or-equal-to-1",
      "Min Quantity must be greater than or equal to 1",
      (value) => value >= 1
    )
    .integer("Min Quantity must be a whole number"),
  max_quantity: yup
    .number()
    .required("Max Quantity is required")
    .test(
      "is-greater-than-or-equal-to-1",
      "Max Quantity must be greater than or equal to 1",
      (value) => value >= 1
    )
    .integer("Max Quantity must be a whole number")
    .test(
      "is-greater-than-or-equal-to-min-quantity",
      "Max Quantity must be greater than or equal to Min Quantity",
      function (value) {
        const minQuantity = this.parent.min_quantity;
        if (value < minQuantity) {
          return false;
        }

        return true;
      }
    ),

  is_enabled: yup.boolean(),
  ticket_release_id: yup
    .number()
    .required("Ticket Release ID is required")
    .integer("Ticket Release ID must be an integer")
    .min(1, "Ticket Release ID is required"),
});

export default AddonFormSchema;
