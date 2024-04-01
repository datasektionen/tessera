import { Checkbox, Input, Textarea } from "@mui/joy";
import { Field } from "formik";
import PALLETTE from "../../theme/pallette";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { formatDateToDateTimeLocal } from "../../utils/date_conversions";
import { useState } from "react";
import "react-markdown-editor-lite/lib/index.css";

// Initialize a markdown parser

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  overrideStyle?: Object;
  autoComplete?: string;
  readOnly?: boolean;
  clear?: () => void;
  requried?: boolean;
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
  readOnly = false,
  overrideStyle = {},
  autoComplete = "on",
  requried = true,
}) => (
  <Field name={name}>
    {({ field, form }: { field: any; form: any }) => (
      <Input
        {...field}
        label={label}
        required={requried}
        readOnly={readOnly}
        autoComplete={autoComplete}
        onChange={(e: any) => {
          try {
            if (type === "datetime-local") {
              if (!e.target.value) {
                return;
              }
              // Optional: Validate the datetime-local value here before setting it
            }

            if (type === "number") {
              if (e.target.value.length > 1) {
                e.target.value = e.target.value.replace(/^0+/, "");
              }
            }

            // Proceed with onChange logic
            if (onChange) {
              onChange(e);
            } else {
              field.onChange(e);
            }
          } catch (error) {
            console.error("Error processing input change:", error);
            // Optionally set an error state here
          }
        }}
        placeholder={placeholder}
        type={type}
        style={
          {
            ...DefaultInputStyle,
            ...overrideStyle,
          } as any
        }
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
  overrideStyle?: Object;
  required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  minRows = 2,
  onChange = undefined,
  overrideStyle = {},
  required = true,
}) => (
  <Field name={name}>
    {({ field }: any) => (
      <Textarea
        {...field}
        minRows={minRows}
        onChange={onChange ? onChange : field.onChange}
        label={label}
        required={required}
        placeholder={placeholder}
        style={{
          ...DefaultInputStyle,
          width: "350px",
          ...overrideStyle,
        }}
      />
    )}
  </Field>
);

export interface FormMarkdownProps {
  name: string;
  label: string;
  placeholder: string;
  minRows?: number;
  onChange?: (content: string) => void;
}

export const FormMarkdown: React.FC<FormMarkdownProps> = ({
  name,
  label,
  placeholder,
  minRows = 2,
  onChange = () => {},
}) => {
  const [content, setContent] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setContent(newText);
    if (onChange) {
      onChange(newText);
    }
  };

  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <Textarea
          {...field}
          rows={minRows}
          placeholder={placeholder}
          onChange={(event) => {
            handleChange(event);
            field.onChange(event);
          }}
          style={{
            ...DefaultInputStyle,
            width: "350px",
          }}
        />
      )}
    </Field>
  );
};

interface FormCheckboxProps {
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  onChange = undefined,
  disabled = false,
}) => (
  <Field name={name} type="checkbox" label={label}>
    {({ field }: any) => (
      <Checkbox
        {...field}
        disabled={disabled}
        value={field.value} // Ensure value is a string
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
