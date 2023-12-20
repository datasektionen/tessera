import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ITicket } from "../../../types";
import StyledButton from "../../buttons/styled_button";

interface PaymentProps {
  ticket: ITicket;
}

const Payment: React.FC<PaymentProps> = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const { ticket } = props;
  const ticketType = ticket.ticket_request?.ticket_type;

  console.log(ticket);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log("Card element not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // send the payment method id to your server for payment processing
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {/* other form inputs and submit button */}

      <StyledButton
        size="lg"
        type="submit"
        color="primary"
        disabled={!stripe}
        style={{
          marginTop: "16px",
        }}
      >
        Pay
      </StyledButton>
    </form>
  );
};

export default Payment;
