import { Box, Stack } from "@mui/joy";
import { LabelValue } from "./ticket_utils";
import { ITicket, IOrder } from "../../../../types";
import { useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import PALLETTE from "../../../../theme/pallette";
import StyledText from "../../../text/styled_text";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";

interface TicketPaymentInfoProps {
  ticket: ITicket;
  onNull: () => void;
}

const TicketPaymentInfo: React.FC<TicketPaymentInfoProps> = ({
  ticket,
  onNull,
}) => {
  const order: IOrder = ticket.order!;

  const { t } = useTranslation();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  if (!order) {
    onNull();
    return null;
  }

  return (
    <Box
      sx={{
        width: "800px",
      }}
    >
      <StyledText
        level="body-sm"
        color={PALLETTE.cerise}
        fontWeight={600}
        fontSize={20}
      >
        {t("manage_event.tickets.payment_info.title")}
      </StyledText>
      <Stack
        direction={isScreenSmall ? "column" : "row"}
        spacing={5}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box sx={{ width: "400px" }}>
          <LabelValue
            key="is_paid"
            label={t("manage_event.tickets.ticket_info.paid_at")}
            value={
              order && order.details.payed_at
                ? format(
                    new Date(order.details.payed_at),
                    "dd MMMM, yyyy, HH:mm"
                  )
                : "-"
            }
          />
          <LabelValue
            label={t("manage_event.tickets.payment_info.amount")}
            value={order.details.total / 100}
          />
          <LabelValue
            label={t("manage_event.tickets.payment_info.currency")}
            value={order.details.currency.toUpperCase()}
          />

          <LabelValue
            label={t("manage_event.tickets.payment_info.refunded")}
            value={
              order.details.refunded ? (
                <CheckIcon color="success" />
              ) : (
                <CloseIcon color="error" />
              )
            }
          />

          {order.details.refunded && (
            <LabelValue
              label={t("manage_event.tickets.payment_info.refunded_at")}
              value={format(
                new Date(order.details.refunded_at!),
                "dd MMMM, yyyy, HH:mm"
              )}
            />
          )}
          <LabelValue
            label={t("manage_event.tickets.payment_info.payment_method")}
            value={order.details.payment_method}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default TicketPaymentInfo;
