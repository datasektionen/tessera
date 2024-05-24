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
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrganizationsRequest } from "../../../redux/features/organizationSlice";
import { useEffect, useState } from "react";
import { EventFormInitialValues, IEvent, IEventForm } from "../../../types";
import {
  clearEventForm,
  setEventForm,
} from "../../../redux/features/eventCreationSlice";
import LoadingOverlay from "../../Loading";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../forms/form_labels";
import {
  DefaultInputStyle,
  FormCheckbox,
  FormGooglePlacesAutocomplete,
  FormInput,
  FormTextarea,
} from "../../forms/input_types";
import { StyledErrorMessage } from "../../forms/messages";
import StyledButton from "../../buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import { format } from "date-fns";
import CreateEventFormSchema from "../../../validation/create_event_form";
import { editEventRequest } from "../../../redux/features/editEventSlice";
import { Trans, useTranslation } from "react-i18next";

interface EditEventFormProps {
  event: IEvent;
}

const EditEventForm: React.FC<EditEventFormProps> = ({ event }) => {
  const { organizations, loading } = useSelector(
    (state: RootState) => state.organization
  );

  const dispatch: AppDispatch = useDispatch();

  const [initialValues, setInitialValues] = useState<IEventForm>(
    EventFormInitialValues
  );
  const [initValueSet, setInitValueSet] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getMyOrganizationsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      setInitialValues({
        name: event.name,
        description: event.description,
        date: format(new Date(event.date), "yyyy-MM-dd'T'HH:mm"),
        end_date: event.end_date
          ? format(new Date(event.end_date), "yyyy-MM-dd'T'HH:mm")
          : "",
        location: {
          label: event.location,
          value: event.location,
        },
        organization_id: event.organizationId,
        is_private: event.is_private,
        collect_food_preferences: event.collect_food_preferences || false,
      });
      setInitValueSet(true);
    }
  }, [event]);

  const handleSubmission = (values: IEventForm) => {
    // Convert date to Unix timestamp
    dispatch(
      editEventRequest({
        id: event.id,
        event: values,
      })
    );
  };

  if (loading || !initValueSet) {
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
    >
      {({ values, isValid, errors, setFieldValue }) => {
        return (
          <Form>
            <Grid
              container
              columns={16}
              flexDirection="row"
              justifyContent="flex-start"
              spacing={2}
            >
              <Grid xs={16} sm={8}>
                <FormControl>
                  <StyledFormLabel>
                    {t("form.event_details.name")}*
                  </StyledFormLabel>
                  <FormInput
                    name="name"
                    label="Name"
                    placeholder="Party Rangers"
                    overrideStyle={{
                      width: "50%",
                    }}
                  />
                  <StyledErrorMessage name="name" />

                  <StyledFormLabelWithHelperText>
                    {t("form.event_details.name_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

                <FormControl>
                  <StyledFormLabel>
                    {t("form.event_details.description")}*
                  </StyledFormLabel>

                  <FormTextarea
                    name="description"
                    label="Description"
                    placeholder="Party Rangers is a party for rangers."
                    overrideStyle={{
                      width: "95%",
                    }}
                    maxChars={10000}
                  />
                  <StyledErrorMessage name="description" />

                  <StyledFormLabelWithHelperText>
                    {t("form.event_details.description_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

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
                    <StyledErrorMessage name="date" />

                    <StyledFormLabelWithHelperText>
                      {t("form.event_details.end_date_helperText")}
                    </StyledFormLabelWithHelperText>
                  </FormControl>
                </Stack>
              </Grid>

              <Grid xs={16} sm={8}>
                <FormControl>
                  <StyledFormLabel>
                    {t("form.event_details.location")}*
                  </StyledFormLabel>
                  <FormGooglePlacesAutocomplete name="location" />
                  <StyledErrorMessage name="location" />

                  <StyledFormLabelWithHelperText>
                    {t("form.event_details.location_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

                <FormControl>
                  <StyledFormLabel>
                    {t("form.event_details.team")}*
                  </StyledFormLabel>
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
                    {t("form.event_details.team_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

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
                <FormControl>
                  <StyledFormLabel>
                    {t("form.event_details.collect_food_preferences")}
                  </StyledFormLabel>
                  <FormCheckbox
                    name="collect_food_preferences"
                    label="Collect Food Preferences"
                  />
                  <StyledErrorMessage name="collect_food_preferences" />

                  <StyledFormLabelWithHelperText>
                    {t(
                      "form.event_details.collect_food_preferences_helperText"
                    )}
                  </StyledFormLabelWithHelperText>
                </FormControl>
              </Grid>
            </Grid>

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
                  bgColor={PALLETTE.green}
                  textColor={PALLETTE.charcoal}
                  size="md"
                  disabled={!isValid}
                  type="submit"
                  style={{
                    width: "150px",
                  }}
                >
                  {t("form.button_save")}
                </StyledButton>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditEventForm;
