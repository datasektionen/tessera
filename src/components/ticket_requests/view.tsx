import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import PALLETTE from "../../theme/pallette";
import {
  IAddon,
  ISelectedAddon,
  ITicketAddon,
  ITicketRequest,
} from "../../types";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import BorderBox from "../wrappers/border_box";
import { useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  useTheme,
} from "@mui/joy";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StyledButton from "../buttons/styled_button";
import ConfirmModal from "../modal/confirm_modal";
import {
  cancelTicketRequestRequest,
  getMyTicketRequestsRequest,
} from "../../redux/features/myTicketRequestsSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/def";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import EditFormFieldResponse from "../events/form_field_response/edit";
import TicketReleaseAddons from "../events/ticket_release/addons";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { updateTicketAddons } from "../../redux/sagas/axios_calls/addons";
import { useCosts } from "../events/payments/use_cost";

const useWindowResize = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = () =>
      setScreenWidth(window.innerWidth / 2.3);
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions(); // Initial call
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return screenWidth;
};

interface ViewTicketRequestProps {
  ticketRequest: ITicketRequest;
}

const ViewTicketRequest: React.FC<ViewTicketRequestProps> = ({
  ticketRequest,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const screenWidth = useWindowResize();

  const navigate = useNavigate();

  const [confirmCancelOpen, setConfirmCancelOpen] = useState<boolean>(false);

  const handleCancel = () => {
    dispatch(cancelTicketRequestRequest(ticketRequest));
    setConfirmCancelOpen(false);
  };

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  useEffect(() => {
    if (ticketRequest) {
      setSelectedAddons(
        ticketRequest.ticket_add_ons?.map((addon: ITicketAddon) => {
          return {
            id: addon.add_on_id,
            quantity: addon.quantity,
          };
        }) || []
      );
    }
  }, [ticketRequest]);

  const handleUpdateAddons = async () => {
    await updateTicketAddons(
      selectedAddons,
      ticketRequest.id,
      ticketRequest.ticket_release_id!
    );

    dispatch(getMyTicketRequestsRequest([]));
  };

  const { addons: allAddons } = ticketRequest.ticket_release!;

  const [selectedAddons, setSelectedAddons] = useState<ISelectedAddon[]>([]);

  const { totalTicketCost, totalAddonsCost, totalCost } =
    useCosts(ticketRequest);

  if (!ticketRequest) {
    return <></>;
  }

  return (
    <BorderBox
      style={{
        marginTop: "16px",
        width: isScreenSmall ? "90%" : screenWidth,
        position: "relative",
      }}
    >
      <Title fontSize={32}>{ticketRequest.ticket_type?.name}</Title>
      <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
        {t("common.made_at")}{" "}
        {new Date(ticketRequest.created_at).toLocaleString()}
      </StyledText>

      <Box mt={2}>
        <StyledText level="body-sm" fontSize={22} color={PALLETTE.charcoal}>
          {t("ticket_request.cost_overview")}
        </StyledText>
        <>
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid container justifyContent={"flex-start"} flexDirection={"row"}>
              <LocalActivityIcon />
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal}
                fontSize={18}
                style={{
                  marginLeft: "8px",
                }}
              >
                {ticketRequest.ticket_amount} x{" "}
                {ticketRequest.ticket_type?.name}
              </StyledText>
            </Grid>
            <StyledText level="body-sm" color={PALLETTE.charcoal} fontSize={18}>
              SEK{" "}
              {(
                ticketRequest.ticket_type?.price! * ticketRequest.ticket_amount
              ).toFixed(2)}
            </StyledText>
          </Grid>
          {ticketRequest.ticket_add_ons?.map((addon: ITicketAddon) => {
            const a: IAddon | undefined = allAddons?.find(
              (a) => a.id === addon.add_on_id
            );

            return (
              <Grid
                key={addon.id + "-addon"}
                container
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid
                  container
                  justifyContent={"flex-start"}
                  flexDirection={"row"}
                >
                  <AddCircleOutlineIcon />
                  <StyledText
                    level="body-sm"
                    color={PALLETTE.charcoal}
                    fontSize={18}
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    {addon.quantity} x {a?.name}
                  </StyledText>
                </Grid>
                <StyledText
                  level="body-sm"
                  color={PALLETTE.charcoal}
                  fontSize={18}
                >
                  SEK {(a?.price! * addon.quantity).toFixed(2)}
                </StyledText>
              </Grid>
            );
          })}
          <Divider />
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <StyledText
              level="body-sm"
              color={PALLETTE.charcoal}
              fontSize={18}
              style={{
                fontWeight: "bold",
              }}
            >
              {t("event.ticket_release.checkout.total")}
            </StyledText>
            <StyledText
              level="body-sm"
              color={PALLETTE.charcoal}
              fontSize={18}
              style={{
                fontWeight: "bold",
              }}
            >
              SEK {totalCost.toFixed(2)}
            </StyledText>
          </Grid>
        </>
      </Box>

      <Box>
        <ConfirmModal
          isOpen={confirmCancelOpen}
          onClose={() => setConfirmCancelOpen(false)}
          title={t("ticket_request.cancel_ticket_request_confirm_title")}
          actions={[
            <StyledButton
              key="confirm"
              bgColor={PALLETTE.offWhite}
              size="md"
              onClick={handleCancel}
              style={{
                marginTop: "16px",
              }}
            >
              {t("form.button_confirm")}
            </StyledButton>,
            <StyledButton
              key="cancel"
              bgColor={PALLETTE.green}
              size="md"
              onClick={() => setConfirmCancelOpen(false)}
              style={{
                marginTop: "16px",
              }}
            >
              {t("form.button_cancel")}
            </StyledButton>,
          ]}
        >
          <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
            {t("ticket_request.cancel_ticket_request_confirm")}
          </StyledText>
        </ConfirmModal>

        {!ticketRequest.is_handled ? (
          <StyledButton
            bgColor={PALLETTE.red}
            size="md"
            onClick={() => setConfirmCancelOpen(true)}
            style={{
              marginTop: "16px",
            }}
          >
            {t("ticket_request.cancel_ticket_request_button")}
          </StyledButton>
        ) : (
          <StyledButton
            bgColor={PALLETTE.offWhite}
            size="md"
            onClick={() => {
              navigate(ROUTES.PROFILE_TICKETS);
            }}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
            }}
          >
            {t("ticket_request.go_to_tickets_button")}
          </StyledButton>
        )}

        <AccordionGroup
          sx={{
            mt: 2,
          }}
        >
          <Accordion>
            <AccordionSummary>
              <StyledText
                level="body-sm"
                fontSize={22}
                color={PALLETTE.charcoal}
              >
                {t("event.ticket_release.addons.view_addons")}
              </StyledText>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <TicketReleaseAddons
                  ticketRelease={ticketRequest.ticket_release!}
                  handleChange={setSelectedAddons}
                  selectedAddons={selectedAddons}
                />
                <StyledButton
                  size="sm"
                  bgColor={PALLETTE.green}
                  onClick={handleUpdateAddons}
                  sx={{ mt: 2 }}
                >
                  {t("form.button_save")}
                </StyledButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>

        <Divider sx={{ my: 1 }} />

        {!ticketRequest.deleted_at ? (
          <EditFormFieldResponse ticketRequest={ticketRequest} />
        ) : (
          <StyledText
            level="body-sm"
            fontSize={18}
            color={PALLETTE.cerise}
            sx={{ mt: 2 }}
          >
            {t("ticket_request.deleted")}
          </StyledText>
        )}
      </Box>
    </BorderBox>
  );
};

export default ViewTicketRequest;
