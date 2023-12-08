import { Formik, Form, Field, useFormikContext } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Textarea,
  Divider,
  Tooltip,
  Grid,
  Stack,
} from "@mui/joy";
import {
  TicketReleaseFormInitialValues,
  ITicketReleaseForm,
} from "../../types";
import { StyledErrorMessage } from "../forms/messages";
import { FormInput, FormTextarea } from "../forms/input_types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../forms/form_labels";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { getTicketReleaseMethodsRequest } from "../../redux/features/ticketReleaseMethodsSlice";
import PALLETTE from "../../theme/pallette";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StyledText from "../text/styled_text";
import StyledButton from "../buttons/styled_button";
import {
  clearEventForm,
  clearTicketReleaseForm,
  setTicketReleaseForm,
} from "../../redux/features/eventCreationSlice";
import CreateTicketReleaseFormSchema from "../../validation/create_ticket_release_form";

const CreateTicketReleaseForm: React.FC = () => {
  const { ticketReleaseMethods } = useSelector(
    (state: RootState) => state.ticketReleaseMethods
  );

  const {
    form: { ticketRelease: initialValues },
    loading: initalLoading,
  } = useSelector((state: RootState) => state.eventCreation);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Fetch ticket release methods
    dispatch(getTicketReleaseMethodsRequest());
  }, [dispatch]);

  const handleSubmission = (values: ITicketReleaseForm) => {
    // Handle form submission
    dispatch(setTicketReleaseForm(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateTicketReleaseFormSchema}
      onSubmit={handleSubmission}
    >
      {({ values, isValid, errors }) => {
        return (
          <Form>
            {/* Name */}
            <FormControl>
              <StyledFormLabel>Name*</StyledFormLabel>
              <FormInput
                name="name"
                label="Name"
                placeholder="Normal Tickets"
              />
              <StyledErrorMessage name="name" />

              <StyledFormLabelWithHelperText>
                What is the name of this ticket release?
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Description */}
            <FormControl>
              <StyledFormLabel>Description*</StyledFormLabel>
              <FormTextarea
                name="description"
                label="Description"
                placeholder="Normal tickets for Party Rangers."
              />
              <StyledErrorMessage name="description" />

              <StyledFormLabelWithHelperText>
                What types of tickets are you releasing?
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Open */}
            <FormControl>
              <StyledFormLabel>Available at*</StyledFormLabel>
              <FormInput
                name="open"
                label="Open"
                type="datetime-local"
                placeholder="Normal tickets for Party Rangers."
              />
              <StyledErrorMessage name="name" />

              <StyledFormLabelWithHelperText>
                When do the tickets become available?
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Close */}
            <FormControl>
              <StyledFormLabel>Closes at*</StyledFormLabel>
              <FormInput
                name="close"
                label="Close"
                type="datetime-local"
                placeholder="Normal tickets for Party Rangers."
              />
              <StyledErrorMessage name="close" />
              <StyledFormLabelWithHelperText>
                When do the tickets stop being available?
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Ticket Release Method ID */}
            <FormControl>
              <StyledFormLabel>Ticket Release Method*</StyledFormLabel>
              <Field name="ticket_release_method_id">
                {({ field, form }: any) => {
                  return (
                    <Select
                      {...field}
                      onChange={(_, newValue) => {
                        form.setFieldValue(field.name, newValue as number);
                      }}
                      style={{
                        width: "350px",
                        borderColor: PALLETTE.cerise,
                        backgroundColor: PALLETTE.offWhite,
                      }}
                    >
                      {ticketReleaseMethods?.map((trm) => {
                        return (
                          <Option
                            key={trm.id}
                            value={trm.id}
                            title={trm.description}
                          >
                            <Grid
                              container
                              justifyContent={"space-between"}
                              flexDirection={"row"}
                            >
                              <StyledText
                                level="body-sm"
                                color={PALLETTE.charcoal}
                              >
                                {trm.name}
                              </StyledText>
                              <Tooltip title={trm.description}>
                                <HelpOutlineIcon
                                  style={{
                                    marginLeft: "5px",
                                    color: PALLETTE.charcoal,
                                  }}
                                />
                              </Tooltip>
                            </Grid>
                          </Option>
                        );
                      })}
                    </Select>
                  );
                }}
              </Field>
              <StyledErrorMessage name="organization_id" />
              <StyledFormLabelWithHelperText>
                What method are you using to release tickets?
              </StyledFormLabelWithHelperText>
            </FormControl>

            {/* Open Window Duration */}
            {values && values.ticket_release_method_id === 1 && (
              <FormControl>
                <StyledFormLabel>Lottery Duration (seconds)*</StyledFormLabel>
                <FormInput
                  type="number"
                  name="open_window_duration"
                  label="Open Window Duration"
                  placeholder=""
                />
                <StyledErrorMessage name="open_window_duration" />
                {errors.open && (
                  <StyledText
                    level="body-sm"
                    color={PALLETTE.red}
                    fontSize={12}
                  >
                    {errors.open}
                  </StyledText>
                )}

                <StyledFormLabelWithHelperText>
                  For First Come First Serve, the lottery duration defines
                  within how many seconds, requested tickets will be entered
                  into a lottery. If more tickets are requested than available,
                  all participants that request tickets within this timeframe
                  will be entered into a lottery, the rest will be reserves.
                </StyledFormLabelWithHelperText>
              </FormControl>
            )}

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Max Tickets Per User */}
            <FormControl>
              <StyledFormLabel>Max Tickets Per User*</StyledFormLabel>

              <FormInput
                type="number"
                name="max_tickets_per_user"
                label="Max Tickets Per User"
                placeholder=""
              />
              <StyledErrorMessage name="max_tickets_per_user" />
              <StyledFormLabelWithHelperText>
                How many tickets can a user request?
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Notification Method */}
            <FormControl>
              <StyledFormLabel>Notification Method*</StyledFormLabel>
              <Field name="notification_method">
                {({ field, form }: any) => {
                  return (
                    <Select
                      {...field}
                      onChange={(_, newValue) => {
                        form.setFieldValue(field.name, newValue as string);
                      }}
                      style={{
                        width: "200px",
                        borderColor: PALLETTE.cerise,
                        backgroundColor: PALLETTE.offWhite,
                      }}
                    >
                      <Option key={1} value={"email"}>
                        Email
                      </Option>
                      <Option key={2} value={"sms"}>
                        SMS
                      </Option>
                    </Select>
                  );
                }}
              </Field>
              <StyledErrorMessage name="notification_method" />
              <StyledFormLabelWithHelperText>
                How would you like to notify users?
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
                  dispatch(clearTicketReleaseForm());
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

export default CreateTicketReleaseForm;
