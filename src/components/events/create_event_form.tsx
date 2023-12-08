import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
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
  FormCheckbox,
  FormGooglePlacesAutocomplete,
  FormInput,
  FormTextarea,
} from "../forms/input_types";
import CreateEventFormSchema from "../../validation/create_event_form";
import StyledText from "../text/styled_text";
import { StyledErrorMessage } from "../forms/messages";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationsRequest } from "../../redux/features/organizationSlice";
import LoadingOverlay from "../Loading";
import { EventFormInitialValues, IEventForm } from "../../types";
import {
  clearEventForm,
  nextStep,
  setEventForm,
} from "../../redux/features/eventCreationSlice";

export type PlaceOption = {
  label: string;
  value?: any; // Include other properties if needed
};

const CreateEventForm: React.FC = () => {
  const { organizations, loading } = useSelector(
    (state: RootState) => state.organization
  );

  const {
    form: { event: initialValues },
    loading: initalLoading,
  } = useSelector((state: RootState) => state.eventCreation);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganizationsRequest());
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
      onSubmit={(values: IEventForm) => {
        // Convert date to Unix timestamp
        handleSubmission(values);
      }}
    >
      {({ values, isValid }) => {
        console.log("valid", !isValid);
        return (
          <Form>
            <FormControl>
              <StyledFormLabel>Name*</StyledFormLabel>
              <FormInput name="name" label="Name" placeholder="Party Rangers" />
              <StyledErrorMessage name="name" />

              <StyledFormLabelWithHelperText>
                What is the name of your event?
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider />
            <FormControl>
              <StyledFormLabel>Description*</StyledFormLabel>

              <FormTextarea
                name="description"
                label="Description"
                placeholder="Party Rangers is a party for rangers."
              />
              <StyledErrorMessage name="description" />

              <StyledFormLabelWithHelperText>
                What is your event about? What should people expect?
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider />
            <FormControl>
              <StyledFormLabel>Date*</StyledFormLabel>
              <FormInput
                name="date"
                label="Date"
                type="datetime-local"
                placeholder=""
              />
              <StyledErrorMessage name="date" />

              <StyledFormLabelWithHelperText>
                When is your event?
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Divider />
            <FormControl>
              <FormLabel>Location*</FormLabel>
              <FormGooglePlacesAutocomplete name="location" />
              <StyledErrorMessage name="location" />

              <StyledFormLabelWithHelperText>
                Where is your event?
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider />
            <FormControl>
              <StyledFormLabel>Organization*</StyledFormLabel>
              <Field name="organization_id">
                {({ field, form }: any) => {
                  return (
                    <Select
                      {...field}
                      onChange={(_, newValue) => {
                        form.setFieldValue(field.name, newValue as number);
                      }}
                      style={{
                        width: "200px",
                        borderColor: PALLETTE.cerise,
                        backgroundColor: PALLETTE.offWhite,
                      }}
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
                Which organization is hosting your event?
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider />

            <FormControl>
              <StyledFormLabel>Private Event</StyledFormLabel>
              <FormCheckbox name="is_private" label="Is Private" />
              <StyledErrorMessage name="is_private" />

              <StyledFormLabelWithHelperText>
                Is your event private?
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <StyledButton
                color={PALLETTE.charcoal}
                bgColor={PALLETTE.cerise}
                textColor={PALLETTE.charcoal}
                size="md"
                disabled={!isValid}
                type="submit"
                style={{
                  marginTop: "20px",
                  width: "200px",
                }}
              >
                Next
              </StyledButton>
              <StyledButton
                color={PALLETTE.cerise}
                textColor={PALLETTE.charcoal}
                size="md"
                onClick={() => {
                  dispatch(clearEventForm());
                  window.location.reload();
                }}
                style={{
                  marginTop: "20px",
                  width: "100px",
                }}
              >
                Clear
              </StyledButton>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateEventForm;
