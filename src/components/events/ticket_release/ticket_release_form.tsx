import React, { useEffect, useMemo, useState } from "react";
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
  Box,
  List,
  ListItem,
} from "@mui/joy";
import {
  TicketReleaseFormInitialValues,
  ITicketReleaseForm,
  IDeadlineUnits,
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
import { getTicketReleaseMethodsRequest } from "../../../redux/features/ticketReleaseMethodsSlice";
import PALLETTE from "../../../theme/pallette";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StyledText from "../../text/styled_text";
import StyledButton from "../../buttons/styled_button";
import CreateTicketReleaseFormSchema from "../../../validation/event/create_ticket_release_form";
import { format, addHours, addWeeks } from "date-fns";
import LoadingOverlay from "../../Loading";
import { useTranslation } from "react-i18next";
import { useEventDetails } from "../../../hooks/event/use_event_details_hook";
import { useParams } from "react-router-dom";
import { canEditPaymentDeadline } from "../../../utils/manage_event/can_edit_payment_deadline";
import { getDurationUnits } from "../../../utils/date_conversions";

interface CreateTicketReleaseFormProps {
  submit: (
    values: ITicketReleaseForm,
    { validateForm }: FormikHelpers<ITicketReleaseForm>
  ) => void;
  initialValues: ITicketReleaseForm;
  createOnSubmit?: boolean;
  fromTemplate?: boolean;
}

const CreateTicketReleaseForm: React.FC<CreateTicketReleaseFormProps> = ({
  submit,
  initialValues = TicketReleaseFormInitialValues,
  createOnSubmit = false,
  fromTemplate = false,
}) => {
  const { eventID } = useParams();
  const { ticketReleaseMethods } = useSelector(
    (state: RootState) => state.ticketReleaseMethods
  );
  const { t } = useTranslation();

  const {
    loading: initialLoading,
    form: { event: eventCreation },
  } = useSelector((state: RootState) => state.eventCreation);

  const [reservePaymentDuration, setReservePaymentDuration] =
    useState<IDeadlineUnits>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  // Get event details
  const {
    eventDetail: { event },
  } = useEventDetails(parseInt(eventID!));

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Fetch ticket release methods
    dispatch(getTicketReleaseMethodsRequest());
  }, [dispatch]);

  const eventDate = !!event
    ? new Date(event?.date!)
    : new Date(eventCreation.date);

  const open =
    !initialValues.is_saved && !fromTemplate
      ? format(addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm")
      : initialValues.open;

  const close =
    !initialValues.is_saved && !fromTemplate
      ? format(addWeeks(addHours(new Date(), 1), 1), "yyyy-MM-dd'T'HH:mm")
      : initialValues.close;

  if (initialLoading) {
    return <LoadingOverlay />;
  }

  /**
   * Payment deadline is set 75 % of the way between the open and event.date
   * Allocation cut of is set 90% of the way between the open and event.date
   */

  return (
    <Formik
      initialValues={{
        ...initialValues,
        open,
        close,
      }}
      validationSchema={CreateTicketReleaseFormSchema}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      onSubmit={submit}
      enableReinitialize={false}
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
              <StyledFormLabel>
                {t("form.ticket_release.name")}*
              </StyledFormLabel>
              <FormInput
                name="name"
                label="Name"
                placeholder="Normal Tickets"
                overrideStyle={{
                  width: "50%",
                }}
              />
              <StyledErrorMessage name="name" />

              <StyledFormLabelWithHelperText>
                {t("form.ticket_release.name_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            {/* Description */}
            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.description")}*
              </StyledFormLabel>
              <FormTextarea
                name="description"
                label="Description"
                placeholder="Normal tickets for Party Rangers."
                minRows={2}
                overrideStyle={{
                  width: "95%",
                }}
                maxChars={500}
              />
              <StyledErrorMessage name="description" />

              <StyledFormLabelWithHelperText>
                {t("form.ticket_release.description_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Open */}
            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.available_at")}*
              </StyledFormLabel>
              <FormInput
                name="open"
                label="Open"
                type="datetime-local"
                placeholder="Normal tickets for Party Rangers."
              />
              <StyledErrorMessage name="open" />

              <StyledFormLabelWithHelperText>
                {t("form.ticket_release.available_at_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            {/* Close */}
            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.closes_at")}*
              </StyledFormLabel>
              <FormInput
                name="close"
                label="Close"
                type="datetime-local"
                placeholder="Normal tickets for Party Rangers."
              />
              <StyledErrorMessage name="close" />
              <StyledFormLabelWithHelperText>
                {t("form.ticket_release.closes_at_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Ticket Release Method ID */}
            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.ticket_release_method")}*
              </StyledFormLabel>
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

                              <Tooltip
                                title={trm.description}
                                style={{
                                  width: "300px",
                                }}
                              >
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
                {t("form.ticket_release.ticket_release_method_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            {/* Open Window Duration */}
            {values && values.ticket_release_method_id === 1 && (
              <FormControl>
                <StyledFormLabel>
                  {t("form.ticket_release.lottery_duration")}*
                </StyledFormLabel>
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
                  {t("form.ticket_release.lottery_duration_helperText")}
                </StyledFormLabelWithHelperText>
              </FormControl>
            )}

            {/* Selected Method requires a brief description */}
            {values && values.ticket_release_method_id === 4 && (
              <FormControl>
                <StyledFormLabel>
                  {t("form.ticket_release.selective_description")}*
                </StyledFormLabel>
                <FormTextarea
                  name="method_description"
                  label="Description"
                  placeholder="Only for members of the Party Rangers."
                  minRows={2}
                  overrideStyle={{
                    width: "95%",
                  }}
                />
                <StyledErrorMessage name="method_description" />

                <StyledFormLabelWithHelperText>
                  {t("form.ticket_release.selective_description_helperText")}
                </StyledFormLabelWithHelperText>
              </FormControl>
            )}

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Max Tickets Per User */}
            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.max_tickets_per_user")}*
              </StyledFormLabel>

              <FormInput
                type="number"
                name="max_tickets_per_user"
                label="Max Tickets Per User"
                placeholder=""
                readOnly={true}
              />
              <StyledErrorMessage name="max_tickets_per_user" />
              <StyledFormLabelWithHelperText>
                {t("form.ticket_release.max_tickets_per_user_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            {/* Ticket Quantity */}
            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.tickets_available")}*
              </StyledFormLabel>
              <FormInput
                type="number"
                name="tickets_available"
                label="Quantity"
                placeholder=""
              />
              <StyledErrorMessage name="tickets_available" />

              <StyledFormLabelWithHelperText>
                {t("form.ticket_release.tickets_available_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Notification Method */}
            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.notification_method")}*
              </StyledFormLabel>
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
                {t("form.ticket_release.notification_method_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.cancellation_policy")}*
              </StyledFormLabel>
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
                {t("form.ticket_release.cancellation_policy_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Reserved Ticket Release */}

            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.reserved_ticket_release")}
              </StyledFormLabel>
              <FormCheckbox name="is_reserved" label="Is Reserved" />
              <StyledErrorMessage name="is_reserved" />

              <StyledFormLabelWithHelperText>
                {t("form.ticket_release.reserved_ticket_release_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            {values && values.is_reserved && (
              <FormControl>
                <StyledFormLabel>
                  {t("form.ticket_release.promo_code")}
                </StyledFormLabel>
                <FormInput
                  name="promo_code"
                  label="Promo Code"
                  placeholder="PARTY2023"
                />
                <StyledErrorMessage name="promo_code" />

                <StyledFormLabelWithHelperText>
                  {t("form.ticket_release.promo_code_helperText")}
                </StyledFormLabelWithHelperText>
              </FormControl>
            )}
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            {/* Payment Deadline */}

            {canEditPaymentDeadline(
              ticketReleaseMethods?.find(
                (trm) => trm.id === values.ticket_release_method_id
              )
            ) && (
              <>
                <FormControl>
                  <StyledFormLabel>
                    {t("form.ticket_release.payment_deadline")}
                  </StyledFormLabel>
                  <FormInput
                    placeholder="Enter date and time"
                    name="payment_deadline"
                    label="Payment Deadline"
                    type="date"
                    required={false}
                  />
                  <StyledErrorMessage name="payment_deadline" />
                  <StyledFormLabelWithHelperText>
                    {t("form.ticket_release.payment_deadline_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

                {/* Reserve Payment Duration */}

                <FormControl>
                  <StyledFormLabel>
                    {t("form.ticket_release.reserve_payment_duration")}
                  </StyledFormLabel>
                  <FormInput
                    placeholder="7d 12h"
                    name="reserve_payment_duration"
                    label="Reserve Payment Duration"
                    required={false}
                    afterChange={(e) => {
                      setReservePaymentDuration(
                        getDurationUnits(e.target.value)
                      );
                    }}
                  />
                  <StyledErrorMessage name="reserve_payment_duration" />
                  <StyledFormLabelWithHelperText>
                    {t(
                      "form.ticket_release.reserve_payment_duration_helperText"
                    )}
                  </StyledFormLabelWithHelperText>
                  <StyledText
                    level="body-md"
                    fontWeight={500}
                    color={PALLETTE.charcoal_see_through}
                    fontSize={16}
                  >
                    {t("manage_event.reserve_payment_duration_text", {
                      ...reservePaymentDuration,
                    }).toString()}{" "}
                  </StyledText>
                </FormControl>

                {/* Allocation Cut Off */}

                <FormControl>
                  <StyledFormLabel>
                    {t("form.ticket_release.allocation_cut_off")}
                  </StyledFormLabel>
                  <FormInput
                    placeholder="Enter date and time"
                    name="allocation_cut_off"
                    label="Allocation Cut Off"
                    type="date"
                    required={false}
                  />
                  <StyledErrorMessage name="allocation_cut_off" />
                  <StyledFormLabelWithHelperText>
                    {t("form.ticket_release.allocation_cut_off_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

                <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
              </>
            )}

            <FormControl>
              <StyledFormLabel>
                {t("form.ticket_release.save_template")}
              </StyledFormLabel>
              <FormCheckbox name="save_template" label="Save as a template" />
              <StyledFormLabelWithHelperText>
                {t("form.ticket_release.save_template_helperText")}
              </StyledFormLabelWithHelperText>
            </FormControl>

            <Box>
              {/* Display errors */}
              <List component="ol" marker="disc">
                {Object.values(errors).map((error, index) => (
                  <ListItem key={index}>
                    <StyledText
                      level="body-sm"
                      color={PALLETTE.red}
                      fontSize={15}
                    >
                      {error}
                    </StyledText>
                  </ListItem>
                ))}
              </List>
            </Box>

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
                  {createOnSubmit
                    ? t("form.button_create")
                    : t("form.button_next")}
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
