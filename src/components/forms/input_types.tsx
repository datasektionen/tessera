import { Checkbox, Input, Textarea } from "@mui/joy";
import { Field } from "formik";
import PALLETTE from "../../theme/pallette";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { formatDateToDateTimeLocal } from "../../utils/date_conversions";

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DefaultInputStyle = {
  width: "200px",
  borderColor: PALLETTE.charcoal_see_through,
  backgroundColor: PALLETTE.offWhite,
  borderWidth: "2px",
};

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type,
  onChange = undefined,
}) => (
  <Field name={name}>
    {({ field }: any) => (
      <Input
        {...field}
        label={label}
        required
        onChange={onChange ? onChange : field.onChange}
        placeholder={placeholder}
        type={type}
        style={DefaultInputStyle}
      />
    )}
  </Field>
);

export interface FormTextareaProps {
  name: string;
  label: string;
  placeholder: string;
  minRows?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  minRows = 2,
  onChange = undefined,
}) => (
  <Field name={name}>
    {({ field }: any) => (
      <Textarea
        {...field}
        minRows={minRows}
        onChange={onChange ? onChange : field.onChange}
        label={label}
        required
        placeholder={placeholder}
        style={{
          ...DefaultInputStyle,
          width: "350px",
        }}
      />
    )}
  </Field>
);

interface FormCheckboxProps {
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  onChange = undefined,
}) => (
  <Field name={name} type="checkbox" label={label}>
    {({ field }: any) => (
      <Checkbox
        {...field}
        onChange={onChange ? onChange : field.onChange}
        style={{
          ...DefaultInputStyle,
          width: "20px",
        }}
      />
    )}
  </Field>
);

export type PlaceOption = {
  label: string;
  value: Object;
};

interface FormGooglePlacesAutocompleteProps {
  name: string;
}

export const FormGooglePlacesAutocomplete: React.FC<
  FormGooglePlacesAutocompleteProps
> = ({ name }) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
            selectProps={{
              //@ts-ignore
              value: field.value, // Assuming field.value is a PlaceOption
              onChange: (option: PlaceOption | null) => {
                form.setFieldValue(name, option || undefined);
              },
              styles: {
                control: (provided, state) => ({
                  ...provided,
                  ...DefaultInputStyle,
                  width: "300px",
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
