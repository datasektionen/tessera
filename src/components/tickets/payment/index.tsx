import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios"; // Ensure axios is installed
import { ITicket, ITicketType } from "../../../types";
import StyledButton from "../../buttons/styled_button";
import { toast } from "react-toastify";
import {
  Box,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { appearance } from "../../../types/stripe_options";
import CheckoutForm from "./form";
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY! as string);

interface PaymentProps {
  ticket: ITicket;
}

const Payment: React.FC<PaymentProps> = ({ ticket }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const ticketType = ticket.ticket_request?.ticket_type!;

  const handlePay = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Request to create a payment intent
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tickets/${ticket.id}/create-payment-intent`,
        {
          withCredentials: true, // This ensures cookies are sent with the request
        }
      );
      setClientSecret(response.data.client_secret);

      // You can now open a modal dialog with the payment details or proceed as below
    } catch (error: any) {
      const errorMessage = error.response.data.error || "An error occurred";
      toast.error(errorMessage);
      console.error("Error creating payment intent:", error);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <StyledButton
        size="lg"
        bgColor={PALLETTE.cerise}
        // ... existing button props ...
        onClick={(e) => {
          handlePay(e);
        }}
      >
        {t("tickets.pay_button")}
      </StyledButton>
      {clientSecret && (
        <Modal open={true} onClose={() => setClientSecret(null)}>
          <ModalDialog color="primary" size="sm" variant="outlined">
            <ModalClose onClick={() => setClientSecret(null)} />
            <DialogTitle>
              <StyledText level="h3" color={PALLETTE.cerise} fontSize={24}>
                {t("tickets.payment.title")}
              </StyledText>
            </DialogTitle>
            <DialogContent>
              <Box>
                <StyledText level="body-md" color={PALLETTE.charcoal}>
                  {ticketType.name} - <b>{ticketType.price} SEK</b>
                </StyledText>
                <StyledText level="body-sm" color={PALLETTE.charcoal}>
                  {ticketType.description}
                </StyledText>
                <Box mt={2}>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        // customize your appearance options here
                      },
                    }}
                  >
                    <CheckoutForm ticketType={ticketType} />
                  </Elements>
                </Box>
              </Box>
            </DialogContent>
          </ModalDialog>
        </Modal>
      )}
    </>
  );
};

export default Payment;
