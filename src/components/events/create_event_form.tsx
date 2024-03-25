import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Link,
  Option,
  Select,
  Stack,
  Textarea,
} from "@mui/joy";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PALLETTE from "../../theme/pallette";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../forms/form_labels";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import StyledButton from "../buttons/styled_button";
import {
  DefaultInputStyle,
  FormCheckbox,
  FormGooglePlacesAutocomplete,
  FormInput,
  FormMarkdown,
  FormTextarea,
} from "../forms/input_types";
import CreateEventFormSchema from "../../validation/create_event_form";
import StyledText from "../text/styled_text";
import { StyledErrorMessage } from "../forms/messages";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrganizationsRequest } from "../../redux/features/organizationSlice";
import LoadingOverlay from "../Loading";
import { EventFormInitialValues, IEventForm } from "../../types";
import {
  clearEventForm,
  nextStep,
  setEventForm,
} from "../../redux/features/eventCreationSlice";
import { useTranslation } from "react-i18next";

const CreateEventForm: React.FC = () => {
  const { organizations, loading } = useSelector(
    (state: RootState) => state.organization
  );
  const { t } = useTranslation();

  const {
    form: { event: initialValues },
    loading: initalLoading,
  } = useSelector((state: RootState) => state.eventCreation);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrganizationsRequest());
  }, [dispatch]);

  const handleSubmission = (values: IEventForm) => {
    // Convert date to Unix timestamp
    dispatch(setEventForm(values));
  };

  if (loading || initalLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateEventFormSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values: IEventForm) => {
        // Convert date to Unix timestamp
        handleSubmission(values);
      }}
      enableReinitialize
    >
      {({ values, isValid, errors }) => {
        return (
          <Form>
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
              <StyledFormLabel>{t("form.event_details.name")}*</StyledFormLabel>
              <FormInput name="name" label="Name" placeholder="Party Rangers" />
              <StyledErrorMessage name="name" />

              <StyledFormLabelWithHelperText>
                {t("form.event_details.name_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider />
            <FormControl>
              <StyledFormLabel>
                {t("form.event_details.description")}*
              </StyledFormLabel>

              <FormMarkdown
                name="description"
                label="Description"
                placeholder="Party Rangers is a party for rangers."
              />
              <StyledErrorMessage name="description" />

              <StyledFormLabelWithHelperText>
                {t("form.event_details.description_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider />
            <Stack spacing={5} direction={"row"}>
              <FormControl>
                <StyledFormLabel>
                  {t("form.event_details.date")}*
                </StyledFormLabel>
                <FormInput
                  name="date"
                  label="Date"
                  type="datetime-local"
                  placeholder=""
                />
                <StyledErrorMessage name="date" />

                <StyledFormLabelWithHelperText>
                  {t("form.event_details.date_helperText")}
                </StyledFormLabelWithHelperText>
              </FormControl>
              <FormControl>
                <StyledFormLabel>
                  {t("form.event_details.end_date")}
                </StyledFormLabel>
                <FormInput
                  name="end_date"
                  label="Date"
                  type="datetime-local"
                  placeholder=""
                  required={false}
                />
                <StyledErrorMessage name="end_date" />

                <StyledFormLabelWithHelperText>
                  {t("form.event_details.end_date_helperText")}
                </StyledFormLabelWithHelperText>
              </FormControl>
            </Stack>
            <Divider />
            <FormControl>
              <FormLabel>
                <StyledFormLabel>
                  {t("form.event_details.location")}*
                </StyledFormLabel>
              </FormLabel>
              <FormGooglePlacesAutocomplete name="location" />
              <StyledErrorMessage name="location" />

              <StyledFormLabelWithHelperText>
                {t("form.event_details.location_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider />
            <FormControl>
              <StyledFormLabel>{t("form.event_details.team")}*</StyledFormLabel>
              <Field name="organization_id">
                {({ field, form }: any) => {
                  return (
                    <Select
                      {...field}
                      onChange={(_, newValue) => {
                        form.setFieldValue(field.name, newValue as number);
                      }}
                      style={DefaultInputStyle}
                    >
                      {organizations?.map((org) => {
                        return (
                          <Option key={org.id} value={org.id}>
                            {org.name}
                          </Option>
                        );
                      })}
                    </Select>
                  );
                }}
              </Field>
              <StyledErrorMessage name="organization_id" />
              <StyledFormLabelWithHelperText>
                {t("form.event_details.team_helperText") + " "}
                <Link href="/organizations/create">here</Link>.
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider />

            <FormControl>
              <StyledFormLabel>
                {t("form.event_details.private_event")}
              </StyledFormLabel>
              <FormCheckbox name="is_private" label="Is Private" />
              <StyledErrorMessage name="is_private" />

              <StyledFormLabelWithHelperText>
                {t("form.event_details.private_event_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Grid
              container
              flexDirection="row"
              justifyContent="flex-start"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Grid>
                <StyledButton
                  color={PALLETTE.charcoal}
                  bgColor={PALLETTE.cerise}
                  textColor={PALLETTE.charcoal}
                  size="md"
                  disabled={!isValid}
                  type="submit"
                  style={{
                    width: "150px",
                  }}
                >
                  {t("form.button_next")}
                </StyledButton>
              </Grid>
              <Grid>
                <StyledButton
                  color={PALLETTE.cerise}
                  textColor={PALLETTE.charcoal}
                  size="md"
                  onClick={() => {
                    dispatch(clearEventForm());
                    // window.location.reload();
                  }}
                >
                  {t("form.button_clear")}
                </StyledButton>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateEventForm;
