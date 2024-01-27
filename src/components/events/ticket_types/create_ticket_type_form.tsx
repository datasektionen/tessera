import { Box, Divider, FormControl, Grid, Stack } from "@mui/joy";
import { Formik, Form, Field } from "formik";

import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../forms/form_labels";
import { FormCheckbox, FormInput, FormTextarea } from "../../forms/input_types";
import { StyledErrorMessage } from "../../forms/messages";
import { ITicketTypeForm } from "../../../types";
import {
  clearTicketType,
  updateTicketType,
} from "../../../redux/features/ticketTypeCreationSlice";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import CreateTicketTypeFormSchema from "../../../validation/create_ticket_type_form";
import StyledButton from "../../buttons/styled_button";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useEffect } from "react";

interface CreateTicketTypeFormProps {
  ticketTypes: ITicketTypeForm[];
  selectedTicketType: number;
  validateAllForms: () => void;
}

const CreateTicketTypeForm: React.FC<CreateTicketTypeFormProps> = ({
  ticketTypes,
  selectedTicketType,
  validateAllForms,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const handleSubmission = (values: ITicketTypeForm) => {
    console.log(values);
  };

  const handleFieldChange = (fieldName: string, value: any, index: number) => {
    // Update the local form state and dispatch the update to the Redux store
    dispatch(
      updateTicketType({
        index,
        values: { ...ticketTypes[index], [fieldName]: value },
      })
    );
  };

  useEffect(() => {
    validateAllForms();
  }, [ticketTypes]);

  return (
    <>
      {ticketTypes.map((ticketType, index) => (
        <Box
          key={index}
          style={{
            display: index === selectedTicketType ? "inherit" : "none",
          }}
        >
          <Formik
            key={index}
            initialValues={ticketType}
            validationSchema={CreateTicketTypeFormSchema}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={true}
            onSubmit={(values) => {
              // Dispatch an action to update the Redux state1
              dispatch(updateTicketType({ index, values }));
            }}
            enableReinitialize // This ensures the form updates when ticketTypes changes
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                onFocus={() => {
                  validateAllForms();
                }}
                onBlur={() => {
                  validateAllForms();
                }}
              >
                <FormControl>
                  <StyledFormLabel>Name*</StyledFormLabel>
                  <FormInput
                    name="name"
                    label="Name"
                    placeholder="Party Pooper"
                    // ...other props
                    onChange={(e: any) => {
                      handleChange(e);
                      // Optionally dispatch on change instead of on submit
                      handleFieldChange("name", e.target.value, index);
                    }}
                  />
                  <StyledErrorMessage name="name" />

                  <StyledFormLabelWithHelperText>
                    What is the name of this ticket?
                  </StyledFormLabelWithHelperText>
                </FormControl>
                <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                <FormControl>
                  <StyledFormLabel>Description*</StyledFormLabel>
                  <FormTextarea
                    name="description"
                    label="Description"
                    placeholder="Access to the Party Pooper section"
                    // ...other props
                    onChange={(e: any) => {
                      handleChange(e);
                      handleFieldChange("description", e.target.value, index);
                      // Optionally dispatch on change instead of on submit
                    }}
                  />
                  <StyledErrorMessage name="description" />

                  <StyledFormLabelWithHelperText>
                    What is included in this ticket?
                  </StyledFormLabelWithHelperText>
                </FormControl>

                <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                <FormControl>
                  <StyledFormLabel>Price (in SEK)*</StyledFormLabel>
                  <FormInput
                    type="number"
                    name="price"
                    label="Price"
                    placeholder=""
                    // ...other props
                    onChange={(e: any) => {
                      handleChange(e);
                      let fvstring = parseFloat(e.target.value).toFixed(2);
                      let floatValue = parseFloat(fvstring);

                      if (isNaN(floatValue)) {
                        return;
                      }

                      handleFieldChange("price", floatValue, index);

                      // Optionally dispatch on change instead of on submit
                    }}
                  />
                  <StyledErrorMessage name="price" />

                  <StyledFormLabelWithHelperText>
                    How much does this ticket cost?
                  </StyledFormLabelWithHelperText>
                </FormControl>

                <Grid
                  container
                  spacing={2}
                  flexDirection="row"
                  justifyContent="flex-end"
                >
                  <Grid>
                    <StyledButton
                      size="md"
                      color="primary"
                      onClick={() => {
                        dispatch(clearTicketType(index));
                      }}
                    >
                      Clear
                    </StyledButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      ))}
      {/* Add button to add new ticket type */}
    </>
  );
};

export default CreateTicketTypeForm;
