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
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values: IEventForm) => {
        // Convert date to Unix timestamp
        handleSubmission(values);
      }}
    >
      {({ values, isValid, errors }) => {
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
              <StyledFormLabel>Team*</StyledFormLabel>
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
                Which team is hosting your event? You need to tie the event to a
                team. If your not a part of a team, you can create one{" "}
                <Link href="/organizations/create">here</Link>.
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
                  Next
                </StyledButton>
              </Grid>
              <Grid>
                <StyledButton
                  color={PALLETTE.cerise}
                  textColor={PALLETTE.charcoal}
                  size="md"
                  onClick={() => {
                    console.log("clear");
                    dispatch(clearEventForm());
                    // window.location.reload();
                  }}
                >
                  Clear
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
