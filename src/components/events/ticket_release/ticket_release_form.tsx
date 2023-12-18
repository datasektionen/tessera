import { Formik, Form, Field, useFormikContext, FormikHelpers } from "formik";
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
} from "../../../types";
import { StyledErrorMessage } from "../../forms/messages";
import {
  DefaultInputStyle,
  FormCheckbox,
  FormInput,
  FormTextarea,
} from "../../forms/input_types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../forms/form_labels";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useEffect } from "react";
import { getTicketReleaseMethodsRequest } from "../../../redux/features/ticketReleaseMethodsSlice";
import PALLETTE from "../../../theme/pallette";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StyledText from "../../text/styled_text";
import StyledButton from "../../buttons/styled_button";
import {
  clearEventForm,
  clearTicketReleaseForm,
  setTicketReleaseForm,
} from "../../../redux/features/eventCreationSlice";
import CreateTicketReleaseFormSchema from "../../../validation/create_ticket_release_form";
import { format } from "date-fns";
import { toast } from "react-toastify";
import LoadingOverlay from "../../Loading";

interface CreateTicketReleaseFormProps {
  submit: (
    values: ITicketReleaseForm,
    { validateForm }: FormikHelpers<ITicketReleaseForm>
  ) => void;
  initialValues: ITicketReleaseForm;
  createOnSubmit?: boolean;
}

const CreateTicketReleaseForm: React.FC<CreateTicketReleaseFormProps> = ({
  submit,
  initialValues = TicketReleaseFormInitialValues,
  createOnSubmit = false,
}) => {
  const { ticketReleaseMethods } = useSelector(
    (state: RootState) => state.ticketReleaseMethods
  );

  const { loading: initalLoading } = useSelector(
    (state: RootState) => state.eventCreation
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Fetch ticket release methods
    dispatch(getTicketReleaseMethodsRequest());
  }, [dispatch]);

  if (initalLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateTicketReleaseFormSchema}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      onSubmit={submit}
    >
      {({ values, isValid, errors }) => {
        console.log(values.event_date);
        return (
          <Form>
            <FormControl>
              <FormInput
                name="event_date"
                label="event_date"
                placeholder=""
                type="hidden"
                overrideStyle={{ display: "none" }}
              />
            </FormControl>

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
              <StyledErrorMessage name="open" />

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
                        ...DefaultInputStyle,
                        width: "350px",
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
              <StyledErrorMessage name="ticket_release_method_id" />
              <StyledFormLabelWithHelperText>
                What method are you using to release tickets?
              </StyledFormLabelWithHelperText>
            </FormControl>

            {/* Open Window Duration */}
            {values && values.ticket_release_method_id === 1 && (
              <FormControl>
                <StyledFormLabel>Lottery Duration (minutes)*</StyledFormLabel>
                <FormInput
                  type="number"
                  name="open_window_duration"
                  label="Open Window Duration"
                  placeholder=""
                />
                <StyledErrorMessage name="open_window_duration" />

                {values && values.open_window_duration ? (
                  <StyledText level="body-sm" color={PALLETTE.charcoal}>
                    The lottery window will be open from{" "}
                    <b>
                      {format(new Date(values.open), "dd/MM/yyyy HH:mm:ss")}
                    </b>{" "}
                    to{" "}
                    <b>
                      {format(
                        new Date(values.open).getTime() +
                          values.open_window_duration * 60 * 1000,
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </b>
                  </StyledText>
                ) : null}

                <StyledFormLabelWithHelperText>
                  For First Come First Serve, the lottery duration defines
                  within how many minutes, requested tickets will be entered
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
                      style={DefaultInputStyle}
                    >
                      <Option key={1} value={"EMAIL"}>
                        Email
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

            <FormControl>
              <StyledFormLabel>Cancellation Policy*</StyledFormLabel>
              <Field name="cancellation_policy">
                {({ field, form }: any) => {
                  return (
                    <Select
                      {...field}
                      onChange={(_, newValue) => {
                        form.setFieldValue(field.name, newValue as string);
                      }}
                      style={DefaultInputStyle}
                    >
                      <Option key={1} value={"NO_REFUND"}>
                        No refund
                      </Option>
                      <Option key={2} value={"FULL_REFUND"}>
                        Full refund
                      </Option>
                    </Select>
                  );
                }}
              </Field>
              <StyledErrorMessage name="cancellation_policy" />
              <StyledFormLabelWithHelperText>
                What is your cancellation policy?
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            <FormControl>
              <StyledFormLabel>Reserved Ticket Release</StyledFormLabel>
              <FormCheckbox name="is_reserved" label="Is Reserved" />
              <StyledErrorMessage name="is_reserved" />

              <StyledFormLabelWithHelperText>
                A reserved ticket release contains tickets that are reserved for
                specific users. A promo code is required to access this ticket.
                Remember that you can add more ticket releases later.
              </StyledFormLabelWithHelperText>
            </FormControl>

            {values && values.is_reserved && (
              <FormControl>
                <StyledFormLabel>Promo Code*</StyledFormLabel>
                <FormInput
                  name="promo_code"
                  label="Promo Code"
                  placeholder="PARTY2023"
                />
                <StyledErrorMessage name="promo_code" />

                <StyledFormLabelWithHelperText>
                  What is the promo code for this ticket release?
                </StyledFormLabelWithHelperText>
              </FormControl>
            )}

            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid>
                <StyledButton
                  bgColor={PALLETTE.cerise}
                  textColor={PALLETTE.cerise}
                  size="md"
                  disabled={!isValid}
                  type="submit"
                  style={{
                    marginTop: "20px",
                    width: "200px",
                  }}
                >
                  {createOnSubmit ? "Create" : "Next"}
                </StyledButton>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateTicketReleaseForm;
