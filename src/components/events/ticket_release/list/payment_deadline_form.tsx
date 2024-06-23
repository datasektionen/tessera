import { Box, FormControl } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { FormInput } from "../../../forms/input_types";
import { StyledErrorMessage } from "../../../forms/messages";
import { getDurationUnits } from "../../../../utils/date_conversions";
import PaymentDeadlineFormValidation from "../../../../validation/event/payment_deadline_form_validation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import StyledButton from "../../../buttons/styled_button";
import {
  IDeadlineUnits,
  ITicketRelease,
  ITicketReleasePaymentDeadlineForm,
} from "../../../../types";
import {
  ticketReleaseHasClosed,
  ticketReleaseHasNotOpened,
  ticketReleaseHasOpened,
} from "../../../../utils/event_open_close";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { format } from "date-fns";

interface PaymentDeadlineFormProps {
  onSubmit: (values: any) => void;
  reservePaymentDuration: IDeadlineUnits;
  setReservePaymentDuration: (values: any) => void;
  initialValues: ITicketReleasePaymentDeadlineForm;
}

const PaymentDeadlineForm: React.FC<PaymentDeadlineFormProps> = ({
  onSubmit,
  reservePaymentDuration,
  setReservePaymentDuration,
  initialValues,
}) => {
  const { t } = useTranslation();

  const { timestamp } = useSelector((state: RootState) => state.timestamp);

  useEffect(() => {
    setReservePaymentDuration(
      getDurationUnits(initialValues.reserve_payment_duration)
    );
  }, [initialValues.reserve_payment_duration, setReservePaymentDuration]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PaymentDeadlineFormValidation}
      onSubmit={async (values) => {}}
      validateOnBlur={true}
      validateOnChange={true}
      enableReinitialize={true}
    >
      {({ values, isValid, errors }) => {
        return (
          <Form
            onChange={(e) => {}}
            onSubmit={async (e) => {
              e.preventDefault();
              await onSubmit(values);
            }}
          >
            <FormControl>
              <StyledFormLabel>
                {t("manage_event.payment_deadline")}
              </StyledFormLabel>
              <FormInput
                type="datetime"
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
                  setReservePaymentDuration(getDurationUnits(e.target.value));
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
  );
};

export default PaymentDeadlineForm;
