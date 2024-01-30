import { Box, Divider, FormControl, Grid, Stack } from "@mui/joy";
import { Formik, Form, Field } from "formik";

import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../forms/form_labels";
import { FormCheckbox, FormInput, FormTextarea } from "../../forms/input_types";
import { StyledErrorMessage } from "../../forms/messages";
import { ITicketRelease, ITicketTypeForm } from "../../../types";
import {
  clearTicketType,
  updateTicketType,
} from "../../../redux/features/ticketTypeCreationSlice";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import StyledButton from "../../buttons/styled_button";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useEffect } from "react";
import CreateTicketTypeFormSchema from "../../../validation/create_ticket_type_form";
import { useTranslation } from "react-i18next";

interface EditTicketTypeFormProps {
  ticketTypes: ITicketTypeForm[];
  selectedTicketType: number;
  validateAllForms: () => void;
}

const EditTicketTypeForm: React.FC<EditTicketTypeFormProps> = ({
  ticketTypes,
  selectedTicketType,
  validateAllForms,
}) => {
  const dispatch: AppDispatch = useDispatch();

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

  const { t } = useTranslation();

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
                  <StyledFormLabel>
                    {t("form.ticket_types.name")}*
                  </StyledFormLabel>
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
                    {t("form.ticket_types.name_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>
                <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                <FormControl>
                  <StyledFormLabel>
                    {t("form.ticket_types.description")}*
                  </StyledFormLabel>
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
                    {t("form.ticket_types.description_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

                <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                <FormControl>
                  <StyledFormLabel>
                    {t("form.ticket_types.price")}*
                  </StyledFormLabel>
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
                    {t("form.ticket_types.price_helperText")}
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
                      {t("form.button_clear")}
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

export default EditTicketTypeForm;
