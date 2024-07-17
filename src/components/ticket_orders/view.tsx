import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import PALLETTE from "../../theme/pallette";
import {
  IAddon,
  ISelectedAddon,
  ITicketAddon,
  ITicketOrder,
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

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/def";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useCosts } from "../events/payments/use_cost";
import { cancelTicketOrderRequest } from "../../redux/features/myTicketOrderSlice";
import TicketReleaseAddons from "../events/ticket_release/addons";
import ShowTicketOrdersTickets from "./ticket_view";

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

interface ViewTicketOrderProps {
  ticketOrder: ITicketOrder;
}

const ViewTicketOrder: React.FC<ViewTicketOrderProps> = ({ ticketOrder }) => {
  const dispatch: AppDispatch = useDispatch();
  const screenWidth = useWindowResize();

  const navigate = useNavigate();

  const [confirmCancelOpen, setConfirmCancelOpen] = useState<boolean>(false);

  const handleCancel = () => {
    dispatch(
      cancelTicketOrderRequest({
        ticket_order: ticketOrder,
      })
    );
    setConfirmCancelOpen(false);
  };

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (ticketOrder) {
  //     setSelectedAddons(
  //       ticketRequest.ticket_add_ons?.map((addon: ITicketAddon) => {
  //         return {
  //           id: addon.add_on_id,
  //           quantity: addon.quantity,
  //         };
  //       }) || []
  //     );
  //   }
  // }, [ticketRequest]);

  // const handleUpdateAddons = async () => {
  //   await updateTicketAddons(
  //     selectedAddons,
  //     ticketRequest.id,
  //     ticketRequest.ticket_release_id!
  //   );

  //   dispatch(getMyTicketRequestsRequest([]));
  // };

  const [selectedAddons, setSelectedAddons] = useState<ISelectedAddon[]>([]);

  const { totalTicketCost, totalAddonsCost, totalCost } = useCosts(ticketOrder);

  if (!ticketOrder) {
    return null;
  }

  const { addons: allAddons } = ticketOrder.ticket_release!;

  return (
    <BorderBox
      style={{
        marginTop: "16px",
        width: isScreenSmall ? "90%" : screenWidth,
        position: "relative",
      }}
    >
      {/* <Title fontSize={32}>{ticketRequest.ticket_type?.name}</Title> */}
      <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
        {t("common.made_at")}{" "}
        {new Date(ticketOrder.created_at).toLocaleString()}
      </StyledText>

      <ShowTicketOrdersTickets ticketOrder={ticketOrder} />

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

        {!ticketOrder.is_handled && !ticketOrder.deleted_at ? (
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

        {!ticketOrder.is_handled && allAddons?.length! > 0 && (
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
                    ticketRelease={ticketOrder.ticket_release!}
                    handleChange={setSelectedAddons}
                    selectedAddons={selectedAddons}
                  />
                  {/* <StyledButton
                    size="sm"
                    bgColor={PALLETTE.green}
                    onClick={handleUpdateAddons}
                    sx={{ mt: 2 }}
                  >
                    {t("form.button_save")}
                  </StyledButton> */}
                </Box>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        )}

        <Divider sx={{ my: 1 }} />

        {/* {!ticketOrder.deleted_at ? (
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
        )} */}
      </Box>
    </BorderBox>
  );
};

export default ViewTicketOrder;
