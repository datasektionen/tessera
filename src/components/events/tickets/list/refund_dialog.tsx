import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ITicket } from "../../../../types"; // Adjust the import path as needed
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import StyledButton from "../../../buttons/styled_button";
import { canRefundTicket } from "../../../../utils/manager/refund_ticket";
import LoadingOverlay from "../../../Loading";
import { toast } from "react-toastify";

interface RefundDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string, amount: number) => void;
  ticket: ITicket | null;
}

const RefundDialog: React.FC<RefundDialogProps> = ({
  open,
  onClose,
  onSubmit,
  ticket,
}) => {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (ticket && ticket.ticket_type) {
      setAmount(ticket.ticket_type.price.toString());
    }
  }, [ticket]);

  const handleSubmit = () => {
    onSubmit(reason, parseFloat(amount));
    setReason("");
    setAmount("");
  };

  // Check if ticket can be refunded
  if (ticket && !canRefundTicket(ticket!)) {
    toast.error(t("refund.cannot_refund"));
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <StyledText
          level="h2"
          fontSize={22}
          fontWeight={600}
          color={PALLETTE.charcoal}
        >
          {t("refund.dialog_title")}
        </StyledText>
      </DialogTitle>
      <DialogContent>
        {ticket && (
          <div>
            <Typography variant="body1">
              {t("refund.ticket_info", {
                id: ticket.id,
                type: ticket.ticket_type?.name,
                price: ticket.ticket_type?.price,
              })}
            </Typography>
            <Typography variant="body2">
              {t("refund.user_info", {
                name: `${ticket.user?.first_name} ${ticket.user?.last_name}`,
                email: ticket.user?.email,
              })}
            </Typography>
          </div>
        )}
        <TextField
          label={t("refund.reason")}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("refund.amount")}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t("common.cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!reason || !amount}
        >
          {t("refund.submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefundDialog;
