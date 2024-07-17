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
import { IGuestCustomer, ITicket, ITicketType } from "../../../types";
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
import { useCosts, useTicketCost } from "../../events/payments/use_cost";
import { useNavigate } from "react-router-dom";

let stripePromise: any;

if (process.env.NODE_ENV === "production") {
  stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PROD_KEY! as string);
} else {
  stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY! as string);
}

interface PaymentProps {
  ticket: ITicket;
  isGuestCustomer?: boolean;
  guestCustomer?: IGuestCustomer;
}

const Payment: React.FC<PaymentProps> = ({
  ticket,
  isGuestCustomer = false,
  guestCustomer,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const ticketType = ticket?.ticket_type!;

  const { totalCost } = useTicketCost(ticket!);

  const handlePay = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if guest: /guest-customer/:ugkthid/tickets/:ticketID/create-payment-intent
    // Else: /payments/events/:referenceID/tickets/create
    // TODO: modify the guest customer endpoint to use the new endpoint
    const url =
      process.env.REACT_APP_BACKEND_URL +
      (isGuestCustomer
        ? `/guest-customer/${guestCustomer?.user_id}/tickets/${ticket.id}/create-payment-intent?request_token=${guestCustomer?.request_token}`
        : `/payments/events/${ticket.ticket_order?.ticket_release?.event?.reference_id}/order/create`);

    // Request to create a payment intent
    try {
      const response = await axios.post(
        url,
        {
          ticket_ids: [ticket.id],
        },
        {
          withCredentials: true,
        }
      );

      const paymentPageLink = response.data.order.paymentPageLink;
      window.location.href = paymentPageLink;

      // You can now open a modal dialog with the payment details or proceed as below
    } catch (error: any) {
      const errorMessage = error.response.data.error || "An error occurred";
      toast.error(errorMessage);
      console.error("Error creating payment intent:", error);
    }
  };

  const { t } = useTranslation();

  // Return URL depends on whether the user is a guest or not
  // For guest is the exact same, with query param and everything
  const returnUrl = isGuestCustomer
    ? window.location.href
    : process.env.REACT_APP_FRONTEND_URL + "/profile/tickets";

  return (
    <>
      <StyledButton
        size="lg"
        bgColor={PALLETTE.cerise}
        color={PALLETTE.charcoal}
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
                  <b>{totalCost} SEK</b>
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
                    <CheckoutForm
                      ticket={ticket}
                      ticketType={ticketType}
                      returnURL={returnUrl}
                    />
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
