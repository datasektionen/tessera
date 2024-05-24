import { Checkbox, Input, Textarea } from "@mui/joy";
import { Field } from "formik";
import PALLETTE from "../../theme/pallette";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { formatDateToDateTimeLocal } from "../../utils/date_conversions";
import { useEffect, useRef, useState } from "react";
import "react-markdown-editor-lite/lib/index.css";
import StyledText from "../text/styled_text";

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
  required?: boolean;
  afterChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
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
  disabled = false,
  required = true,
  afterChange = () => { },
}) => {
  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => (
        <Input
          {...field}
          onWheel={(event: any) => {
            if (type === 'number') {
              event.preventDefault();
              event.target.blur()
            }
          }}
          ref={inputRef}
          label={label}
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
          disabled={disabled}
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
            } finally {
              afterChange(e);
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
};

export interface FormTextareaProps {
  name: string;
  label: string;
  placeholder: string;
  minRows?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  overrideStyle?: Object;
  required?: boolean;
  maxChars?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  minRows = 2,
  onChange = undefined,
  overrideStyle = {},
  required = true,
  maxChars = 2000, // Default max characters
}) => {
  const [content, setContent] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= maxChars) { // Ensure the text does not exceed the max characters
      setContent(newText);
      if (onChange) {
        onChange(event as any);
      }
    }
  };

  return (
    <Field name={name}>
      {({ field }: any) => {
        setContent(field.value);

        return (
          <div style={{ position: 'relative', width: "97%" }}>
            <Textarea
              {...field}
              minRows={minRows}
              placeholder={placeholder}
              onChange={(event) => {
                handleChange(event);
                field.onChange(event);
              }}
              value={content} // Set the value to content state
              required={required}
              style={{
                ...DefaultInputStyle,
                width: '100%',
                ...overrideStyle,
                paddingBottom: "30px"
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '5px',
              right: '6%',
              fontSize: '12px',
              color: 'grey',
            }}>
              <StyledText
                level="body-md"
                color={content.length >= maxChars ? PALLETTE.red : PALLETTE.charcoal_see_through}
                fontSize={14}>
                {content.length}/{maxChars}
              </StyledText>
            </div>
          </div>
        )
      }}
    </Field>
  );
};

export interface FormMarkdownProps {
  name: string;
  label: string;
  placeholder: string;
  minRows?: number;
  onChange?: (content: string) => void;
  overrideStyle?: Object;
  maxChars?: number;
}

export const FormMarkdown: React.FC<FormMarkdownProps> = ({
  name,
  label,
  placeholder,
  minRows = 2,
  onChange = () => { },
  overrideStyle = {},
  maxChars = 2000, // Default max characters
}) => {
  const [content, setContent] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= maxChars) { // Ensure the text does not exceed the max characters
      setContent(newText);
      if (onChange) {
        onChange(newText);
      }
    }
  };

  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <div style={{ position: 'relative', width: "97%" }}>
          <Textarea
            {...field}
            minRows={minRows}
            placeholder={placeholder}
            onChange={(event) => {
              handleChange(event);
              field.onChange(event);
            }}
            value={content} // Set the value to content state
            style={{
              ...DefaultInputStyle,
              width: '100%',
              ...overrideStyle,
              paddingBottom: "30px"
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '5px',
            right: '6%',
            fontSize: '12px',
            color: 'grey',
          }}>
            <StyledText
              level="body-md"
              color={content.length > maxChars ? PALLETTE.red : PALLETTE.charcoal_see_through}
              fontSize={14}>
              {content.length}/{maxChars}
            </StyledText>
          </div>
        </div>
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
