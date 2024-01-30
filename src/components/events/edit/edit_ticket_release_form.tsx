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
  ITicketRelease,
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
import { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import EditTicketReleaseFormSchema from "../../../validation/edit_ticket_release_form";
import { updateTicketReleaseStart } from "../../../redux/features/ticketReleaseSlice";

interface EditTicketReleaseFormProps {
  ticketRelease: ITicketRelease | undefined;
  event_date: number;
}

const EditTicketReleaseForm: React.FC<EditTicketReleaseFormProps> = ({
  ticketRelease,
  event_date,
}) => {
  const { ticketReleaseMethods } = useSelector(
    (state: RootState) => state.ticketReleaseMethods
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Fetch ticket release methods
    dispatch(getTicketReleaseMethodsRequest());
  }, [dispatch]);

  const handleSubmission = async (
    values: ITicketReleaseForm,
    { validateForm }: FormikHelpers<ITicketReleaseForm>
  ) => {
    const errors = await validateForm(values);
    if (Object.keys(errors).length === 0) {
      // The form is valid
      // dispatch(setTicketReleaseForm(values));
      dispatch(
        updateTicketReleaseStart({
          eventId: ticketRelease!.eventId,
          ticketReleaseId: ticketRelease!.id,
          formData: values,
        })
      );
    } else {
      // The form is invalid
      toast.error("Please fix the errors in the form.");
    }
  };
  const { t } = useTranslation();

  const [initialValues, setInitialValues] = useState<ITicketReleaseForm>(
    TicketReleaseFormInitialValues
  );
  const [initValueSet, setInitValueSet] = useState<boolean>(false);

  useEffect(() => {
    if (ticketRelease) {
      setInitialValues({
        name: ticketRelease.name,
        description: ticketRelease.description,
        event_date: format(new Date(event_date), "yyyy-MM-dd'T'HH:mm"),
        open: format(new Date(ticketRelease.open), "yyyy-MM-dd'T'HH:mm"),
        close: format(new Date(ticketRelease.close), "yyyy-MM-dd'T'HH:mm"),
        ticket_release_method_id: ticketRelease.ticketReleaseMethodDetailId!,
        open_window_duration:
          ticketRelease.ticketReleaseMethodDetail.openWindowDuration!,
        max_tickets_per_user:
          ticketRelease.ticketReleaseMethodDetail.maxTicketsPerUser,
        notification_method:
          ticketRelease.ticketReleaseMethodDetail.notificationMethod,
        cancellation_policy:
          ticketRelease.ticketReleaseMethodDetail.cancellationPolicy,
        is_reserved: ticketRelease.is_reserved!,
        promo_code: ticketRelease.promo_code,
        tickets_available: ticketRelease.tickets_available!,
      });
      setInitValueSet(true);
    }
  }, [ticketRelease, event_date]);

  if (!ticketRelease || !initValueSet) {
    return (
      <StyledText level="body-sm" color={PALLETTE.charcoal}>
        {t("manage_event.edit.ticket_releases.add_helperText")}
      </StyledText>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EditTicketReleaseFormSchema}
      validateOnBlur={true}
      validateOnChange={true}
      validateOnMount={true}
      onSubmit={handleSubmission}
      enableReinitialize
    >
      {({ values, isValid, errors }) => {
        return (
          <Form>
            <Grid container columns={16} spacing={2}>
              <Grid xs={16} sm={8}>
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
                  />
                  <StyledErrorMessage name="description" />

                  <StyledFormLabelWithHelperText>
                    {t("form.ticket_release.description_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

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
              </Grid>
              <Grid xs={16} sm={8}>
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
                  />
                  <StyledErrorMessage name="max_tickets_per_user" />
                  <StyledFormLabelWithHelperText>
                    {t("form.ticket_release.max_tickets_per_user_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>

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

                {/* Notification Method */}
                <FormControl>
                  <StyledFormLabel>
                    {t("form.ticket_release.notification_method")}* *
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
                    {t("form.ticket_release.cancellation_policy")}* *
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

                {/* Reserved Ticket Release */}
                <FormControl>
                  <StyledFormLabel>
                    {t("form.ticket_release.reserved_ticket_release")}*
                  </StyledFormLabel>
                  <FormCheckbox name="is_reserved" label="Is Reserved" />
                  <StyledErrorMessage name="is_reserved" />

                  <StyledFormLabelWithHelperText>
                    {t(
                      "form.ticket_release.reserved_ticket_release_helperText"
                    )}
                  </StyledFormLabelWithHelperText>
                </FormControl>

                {values && values.is_reserved && (
                  <FormControl>
                    <StyledFormLabel>
                      {t("form.ticket_release.promo_code")}*
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
                  disabled={!isValid}
                  size="md"
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

export default EditTicketReleaseForm;
