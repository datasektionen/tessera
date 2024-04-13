import React, { useState } from "react";
import {
  Box,
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
} from "@mui/joy";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { format, parseISO } from "date-fns";
import StyledButton from "../../../buttons/styled_button";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ITicket } from "../../../../types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { FormCheckbox, FormInput } from "../../../forms/input_types";
import { StyledErrorMessage } from "../../../forms/messages";

const validationSchema = Yup.object().shape({
  payment_deadline: Yup.date().required("Payment deadline is required"),
  checked_in: Yup.boolean(),
});

interface TicketEditFormProps {
  ticket: ITicket;
  onClose: () => void;
  onSave: (values: any) => void;
}

const TicketEditForm: React.FC<TicketEditFormProps> = ({
  ticket,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();

  const intialValues = {
    payment_deadline: ticket.payment_deadline?.toLocaleString().slice(0, 16),
    checked_in: ticket.checked_in,
  };

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnBlur={true}
      initialValues={intialValues}
      onSubmit={(values) => {
        onSave({
          payment_deadline: parseISO(values.payment_deadline!),
          checked_in: values.checked_in,
        });
      }}
    >
      <Form>
        <FormControl>
          <StyledFormLabel>
            {t("manage_event.tickets.ticket_info.payment_deadline")}
          </StyledFormLabel>
          <FormInput
            name="payment_deadline"
            label="Payment Deadline"
            type="datetime-local"
            placeholder=""
          />
          <StyledErrorMessage name="payment_deadline" />
          <StyledFormLabelWithHelperText>
            {t(
              "manage_event.tickets.ticket_info.edit.payment_deadline_helperText"
            )}
          </StyledFormLabelWithHelperText>
        </FormControl>
        <FormControl>
          <StyledFormLabel>
            {t("manage_event.tickets.ticket_info.checked_in")}
          </StyledFormLabel>
          <FormCheckbox name="checked_in" label="Checked In" />
          <StyledFormLabelWithHelperText>
            {t("manage_event.tickets.ticket_info.edit.checked_in_helperText")}
          </StyledFormLabelWithHelperText>
        </FormControl>
        <StyledButton
          size="md"
          color="primary"
          type="submit"
          style={{ marginRight: "10px" }}
          bgColor={PALLETTE.green}
        >
          {t("form.button_submit")}
        </StyledButton>
      </Form>
    </Formik>
  );
};

export default TicketEditForm;
