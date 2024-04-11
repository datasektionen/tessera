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
import { ITicketRelease } from "../../../../types";
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
} from "../../../../utils/date_conversions";
import { StyledErrorMessage } from "../../../forms/messages";

interface ConfirmTicketAllocationModalProps {
  ticketRelease: ITicketRelease;
  open: boolean;
  onClose: () => void;
  isCurrentlyOpen: () => boolean;
  payWithinHours: number;
  setPayWithinHours: (hours: number) => void;
}

interface ITicketReleasePaymentDeadlineForm {
  payment_deadline: Date;
  reserve_payment_duration: string;
}

const PaymentDeadlineFormValidation = Yup.object().shape({
  payment_deadline: Yup.date()
    .test("is-valid-date", "Invalid date", (value) => {
      if (!value) {
        return false;
      }
      return value.getTime() > Date.now();
    })
    .required("Required"),
  reserve_payment_duration: Yup.string()
    .test("is-valid-duration", "Invalid duration", (value) => {
      if (!value) {
        return false;
      }
      try {
        console.log(parseDurationInput(value));

        return parseDurationInput(value) !== 0;
      } catch (error) {
        return false;
      }
    })
    .required("Required"),
});

const ConfirmTicketAllocationModal: React.FC<
  ConfirmTicketAllocationModalProps
> = ({
  ticketRelease,
  open,
  onClose,
  isCurrentlyOpen,
  payWithinHours,
  setPayWithinHours,
}) => {
  const { t } = useTranslation();
  const [allocationLoading, setAllocationLoading] = useState<boolean>(false);
  const [reservePaymentDuration, setReservePaymentDuration] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
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
      console.log(values);
      const response = await axios.post(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/events/${ticketRelease.eventId!}/ticket-release/${
          ticketRelease.id
        }/allocate-tickets`,
        {
          payment_deadline: values.payment_deadline.getTime() / 1000,
          reserve_payment_duration: parseDurationInput(
            values.reserve_payment_duration
          ),
        },
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

  console.log(reservePaymentDuration);

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
        <Formik
          initialValues={{
            payment_deadline: new Date(),
            reserve_payment_duration: "",
          }}
          validationSchema={PaymentDeadlineFormValidation}
          onSubmit={async (values) => {
            console.log(values);
          }}
          validateOnBlur={true}
          validateOnChange={true}
        >
          {({ values, isValid, errors }) => {
            return (
              <Form
                onChange={(e) => {}}
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleAllocateTickets(values);
                }}
              >
                <FormControl>
                  <StyledFormLabel>
                    {t("manage_event.payment_deadline")}
                  </StyledFormLabel>
                  <FormInput
                    type="datetime-local"
                    name="payment_deadline"
                    label="Payment Deadline"
                    placeholder=""
                    overrideStyle={{
                      width: "250px",
                    }}
                  />
                  <StyledErrorMessage name="payment_deadline" />
                  <StyledFormLabelWithHelperText>
                    {t("manage_event.payment_deadline_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>
                <FormControl>
                  <StyledFormLabel>
                    {t("manage_event.reserve_payment_duration")}
                  </StyledFormLabel>
                  <FormInput
                    type="text"
                    name="reserve_payment_duration"
                    label="Reserve Payment Duration"
                    placeholder="7d 12h"
                    afterChange={(e) => {
                      setReservePaymentDuration(
                        getDurationUnits(e.target.value)
                      );
                    }}
                  />
                  <StyledErrorMessage name="reserve_payment_duration" />
                  <StyledFormLabelWithHelperText>
                    {t("manage_event.reserve_payment_duration_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>
                <StyledText
                  level="body-md"
                  fontWeight={600}
                  color={PALLETTE.charcoal}
                  fontSize={18}
                >
                  {t("manage_event.reserve_payment_duration_text", {
                    ...reservePaymentDuration,
                  })}
                </StyledText>
                <Box>
                  <StyledButton
                    key="cancel"
                    size="md"
                    bgColor={PALLETTE.green}
                    type="submit"
                    sx={{ mt: 2 }}
                    style={{ width: "150px" }}
                  >
                    {t("form.button_submit")}
                  </StyledButton>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </StyledText>
    </ConfirmModal>
  );
};

export default ConfirmTicketAllocationModal;
