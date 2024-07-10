import React, { useEffect, useState } from "react";
import { getCustomerEventRequest } from "../../../redux/features/customerViewEvent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IEvent } from "../../../types";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { useMediaQuery, useTheme } from "@mui/material";
import StyledText from "../../../components/text/styled_text";
import PALLETTE from "../../../theme/pallette";
import Title from "../../../components/text/title";
import StandardToastContainer from "../../../components/wrappers/toast_container";
import { ticketReleaseHasClosed } from "../../../utils/event_open_close";
import { useTranslation } from "react-i18next";
import TicketRelease from "../../../components/events/ticket_release";
import LandingPageFooter from "./landing_page_footer";
import { toast } from "react-toastify";
import usePromoCodes from "../../../hooks/event/use_event_promo_code_hook";
import { useEventEffects } from "../../../hooks/event/event_detail_hook";
import { motion } from "framer-motion"; // Import Framer Motion
import LoadingOverlay from "../../../components/Loading";
import { PromoCodeForm } from "./promo_code_form";
import { ScrollConfig } from "../../../components/constant/scroll_config";
import ShowEventsTicketReleases from "./show_events_ticket_releases";

const EventLandingPage = () => {
  const { refID } = useParams();
  const [loadingEditor, setLoadingEditor] = useState(true);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const secretToken = queryParams.get("secret_token");

  const { submitPromoCode, promoCodes } = usePromoCodes(
    refID!,
    secretToken || ""
  );

  const { loading, error, event, errorStatusCode } = useSelector(
    (state: RootState) => state.customerViewEvent
  ) as {
    loading: boolean;
    error: string | null;
    event: IEvent | null;
    errorStatusCode: number | null;
  };
  const { timestamp } = useSelector((state: RootState) => state.timestamp);
  const { postSuccess } = useSelector(
    (state: RootState) => state.ticketOrder
  );

  useEventEffects(postSuccess, errorStatusCode, refID!, secretToken, error);

  useEffect(() => {
    const buyTicketsButton = document.querySelector("#buy-tickets");

    const handleClick = () => {
      setIsTicketModalOpen(true);
    };

    if (buyTicketsButton) {
      buyTicketsButton.addEventListener("click", handleClick);
    }

    return () => {
      if (buyTicketsButton) {
        buyTicketsButton.removeEventListener("click", handleClick);
      }
    };
  }, [event]);

  useEffect(() => {
    const setJsCode = () => {
      const script = document.createElement("script");
      let jsCode = event?.landing_page?.js!;
      jsCode = jsCode.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
      script.innerHTML = jsCode;
      document.body.appendChild(script);
    };

    if (event?.landing_page?.html && setLoadingEditor) {
      setJsCode();
      setLoadingEditor(false);
    }
  }, [event]);

  if (!event) {
    // TODO: 404 page
    return null;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  const ticketReleases = event!.ticket_releases!.filter(
    (ticketRelease) => !ticketReleaseHasClosed(ticketRelease, timestamp)
  );

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <div>
      <StandardToastContainer />
      <Modal
        open={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate={isTicketModalOpen ? "visible" : "hidden"}
        >
          <ModalDialog
            variant="outlined"
            sx={{
              width: isScreenSmall ? "100%" : "65%",
              backgroundColor: PALLETTE.offWhite,
            }}
          >
            <Box
              sx={{ maxHeight: "800px", ...ScrollConfig, overflow: "scroll" }}
              pb={4}
            >
              <DialogTitle>
                <Title
                  color={PALLETTE.primary}
                  style={{
                    margin: "0 auto",
                  }}
                >
                  Tickets
                </Title>
              </DialogTitle>
              <Box mt={2}>
                <ShowEventsTicketReleases
                  ticketReleases={ticketReleases}
                  event={event}
                />
              </Box>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Box>
                <PromoCodeForm onSubmit={submitPromoCode} />
              </Box>
              <ModalClose />
            </Box>
          </ModalDialog>
        </motion.div>
      </Modal>
      <style
        dangerouslySetInnerHTML={{ __html: event?.landing_page!.css! }}
      ></style>
      <div
        dangerouslySetInnerHTML={{ __html: event?.landing_page!.html! }}
      ></div>
      <LandingPageFooter />
    </div>
  );
};

export default EventLandingPage;
