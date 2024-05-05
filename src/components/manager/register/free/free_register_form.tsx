import { FormControl, Option, Select } from "@mui/joy";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { DefaultInputStyle, FormInput } from "../../../forms/input_types";
import { StyledErrorMessage } from "../../../forms/messages";
import StyledButton from "../../../buttons/styled_button";
import PALLETTE from "../../../../theme/pallette";
import Confetti from "react-confetti";

const referralSources = [
  { id: 1, name: "Facebook", description: "Facebook" },
  { id: 2, name: "Google", description: "Google" },
  { id: 3, name: "Instagram", description: "Instagram" },
  { id: 4, name: "LinkedIn", description: "LinkedIn" },
  { id: 5, name: "Friend", description: "Friend" },
  { id: 6, name: "Other", description: "Other" },
];

const FreeRegisterFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  // referral source is optional, and allowed to be null
  referral_source: Yup.string().nullable(),
  referral_source_specific: Yup.string().nullable(),
});

const FreeRegisterForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        refferal_source: "",
      }}
      validationSchema={FreeRegisterFormValidationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, isValid }) => (
        <Form>
          {/* <Confetti width={window.innerWidth} height={window.innerHeight} /> */}

          <FormControl>
            <StyledFormLabel>Give yourself a name*</StyledFormLabel>
            <FormInput
              label="Name"
              name="name"
              type="text"
              placeholder="Ex. Party fixers"
            />
            <StyledErrorMessage name="name" />
            <StyledFormLabelWithHelperText>
              Event manager name, this will be displayed on the event page.
            </StyledFormLabelWithHelperText>
          </FormControl>
          <FormControl>
            <StyledFormLabel>How did you hear about us?</StyledFormLabel>
            <Field name="refferal_source">
              {({ field, form }: any) => {
                return (
                  <Select
                    {...field}
                    onChange={(_, newValue) => {
                      form.setFieldValue(field.name, newValue as string);
                    }}
                    style={{
                      ...DefaultInputStyle,
                      width: "350px",
                    }}
                    placeholder="Select one"
                  >
                    {referralSources?.map((trm) => {
                      return (
                        <Option
                          key={trm.id}
                          value={trm.name}
                          title={trm.description}
                        >
                          {trm.name}
                        </Option>
                      );
                    })}
                  </Select>
                );
              }}
            </Field>
            <StyledErrorMessage name="refferal_source" />
          </FormControl>
          {values.refferal_source === "Other" && (
            <FormControl>
              <StyledFormLabel>Please specify</StyledFormLabel>
              <FormInput
                label="Please specify"
                name="referral_source_specific"
                type="text"
                placeholder="Please specify"
              />
              <StyledErrorMessage name="referral_source_specific" />
            </FormControl>
          )}
          <StyledButton
            size="md"
            type="submit"
            disabled={!isValid}
            bgColor={PALLETTE.cerise}
            style={{
              marginTop: "20px",
            }}
          >
            Let's Party!
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default FreeRegisterForm;
