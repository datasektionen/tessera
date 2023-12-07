import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@mui/joy";
import { Field, Form, Formik } from "formik";
import PALLETTE from "../../theme/pallette";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../forms/form_labels";

const CreateEventForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        date: "",
        location: "",
        organization_id: "",
        is_private: false,
      }}
      onSubmit={(values) => {
        // Convert date to Unix timestamp
        console.log(values);
      }}
    >
      <Form>
        <FormControl>
          <StyledFormLabel>Name</StyledFormLabel>
          <Field name="name">
            {({ field }: any) => (
              <Input
                {...field}
                label="Name"
                style={{
                  width: "200px",
                  borderColor: PALLETTE.cerise,
                  backgroundColor: PALLETTE.offWhite,
                }}
              />
            )}
          </Field>
          <StyledFormLabelWithHelperText>
            What is the name of your event?
          </StyledFormLabelWithHelperText>

          <Divider />

          <StyledFormLabel>Description</StyledFormLabel>

          <Field name="description">
            {({ field }: any) => (
              <Input
                {...field}
                label="Description"
                style={{
                  width: "200px",
                  borderColor: PALLETTE.cerise,
                  backgroundColor: PALLETTE.offWhite,
                }}
              />
            )}
          </Field>

          <StyledFormLabelWithHelperText>
            What is your event about? What should people expect?
          </StyledFormLabelWithHelperText>

          <Divider />

          <StyledFormLabel>Date</StyledFormLabel>
          <Field name="date" type="date" 
            {({ field }: any) => (
                <Input
                    {...field}
                    label="Date"
                    style={{
                        width: "200px",
                        borderColor: PALLETTE.cerise,
                        backgroundColor: PALLETTE.offWhite,
                      }}

                />
              )}
            </Field>

            
          <FormHelperText>When is your event?</FormHelperText>

          <FormLabel>Location</FormLabel>
          <Field name="location" as={Input} label="Location" />
          <FormHelperText>Where is your event?</FormHelperText>
          <Field
            name="organization_id"
            type="number"
            as={Input}
            label="Organization ID"
          />
          <Field
            name="is_private"
            type="checkbox"
            as={FormLabel}
            control={<Checkbox />}
            label="Is Private"
          />
          <Button type="submit">Submit</Button>
        </FormControl>
      </Form>
    </Formik>
  );
};

export default CreateEventForm;
