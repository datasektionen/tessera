import { useTranslation } from "react-i18next";
import StyledButton from "../../../buttons/styled_button";
import ConfirmModal from "../../../modal/confirm_modal";
import StyledText from "../../../text/styled_text";
import { Box, Divider, FormControl, Input } from "@mui/joy";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import PALLETTE from "../../../../theme/pallette";
import { DefaultInputStyle, FormInput } from "../../../forms/input_types";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  IDeadlineUnits,
  ITicketRelease,
  ITicketReleasePaymentDeadlineForm,
} from "../../../../types";
import { toast } from "react-toastify";
import { useState } from "react";
import { getEventRequest } from "../../../../redux/features/eventSlice";
import { fetchEventTicketsStart } from "../../../../redux/features/eventTicketsSlice";
import { on } from "events";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  getDurationUnits,
  parseDurationInput,
  paymentDurationToString,
  toGoDuration,
} from "../../../../utils/date_conversions";
import { StyledErrorMessage } from "../../../forms/messages";
import PaymentDeadlineForm from "./payment_deadline_form";
import { format } from "date-fns";

interface ConfirmTicketAllocationModalProps {
  ticketRelease: ITicketRelease;
  open: boolean;
  onClose: () => void;
  isCurrentlyOpen: () => boolean;
}

const ConfirmTicketAllocationModal: React.FC<
  ConfirmTicketAllocationModalProps
> = ({ ticketRelease, open, onClose, isCurrentlyOpen }) => {
  const { t } = useTranslation();
  const [allocationLoading, setAllocationLoading] = useState<boolean>(false);
  const [reservePaymentDuration, setReservePaymentDuration] =
    useState<IDeadlineUnits>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  const dispatch: AppDispatch = useDispatch();

  const handleAllocateTickets = async (
    values: ITicketReleasePaymentDeadlineForm
  ) => {
    setAllocationLoading(true);
    try {
      const data = {
        original_deadline: new Date(values.payment_deadline).toISOString(),
        reserve_payment_duration: toGoDuration(
          reservePaymentDuration.days,
          reservePaymentDuration.hours,
          reservePaymentDuration.minutes,
          reservePaymentDuration.seconds
        ),
      };
      const response = await axios.post(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/events/${ticketRelease.eventId!}/ticket-release/${
          ticketRelease.id
        }/allocate-tickets`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          toast.success("Tickets allocated successfully");
        }, 500);
        dispatch(
          getEventRequest({
            id: ticketRelease.eventId!,
            secretToken: "",
          })
        );
        dispatch(fetchEventTicketsStart(ticketRelease.eventId!));
      } else {
        const errorMessage = response.data?.message || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.log(error);
      toast.error(errorMessage);
    }
    setAllocationLoading(false);
    onClose();
  };

  return (
    <ConfirmModal
      isOpen={open}
      onClose={onClose}
      title={t("manage_event.allocate_tickets_confirm_title")}
      actions={[
        <StyledButton
          key="cancel"
          size="md"
          bgColor={PALLETTE.red}
          onClick={onClose}
          style={{ maxWidth: "150px" }}
        >
          {t("form.button_cancel")}
        </StyledButton>,
      ]}
    >
      <StyledText
        level="body-md"
        fontWeight={500}
        color={PALLETTE.charcoal}
        fontSize={18}
      >
        {isCurrentlyOpen() && (
          <StyledText
            level="body-md"
            fontWeight={700}
            color={PALLETTE.red}
            fontSize={18}
          >
            WARNING:{" "}
          </StyledText>
        )}
        {isCurrentlyOpen()
          ? t("manage_event.allocate_tickets_warning")
          : t("manage_event.allocate_tickets_confirm")}

        <Divider sx={{ my: 2 }} />
        <PaymentDeadlineForm
          onSubmit={handleAllocateTickets}
          reservePaymentDuration={reservePaymentDuration}
          setReservePaymentDuration={setReservePaymentDuration}
          initialValues={{
            payment_deadline: ticketRelease.payment_deadline?.original_deadline
              ? format(
                  new Date(ticketRelease.payment_deadline.original_deadline),
                  "yyyy-MM-dd"
                )
              : format(new Date(), "yyyy-MM-dd"),

            reserve_payment_duration: ticketRelease.payment_deadline
              ?.reserve_payment_duration
              ? paymentDurationToString(
                  ticketRelease.payment_deadline.reserve_payment_duration
                )
              : "",
          }}
        />
      </StyledText>
    </ConfirmModal>
  );
};

export default ConfirmTicketAllocationModal;
