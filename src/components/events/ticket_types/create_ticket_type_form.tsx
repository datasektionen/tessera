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
import CreateTicketTypeFormSchema from "../../../validation/event/create_ticket_type_form";
import StyledButton from "../../buttons/styled_button";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

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
                <StyledText
                  color={PALLETTE.red}
                  level="body-sm"
                  fontSize={16}
                  fontWeight={600}
                  style={{ marginBottom: "16px" }}
                >
                  {t("form.required_description")}
                </StyledText>
                <FormControl>
                  <StyledFormLabel>
                    {t("form.ticket_types.name")}*
                  </StyledFormLabel>
                  <FormInput
                    name="name"
                    label="Name"
                    placeholder="Party Pooper"
                    overrideStyle={{
                      width: "50%",
                    }}
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
                    overrideStyle={{
                      width: "95%",
                    }}
                    // ...other props
                    onChange={(e: any) => {
                      handleChange(e);
                      handleFieldChange("description", e.target.value, index);
                      // Optionally dispatch on change instead of on submit
                    }}
                    maxChars={500}
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
                      size="sm"
                      color={PALLETTE.charcoal_see_through}
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

export default CreateTicketTypeForm;
