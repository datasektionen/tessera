import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  FormControl,
  Grid,
  Input,
  ListDivider,
  MenuItem,
  Option,
  Select,
  Stack,
  Switch,
  TextField,
  Textarea,
} from "@mui/joy";
import Title from "../../../components/text/title";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../../components/Loading";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import { useEventAccess } from "../../../components/events/use_event_access";
import StyledText from "../../../components/text/styled_text";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import PALLETTE from "../../../theme/pallette";
import {
  DefaultInputStyle,
  FormInput,
  FormTextarea,
} from "../../../components/forms/input_types";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../components/forms/form_labels";
import { Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { fetchEventTicketsStart } from "../../../redux/features/eventTicketsSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel } from "@mui/material";
import { ITicket, IUser } from "../../../types";
import StyledButton from "../../../components/buttons/styled_button";
import axios from "axios";
import { toast } from "react-toastify";
import { StyledErrorMessage } from "../../../components/forms/messages";
import DrawerComponent from "../../../components/navigation/manage_drawer/event_detail";
import BreadCrumbLink from "../../../components/navigation/breadcrumbs/link";
import { ROUTES, generateRoute } from "../../../routes/def";
import DrawerBoxWrapper from "../../../components/wrappers/manager_wrapper";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import { useRequiredFeatureAccess } from "../../../hooks/manager/required_feature_access_hook";
import ApiRoutes from "../../../routes/backend_routes";

const SendOutValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required").min(3),
  message: Yup.string().required("Message is required").min(25),
  ticket_releases: Yup.array().min(
    1,
    "At least one ticket release is required"
  ),
});

const TicketFiltersValidationSchema = Yup.object().shape({
  checked_in: Yup.boolean(),
  is_paid: Yup.boolean(),
  refunded: Yup.boolean(),
  is_reserve: Yup.boolean(),
  is_handled: Yup.boolean(),
});

const TicketFilterValues = {
  checked_in: "Checked in",
  is_paid: "Is paid",
  refunded: "Refunded",
  is_reserve: "Is Reserve",
  is_handled: "Is Handled",
};

type FilterState = "yes" | "no" | "ignore";
type TicketFilterValuesTypes = "yes" | "no" | "ignore";

interface TicketFiltersType {
  filter: "checked_in" | "is_paid" | "refunded" | "is_reserve" | "is_handled";
  value: TicketFilterValuesTypes;
}

interface SendOutFormValues {
  subject: string;
  message: string;
}

const initialValues: SendOutFormValues = {
  subject: "",
  message: "",
};

const NewSendOut: React.FC = () => {
  const { eventID } = useParams();
  const { event, loading, error, canAccess, t } = useEventAccess(eventID!);

  const { hasFeatAccess } = useRequiredFeatureAccess("send_outs", true);

  const [selectedTicketReleases, setSelectedTicketReleases] = useState([]);
  const initialTicketFilters: {
    [key in keyof typeof TicketFilterValues]: FilterState;
  } = {
    checked_in: "ignore",
    is_paid: "ignore",
    refunded: "ignore",
    is_reserve: "ignore",
    is_handled: "ignore",
  };

  // Use the defined initial state
  const [ticketFilters, setTicketFilters] =
    useState<{ [key in keyof typeof TicketFilterValues]: FilterState }>(
      initialTicketFilters
    );

  const [users, setUsers] = useState<IUser[]>([]);

  const handleFilterChange = (
    filter: keyof typeof TicketFilterValues,
    newValue: FilterState
  ) => {
    setTicketFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: newValue,
    }));
  };

  const theme = useTheme();

  const { tickets } = useSelector((state: RootState) => state.eventTickets);
  const dispatch: AppDispatch = useDispatch();

  const applyFiltersToTickets = (ticketsForRelease: ITicket[]) => {
    // Returns all the tickets that match the selected filters
    let filteredTickets = ticketsForRelease;

    Object.entries(ticketFilters!).forEach(([filter, value]) => {
      if (value) {
        filteredTickets = filteredTickets.filter((ticket: ITicket) => {
          if (ticket.deleted_at || ticket.ticket_request?.deleted_at) {
            return false;
          }
          if (value === "ignore") {
            return ticket;
          }
          switch (filter) {
            case "checked_in":
              return value === "yes" ? ticket.checked_in : !ticket.checked_in;
            case "is_paid":
              return value === "yes" ? ticket.is_paid : !ticket.is_paid;
            case "refunded":
              return value === "yes" ? ticket.refunded : !ticket.refunded;
            case "is_reserve":
              return value === "yes" ? ticket.is_reserve : !ticket.is_reserve;
            case "is_handled":
              return value === "yes"
                ? ticket.ticket_request?.is_handled
                : !ticket.ticket_request?.is_handled;
            default:
              return ticket;
          }
        });
      }
    });

    return filteredTickets;
  };

  const calculateUsers = () => {
    // Calculate the number of unique users that will receive the email based on ticket releases selected
    let users: IUser[] = [];
    selectedTicketReleases.forEach((release) => {
      let ticketsForRelease = tickets.filter(
        (ticket) => ticket.ticket_request?.ticket_release?.id === release
      );

      ticketsForRelease = applyFiltersToTickets(ticketsForRelease);

      const usersForRelease = ticketsForRelease.map((ticket) => ticket.user!);
      users = [...users, ...usersForRelease];
    });

    const uniqueUsers = users.filter(
      (user: IUser, index, self) =>
        index === self.findIndex((u) => u.ug_kth_id === user.ug_kth_id)
    );

    setUsers(uniqueUsers);
  };

  useEffect(() => {
    if (eventID) {
      dispatch(fetchEventTicketsStart(parseInt(eventID)));
    }
  }, [dispatch, eventID]);

  useEffect(() => {
    calculateUsers();
    // Make sure to include both selectedTicketReleases and ticketFilters in the dependency array
  }, [selectedTicketReleases, ticketFilters, tickets]); // Include tickets if its changes should also trigger the calculation

  const handleSubmit = (values: SendOutFormValues) => {
    if (selectedTicketReleases.length === 0) {
      toast.error("At least one ticket release is required");
      return;
    }

    const data = {
      subject: values.subject,
      message: values.message,
      ticket_release_ids: selectedTicketReleases,
      filters: ticketFilters,
    };

    axios
      .post(
        ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT_SEND_OUT, {
          eventID: eventID,
        }),
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Emails will be sent out shortly!");
        }
      })
      .catch((error) => {
        toast.error("Error sending email");
      });
  };

  if (!event || loading) {
    return <LoadingOverlay />;
  }

  // Rest of your component
  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        {!hasFeatAccess && <LoadingOverlay />}
        <Title fontSize={36}>{t("manage_event.send_out.new")}</Title>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink
            to={`/events/${eventID}/manage`}
            label={t("manage_event.breadcrumbs.manage")}
          />
          <BreadCrumbLink
            to={generateRoute(ROUTES.MANAGE_SEND_OUT_LIST, {
              eventId: eventID!,
            })}
            label={t("manage_event.breadcrumbs.send_outs")}
          />
          <BreadCrumbLink
            to={generateRoute(ROUTES.MANAGE_SEND_OUT_NEW, {
              eventId: eventID!,
            })}
            label={t("manage_event.send_out.new")}
          />
        </Breadcrumbs>
        <StyledText
          level="body-lg"
          color="charcoal"
          sx={{
            textWrap: "balance",
          }}
          style={{ marginBottom: "16px" }}
        >
          {t("manage_event.send_out.description")}
        </StyledText>

        <Formik
          initialValues={initialValues}
          validationSchema={SendOutValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values }) => (
            <Form>
              <FormControl>
                <StyledFormLabel>
                  {t("manage_event.send_out.subject")}*
                </StyledFormLabel>
                <FormInput
                  placeholder="Subject"
                  name="subject"
                  label="subject"
                  overrideStyle={{
                    ...DefaultInputStyle,
                  }}
                />
                <StyledFormLabelWithHelperText>
                  {t("manage_event.send_out.subject_helperText")}
                </StyledFormLabelWithHelperText>
              </FormControl>
              <FormControl>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid xs={12} md={6}>
                    <StyledFormLabel>
                      {t("manage_event.send_out.message")}*
                    </StyledFormLabel>
                    <FormTextarea
                      placeholder="Message"
                      name="message"
                      label="message"
                      overrideStyle={{
                        ...DefaultInputStyle,
                        width: "95%",
                      }}
                    />
                    <StyledErrorMessage name="message" />

                    <StyledFormLabelWithHelperText>
                      {t("manage_event.send_out.message_helperText")}
                    </StyledFormLabelWithHelperText>
                  </Grid>
                  <Grid xs={12} md={6}>
                    {/* Rendered Markdown */}
                    <StyledFormLabel>
                      {t("manage_event.send_out.preview")}*
                    </StyledFormLabel>
                    <Box
                      sx={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        borderRadius: "4px",
                        ...DefaultInputStyle,
                        width: "95%",
                      }}
                    >
                      <ReactMarkdown>{values.message}</ReactMarkdown>
                    </Box>
                    <StyledFormLabelWithHelperText>
                      {t("manage_event.send_out.preview_helperText")}
                    </StyledFormLabelWithHelperText>
                  </Grid>
                </Grid>
              </FormControl>
              <Divider sx={{ margin: "16px 0" }} />
              <FormControl>
                <StyledFormLabel>
                  {t("manage_event.send_out.ticket_releases")}
                </StyledFormLabel>
                {event.ticketReleases!.length > 0 && (
                  <div style={{ width: "100px" }}>
                    <Select
                      multiple
                      sx={{
                        width: "400px",
                        height: "fit-content",
                        backgroundColor: (theme) => {
                          if (selectedTicketReleases.length === 0) {
                            return PALLETTE.red;
                          } else {
                            return PALLETTE.green;
                          }
                        },
                      }}
                      placeholder="Select a ticket release"
                      value={selectedTicketReleases}
                      onChange={(event, newValue) => {
                        setSelectedTicketReleases(newValue as never[]);
                      }}
                      renderValue={(selected: any) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.25rem",
                          }}
                        >
                          {selected.map((selectedOption: any) => (
                            <Chip
                              variant="soft"
                              color="primary"
                              key={selectedOption.id}
                            >
                              {selectedOption.label}
                            </Chip>
                          ))}
                        </Box>
                      )}
                    >
                      {event.ticketReleases!.map((release) => {
                        return (
                          <Option
                            key={release.id}
                            value={release.id}
                            sx={{
                              maxWidth: "400px",
                            }}
                          >
                            {release.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                )}
                <StyledFormLabelWithHelperText>
                  {t("manage_event.send_out.ticket_releases_helperText")}
                </StyledFormLabelWithHelperText>
              </FormControl>
              <Box mt={1}></Box>
              <StyledFormLabel>
                {t("manage_event.send_out.filter_tickets")}
              </StyledFormLabel>
              <Stack direction={"column"} spacing={2} ml={2}>
                {Object.entries(TicketFilterValues).map(
                  ([filter, filterLabel]) => (
                    <Box key={filter + "-filter"}>
                      <FormControlLabel
                        label={
                          <StyledText
                            level="body-sm"
                            color={PALLETTE.charcoal}
                            sx={{ ml: 1 }}
                          >
                            {filterLabel}
                          </StyledText>
                        }
                        control={
                          <Box sx={{ display: "flex", gap: 2 }}>
                            {["yes", "ignore", "no"].map((value) => (
                              <Box
                                sx={{
                                  width: 75,
                                  height: 30,
                                  borderRadius: 2,
                                  border: "1px solid " + PALLETTE.cerise,
                                  backgroundColor:
                                    ticketFilters![
                                      filter as keyof typeof ticketFilters
                                    ] === value
                                      ? value === "yes"
                                        ? PALLETTE.green
                                        : value === "ignore"
                                        ? PALLETTE.cerise_dark
                                        : PALLETTE.red
                                      : PALLETTE.charcoal_see_through,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleFilterChange(
                                    filter as keyof typeof TicketFilterValues,
                                    value as TicketFilterValuesTypes
                                  )
                                }
                              >
                                <StyledText
                                  level="body-sm"
                                  fontWeight={600}
                                  fontSize={16}
                                  color={
                                    ticketFilters![
                                      filter as keyof typeof ticketFilters
                                    ] === value
                                      ? PALLETTE.white
                                      : PALLETTE.charcoal
                                  }
                                >
                                  {value.toLocaleUpperCase()}
                                </StyledText>
                              </Box>
                            ))}
                          </Box>
                        }
                      />
                    </Box>
                  )
                )}
              </Stack>
              <StyledFormLabelWithHelperText>
                {t("manage_event.send_out.filter_tickets_helperText")}
              </StyledFormLabelWithHelperText>
              <StyledText
                level="body-sm"
                color={PALLETTE.orange}
                fontSize={20}
                fontWeight={600}
              >
                {t("manage_event.send_out.num_users", {
                  numUsers: users.length,
                })}
              </StyledText>
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal_see_through}
                fontSize={16}
              >
                {users
                  .map((user) => user.first_name + " " + user.last_name)
                  .join(", ")}
              </StyledText>
              <StyledButton
                sx={{
                  mt: 4,
                }}
                type="submit"
                size="lg"
                bgColor={PALLETTE.green}
                style={{ width: "150px" }}
              >
                {t("form.button_send")}
              </StyledButton>
            </Form>
          )}
        </Formik>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default NewSendOut;
