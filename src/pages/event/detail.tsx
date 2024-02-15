import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getEventsRequest } from "../../redux/features/listEventsSlice";
import { getEventRequest } from "../../redux/features/eventSlice";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { format } from "date-fns";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Input,
  Link,
  Sheet,
  Stack,
  Typography,
  styled,
} from "@mui/joy";
import {
  IEvent,
  PromoCodeAccessForm,
  PromoCodeAccessFormInitialValues,
} from "../../types";
import LoadingOverlay from "../../components/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { validateAndConvertEventID } from "../../utils/id_validation";
import PALLETTE from "../../theme/pallette";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TicketRelease from "../../components/events/ticket_release";
import StandardGrid from "../../components/wrappers/standard_grid";
import {
  DefaultInputStyle,
  FormInput,
} from "../../components/forms/input_types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../components/forms/form_labels";
import StyledButton from "../../components/buttons/styled_button";
import { Form, Formik } from "formik";
import { PromoCodeValidationSchema } from "../../validation/create_ticket_release_form";
import { StyledErrorMessage } from "../../components/forms/messages";
import { getPromoCodeAccessRequest } from "../../redux/features/promoCodeAccessSlice";
import { Trans, useTranslation } from "react-i18next";
import StyledText from "../../components/text/styled_text";
import GroupsIcon from "@mui/icons-material/Groups";
import { userCanSeeTicketRelease } from "../../utils/ticket_release_access";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.level1
      : PALLETTE.offWhite,
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

const EventDetail: React.FC = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const secretToken = queryParams.get("secret_token");

  const { loading, error, event, errorStatusCode } = useSelector(
    (state: RootState) => state.eventDetail
  ) as {
    loading: boolean;
    error: string | null;
    event: IEvent | null;
    errorStatusCode: number | null;
  };

  const { success: promoCodeSuccess, loading: promoCodeLoading } = useSelector(
    (state: RootState) => state.promoCodeAccess
  ) as { success: boolean | null; loading: boolean };
  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const submitPromoCode = (values: PromoCodeAccessForm) => {
    dispatch(
      getPromoCodeAccessRequest({
        promo_code: values.promo_code,
        eventId: event!.id,
      })
    );
  };

  useEffect(() => {
    if (errorStatusCode === 404) {
      navigate("/404");
    } else if (errorStatusCode === 403) {
      setTimeout(() => {
        toast.error(error);
      }, 1000);
      navigate("/events");
    } else if (errorStatusCode) {
      setTimeout(() => {
        toast.error(error);
      }, 1000);
      navigate("/events");
    }
  }, [errorStatusCode, error]);

  useEffect(() => {
    if (!eventID) {
      console.error("No event id found");
      return;
    }
    const intid: number = validateAndConvertEventID(eventID);
    dispatch(
      getEventRequest({
        id: intid,
        secretToken: secretToken || "",
      })
    );
  }, []);

  useEffect(() => {
    const intid: number = validateAndConvertEventID(eventID!);
    // Get id param :eventID
    if (promoCodeSuccess) {
      dispatch(
        getEventRequest({
          id: intid,
          secretToken: secretToken || "",
        })
      );
    }
  }, [promoCodeSuccess]);

  if (loading || error) {
    console.error(error);
    return <LoadingOverlay />;
  }

  if (!event) {
    // TODO: 404 page
    console.error("No event found");
    return null;
  }

  return (
    <TesseraWrapper>
      {promoCodeLoading && <LoadingOverlay />}
      <StandardGrid>
        <Grid xs={16} md={8}>
          <Item>
            <Typography
              level="h1"
              fontFamily={"Josefin sans"}
              fontSize={48}
              fontWeight={700}
              style={{
                color: PALLETTE.cerise,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "90%",
              }}
            >
              {event.name}
            </Typography>

            <Grid container spacing={2} columns={16}>
              <Grid xs={16} md={12}>
                <Typography
                  level="body-md"
                  style={{
                    color: PALLETTE.charcoal,
                    height: "fit-content",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    wordBreak: "break-word", // To ensure long words do not cause layout issues
                  }}
                >
                  <ReactMarkdown>{event.description}</ReactMarkdown>
                </Typography>

                <Box>
                  <StyledText
                    color={PALLETTE.charcoal_see_through}
                    level="body-sm"
                    fontSize={16}
                    fontWeight={600}
                    style={{
                      width: "75%",
                      margin: "2rem 0",
                    }}
                  >
                    <Trans
                      i18nKey="event.contact_organizers"
                      values={{ organization: event.organization?.name }}
                    >
                      Contact the organizers at <strong>hi</strong>
                      <Link
                        href={`/contact?organization_id=${event.organization?.id}`}
                      >
                        here
                      </Link>
                    </Trans>
                  </StyledText>
                </Box>
              </Grid>
              <Grid xs={16} md={4}>
                <Typography
                  level="body-sm"
                  fontFamily={"Josefin sans"}
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<LocationOnIcon />}
                  sx={{ mt: 1 }}
                  style={{
                    color: PALLETTE.charcoal,
                  }}
                >
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      event.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: PALLETTE.charcoal,
                    }}
                  >
                    {event.location}
                  </a>
                </Typography>
                <Typography
                  level="body-sm"
                  fontFamily={"Josefin sans"}
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<CalendarTodayIcon />}
                  sx={{ mt: 1 }}
                  style={{
                    color: PALLETTE.charcoal,
                  }}
                >
                  {/* Convert from timestamp to string */}
                  {format(new Date(event.date), "EEEE 'the' do 'at' HH:mm")}
                </Typography>
                <StyledText
                  color={PALLETTE.charcoal}
                  level="body-sm"
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<GroupsIcon />}
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  {t("event.event_by")} {event.organization?.name}
                </StyledText>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid xs={16} md={8} mt={1}>
          <Item>
            <Typography
              level="h2"
              fontFamily={"Josefin sans"}
              fontSize={34}
              fontWeight={700}
              style={{
                color: PALLETTE.cerise,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {t("event.ticket_releases")}
            </Typography>
            <div>
              {event.ticketReleases?.length === 0 && (
                <StyledText
                  color={PALLETTE.charcoal}
                  level="body-sm"
                  fontSize={22}
                  fontWeight={500}
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  {t("event.no_ticket_releases")}
                </StyledText>
              )}
              <Stack spacing={2} sx={{ p: 0 }}>
                {event.ticketReleases?.map((ticketRelease, i) => {
                  const key = `${event.name}-${i}`;
                  if (!userCanSeeTicketRelease(ticketRelease, currentUser!)) {
                    return null;
                  }

                  return (
                    <TicketRelease ticketRelease={ticketRelease} key={key} />
                  );
                })}
              </Stack>
            </div>
          </Item>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box>
            <Formik
              initialValues={PromoCodeAccessFormInitialValues}
              onSubmit={(values: PromoCodeAccessForm, actions) => {
                submitPromoCode(values);
                // Clear
                actions.resetForm();
              }}
              validationSchema={PromoCodeValidationSchema}
            >
              {({ handleChange, setFieldValue }) => (
                <Form>
                  <StyledFormLabel>
                    {t("event.promo_code_title")}
                  </StyledFormLabel>

                  <Stack spacing={2} sx={{ p: 0 }} direction="row">
                    <FormInput
                      label={t("event.promo_code_title")}
                      name={"promo_code"}
                      placeholder={"Enter Promo Code"}
                      type={"text"}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.currentTarget;
                        setFieldValue("promo_code", value.toUpperCase());
                      }}
                    />

                    <StyledButton
                      type="submit"
                      size="md"
                      color={PALLETTE.charcoal}
                    >
                      {t("form.button_submit")}
                    </StyledButton>
                  </Stack>
                  <StyledErrorMessage name="promo_code" />

                  <StyledFormLabelWithHelperText>
                    {t("event.promo_code_helperText")}
                  </StyledFormLabelWithHelperText>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default EventDetail;
