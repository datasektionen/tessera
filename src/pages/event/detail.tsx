import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getEventsRequest } from "../../redux/features/listEventsSlice";
import { getEventRequest } from "../../redux/features/eventSlice";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Input,
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
import { useParams } from "react-router-dom";
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

  const { loading, error, event } = useSelector(
    (state: RootState) => state.eventDetail
  ) as { loading: boolean; error: string | null; event: IEvent | null };

  const { success: promoCodeSuccess, loading: promoCodeLoading } = useSelector(
    (state: RootState) => state.promoCodeAccess
  ) as { success: boolean | null; loading: boolean };

  const dispatch: AppDispatch = useDispatch();

  const submitPromoCode = (values: PromoCodeAccessForm) => {
    dispatch(
      getPromoCodeAccessRequest({
        promo_code: values.promo_code,
        eventId: event!.id,
      })
    );
  };

  useEffect(() => {
    if (!eventID) {
      console.error("No event id found");
      return;
    }
    const intid: number = validateAndConvertEventID(eventID);
    dispatch(getEventRequest(intid));
  }, []);

  useEffect(() => {
    const intid: number = validateAndConvertEventID(eventID!);
    // Get id param :eventID
    if (promoCodeSuccess) {
      dispatch(getEventRequest(intid));
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
        <Grid xs={8}>
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
              }}
            >
              {event.name}
            </Typography>

            <Grid container spacing={2}>
              <Grid xs={7}>
                <Typography
                  level="body-md"
                  style={{
                    color: PALLETTE.charcoal,
                    height: "150px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {event.description}
                </Typography>
              </Grid>
              <Grid xs={5}>
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
                  {event.location}
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
                  {new Date(event.date).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid xs={8}>
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
              Tickets
            </Typography>
            <div>
              <Stack spacing={2} sx={{ p: 0 }}>
                {event.ticketReleases?.map((ticketRelease, i) => {
                  const key = `${event.name}-${i}`;
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
              }}
              validationSchema={PromoCodeValidationSchema}
            >
              <Form>
                <StyledFormLabel>Promo Code</StyledFormLabel>

                <Stack spacing={2} sx={{ p: 0 }} direction="row">
                  <FormInput
                    label={"Promo Code"}
                    name={"promo_code"}
                    placeholder={"Enter Promo Code"}
                    type={"text"}
                  />

                  <StyledButton
                    type="submit"
                    size="md"
                    color={PALLETTE.charcoal}
                  >
                    Submit
                  </StyledButton>
                </Stack>
                <StyledErrorMessage name="promo_code" />

                <StyledFormLabelWithHelperText>
                  Enter a promo code to get access to reserved tickets.
                </StyledFormLabelWithHelperText>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default EventDetail;
