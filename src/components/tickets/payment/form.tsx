import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { IEvent, ITicket, ITicketType } from "../../../types";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import StyledButton from "../../buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import { CircularProgress } from "@mui/joy";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCosts } from "../../events/payments/use_cost";

interface CheckoutFormProps {
  ticket: ITicket;
  ticketType: ITicketType;
  returnURL?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  ticket,
  ticketType,
  returnURL = process.env.REACT_APP_BASE_URL! + "/profile/tickets",
}) => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { totalCost } = useCosts(ticket.ticket_request!);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    console.log(returnURL);
    console.log(process.env.REACT_APP_BASE_URL + returnURL);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: returnURL,
        receipt_email:
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_TEST_EMAIL
            : currentUser?.email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    console.log(error);
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message!);
      toast.error(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
      toast.error("An unexpected error occurred, contact event organizer.");
    }

    setTimeout(() => {
      toast.success(
        "Your ticket purchase was successful! You may need to reload the page to see the updated status."
      );
    }, 500);
    setIsLoading(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement
          id="payment-element"
          options={{
            layout: "tabs",
          }}
        />
        <StyledButton
          size="lg"
          disabled={isLoading || !stripe || !elements}
          type="submit"
          bgColor={PALLETTE.green}
          style={{
            marginTop: "16px",
            width: "100%",
          }}
        >
          <span id="button-text">
            {isLoading ? (
              <CircularProgress color="primary" size={"sm"} variant="plain" />
            ) : (
              t("tickets.payment.pay_now", {
                price: totalCost,
              })
            )}
          </span>
        </StyledButton>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
};

export default CheckoutForm;
