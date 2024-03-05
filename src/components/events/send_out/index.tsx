import {
  Box,
  Chip,
  Divider,
  FormControl,
  Grid,
  Input,
  ListDivider,
  Option,
  Select,
  Stack,
  Switch,
  TextField,
  Textarea,
} from "@mui/joy";
import Title from "../../text/title";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../Loading";
import TesseraWrapper from "../../wrappers/page_wrapper";
import { useEventAccess } from "../use_event_access";
import StyledText from "../../text/styled_text";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import PALLETTE from "../../../theme/pallette";
import {
  DefaultInputStyle,
  FormInput,
  FormTextarea,
} from "../../forms/input_types";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../forms/form_labels";
import { Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { fetchEventTicketsStart } from "../../../redux/features/eventTicketsSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel } from "@mui/material";
import { ITicket, IUser } from "../../../types";
import StyledButton from "../../buttons/styled_button";
import axios from "axios";
import { toast } from "react-toastify";
import { StyledErrorMessage } from "../../forms/messages";
import DrawerComponent from "../../navigation/manage_drawer";

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

type TicketFilters = {
  filter: "checked_in" | "is_paid" | "refunded" | "is_reserve" | "is_handled";
  value: boolean;
};

interface SendOutFormValues {
  subject: string;
  message: string;
}

const initialValues: SendOutFormValues = {
  subject: "",
  message: "",
};

const SendOut: React.FC = () => {
  const { eventID } = useParams();
  const { event, loading, error, canAccess, t } = useEventAccess(eventID!);

  const [markdownInput, setMarkdownInput] = useState(""); // State to store markdown input
  const handleMarkdownChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdownInput(event.target.value);
  };

  const [selectedTicketReleases, setSelectedTicketReleases] = useState([]);
  const [ticketFilters, setTicketFilters] = useState<{
    [key: string]: boolean;
  }>(
    Object.keys(TicketFilterValues).reduce(
      (acc: { [key: string]: boolean }, filter) => {
        acc[filter] = false; // Initialize all filters as false
        return acc;
      },
      {}
    )
  );
  const [users, setUsers] = useState<IUser[]>([]);

  const handleFilterChange = (name: string, checked: boolean) => {
    setTicketFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { tickets } = useSelector((state: RootState) => state.eventTickets);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (eventID) {
      dispatch(fetchEventTicketsStart(parseInt(eventID)));
    }
  }, [dispatch, eventID]);

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
    calculateUsers();
  }, [selectedTicketReleases, ticketFilters]);

  if (!event || loading) {
    return <LoadingOverlay />;
  }

  const applyFiltersToTickets = (ticketsForRelease: ITicket[]) => {
    // Returns all the tickets that match the selected filters
    let filteredTickets = ticketsForRelease;

    Object.entries(ticketFilters).forEach(([filter, value]) => {
      if (value) {
        filteredTickets = filteredTickets.filter((ticket: ITicket) => {
          switch (filter) {
            case "checked_in":
              return ticket.checked_in === value;
            case "is_paid":
              return ticket.is_paid === value;
            case "refunded":
              return ticket.refunded === value;
            case "is_reserve":
              return ticket.is_reserve === value;
            case "is_handled":
              return ticket.ticket_request?.is_handled === value;
            default:
              return ticket;
          }
        });
      }
    });

    return filteredTickets;
  };

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
        `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/send-out`,
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

  // Rest of your component
  return (
    <>
      <DrawerComponent eventID={eventID!} />
      <TesseraWrapper>
        <Box
          component="main"
          style={{
            marginLeft: "16px",
            marginRight: "16px",
          }}
        >
          <Box mx="64px" mt={"16px"}>
            <Title>{t("manage_event.send_out.title")}</Title>

            <StyledText
              level="body-lg"
              color="charcoal"
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
                      <Select
                        multiple
                        sx={{ width: "300px" }}
                        placeholder="Select a ticket release"
                        value={selectedTicketReleases}
                        onChange={(event, newValue) => {
                          setSelectedTicketReleases(newValue as never[]);
                        }}
                        renderValue={(selected: any) => (
                          <Box sx={{ display: "flex", gap: "0.25rem" }}>
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
                            <Option key={release.id} value={release.id}>
                              {release.name}
                            </Option> // Use the correct component and add a key prop
                          );
                        })}
                      </Select>
                    )}
                    <StyledFormLabelWithHelperText>
                      {t("manage_event.send_out.ticket_releases_helperText")}
                    </StyledFormLabelWithHelperText>
                  </FormControl>

                  <Box mt={1}></Box>

                  <StyledFormLabel>
                    {t("manage_event.send_out.filter_tickets")}
                  </StyledFormLabel>
                  <Stack
                    direction={isScreenSmall ? "column" : "row"}
                    spacing={2}
                  >
                    {Object.entries(TicketFilterValues).map(
                      ([filter, filterLabel]) => (
                        <Box key={filter + "-filter"}>
                          <FormControlLabel
                            label={
                              <StyledText
                                level="body-sm"
                                color={PALLETTE.charcoal}
                                sx={{
                                  ml: 1,
                                }}
                              >
                                {filterLabel}
                              </StyledText>
                            }
                            control={
                              <Switch
                                checked={ticketFilters[filter]}
                                onChange={(e: any) => {
                                  handleFilterChange(filter, e.target.checked);
                                }}
                              />
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
          </Box>
        </Box>
      </TesseraWrapper>
    </>
  );
};

export default SendOut;
