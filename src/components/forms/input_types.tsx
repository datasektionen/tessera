import { Checkbox, Input, Textarea } from "@mui/joy";
import { Field } from "formik";
import PALLETTE from "../../theme/pallette";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { PlaceOption } from "../events/create_event_form";
import { formatDateToDateTimeLocal } from "../../utils/date_conversions";

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type,
}) => (
  <Field name={name}>
    {({ field }: any) => (
      <Input
        {...field}
        label={label}
        required
        placeholder={placeholder}
        type={type}
        style={{
          width: "200px",
          borderColor: PALLETTE.cerise,
          backgroundColor: PALLETTE.offWhite,
        }}
      />
    )}
  </Field>
);

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder: string;
  minRows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  minRows = 2,
}) => (
  <Field name={name}>
    {({ field }: any) => (
      <Textarea
        {...field}
        minRows={minRows}
        label={label}
        required
        placeholder={placeholder}
        style={{
          width: "400px",
          borderColor: PALLETTE.cerise,
          backgroundColor: PALLETTE.offWhite,
        }}
      />
    )}
  </Field>
);

interface FormCheckboxProps {
  name: string;
  label: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label }) => (
  <Field name={name} type="checkbox" label={label}>
    {({ field }: any) => (
      <Checkbox
        {...field}
        style={{
          borderColor: PALLETTE.cerise,
          backgroundColor: PALLETTE.offWhite,
        }}
      />
    )}
  </Field>
);

interface FormGooglePlacesAutocompleteProps {
  name: string;
}

export const FormGooglePlacesAutocomplete: React.FC<
  FormGooglePlacesAutocompleteProps
> = ({ name }) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        console.log(field.value); // Logging to see the value structure

        return (
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
            selectProps={{
              //@ts-ignore
              value: field.value ? { label: field.value } : undefined, // Adjusted to match type
              onChange: (option: PlaceOption | null) => {
                console.log(option); // Logging to see the option structure
                form.setFieldValue(name, option ? option.label : "");
              },
              styles: {
                control: (provided, state) => ({
                  ...provided,
                  width: "300px",
                  borderColor: PALLETTE.cerise,
                  backgroundColor: PALLETTE.offWhite,
                }),
              },
              placeholder: "Location",
            }}
          />
        );
      }}
    </Field>
  );
};
