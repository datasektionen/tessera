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
import { useCosts } from "../../events/payments/use_cost";

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
  const ticketType = ticket.ticket_request?.ticket_type!;

  const { totalCost } = useCosts(ticket.ticket_request!);

  const handlePay = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if guest: /guest-customer/:ugkthid/tickets/:ticketID/create-payment-intent
    // Else: /tickets/:ticketID/create-payment-intent
    const url =
      process.env.REACT_APP_BACKEND_URL +
      (isGuestCustomer
        ? `/guest-customer/${guestCustomer?.ug_kth_id}/tickets/${ticket.id}/create-payment-intent?request_token=${guestCustomer?.request_token}`
        : `/tickets/${ticket.id}/create-payment-intent`);

    // Request to create a payment intent
    try {
      const response = await axios.get(url, {
        withCredentials: !isGuestCustomer, // This ensures cookies are sent with the request
      });
      setClientSecret(response.data.client_secret);

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
