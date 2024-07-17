import React from "react";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { Box } from "@mui/joy";
import { ITicket } from "../../../../types";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";

interface TicketQRCodeProps {
  ticket: ITicket; // replace with your actual ticket type
}

const TicketQRCode: React.FC<TicketQRCodeProps> = ({ ticket }) => {
  const { t } = useTranslation();

  return ticket.is_paid ? (
    <Box>
      <Box
        sx={{
          backgroundColor: PALLETTE.cerise,
          padding: "16px",
          borderRadius: "8px",
          width: "fit-content",
          margin: "16px auto",
        }}
      >
        {ticket.checked_in && (
          <StyledText
            level="body-sm"
            fontSize={24}
            color={PALLETTE.green}
            fontWeight={700}
            style={{
              position: "absolute",
              zIndex: 100,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: "200px",
              textShadow: "0 0 8px black",
            }}
          >
            {t("tickets.qr_code.already_checked_in")}
          </StyledText>
        )}

        <QRCode
          value={ticket.qr_code}
          size={256}
          style={{
            filter: ticket.checked_in ? "blur(8px)" : "none",
          }}
        />
      </Box>
      <StyledText
        level="body-sm"
        fontSize={16}
        color={PALLETTE.charcoal_see_through}
        style={{
          textAlign: "center",
        }}
      >
        ID: {ticket.id}
      </StyledText>
      <StyledText
        level="body-sm"
        fontSize={18}
        color={PALLETTE.charcoal}
        style={{ marginTop: "8px" }}
      >
        {t("tickets.qr_code.description")}
      </StyledText>
    </Box>
  ) : null;
};

export default TicketQRCode;
