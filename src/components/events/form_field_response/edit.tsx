import { Box, Divider, FormControl } from "@mui/joy";
import {
  EventFormFieldsArray,
  IEvent,
  IEventFormField,
  ITicket,
  ITicketRequest,
} from "../../../types";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../forms/form_labels";
import { FormCheckbox, FormInput, FormTextarea } from "../../forms/input_types";
import * as Yup from "yup";
import { StyledErrorMessage } from "../../forms/messages";
import StyledButton from "../../buttons/styled_button";
import axios from "axios";
import { handleEventFormFieldResponseSubmit } from "../../../redux/sagas/axios_calls/event_form_fields";
import { toast } from "react-toastify";
import React from "react";
import ReactMarkdown from "react-markdown";

interface EditFormFieldResponsePropsBase {
  formFields: IEventFormField[];
  ticketRequest: ITicketRequest;
}

const createField = (field: IEventFormField) => {
  const getFieldType = (type: string) => {
    switch (type) {
      case "text":
        return (
          <FormTextarea
            name={field.id.toString()}
            label="text"
            placeholder="Enter text"
            overrideStyle={{
              width: "90%",
            }}
          />
        );
      case "number":
        return (
          <FormInput
            name={field.id.toString()}
            label="number"
            type="number"
            placeholder="Enter number"
          />
        );
      case "checkbox":
        return <FormCheckbox name={field.id.toString()} label="checkbox" />;
      default:
        return null;
    }
  };

  return (
    <Box key={field.id}>
      <StyledFormLabel>
        {field.name}
        {field.is_required ? "*" : ""}
      </StyledFormLabel>
      <FormControl>
        {getFieldType(field.type)}
        <StyledFormLabelWithHelperText>
          {field.description}
        </StyledFormLabelWithHelperText>
        <StyledErrorMessage name={field.id.toString()} />
      </FormControl>
    </Box>
  );
};

const EditFormFieldResponseBase: React.FC<EditFormFieldResponsePropsBase> = ({
  formFields,
  ticketRequest,
}) => {
  const { t } = useTranslation();

  const createValidationSchema = () => {
    let schema: any = {};
    formFields.forEach((field) => {
      switch (field.type) {
        case "text":
          schema[field.id.toString()] = field.is_required
            ? Yup.string().required(`${field.name} is required`)
            : Yup.string();
          break;
        case "number":
          schema[field.id.toString()] = field.is_required
            ? Yup.number().required(`${field.name} is required`)
            : Yup.number();
          break;
        case "checkbox":
          schema[field.id.toString()] = field.is_required
            ? Yup.boolean().oneOf([true], `${field.name} must be checked`)
            : Yup.boolean();
          break;
        default:
          break;
      }
    });

    return Yup.object().shape(schema);
  };

  const handleSubmit = (values: IEventFormField[]) => {
    // /events/:eventID/ticket-requests/:ticketRequestID/form-fields
    // body {EventFormFieldID, value}
    const formFieldValues = formFields.map((field) => {
      const val = values[field.id.toString() as keyof typeof values];
      let value: string = "";

      if (typeof val === "boolean") {
        value = val ? "true" : "false";
      } else if (typeof val === "number") {
        value = val.toString();
      } else if (val !== undefined) {
        // @ts-ignore
        value = val.toString(); // Fix: Assign the string value of `val` to `value`.
      }

      return {
        event_form_field_id: field.id,
        value: value,
      };
    });
    const event_id = formFields[0].event_id;

    handleEventFormFieldResponseSubmit(
      formFieldValues,
      event_id,
      ticketRequest.id
    ).then((response) => {
      if (response.success) {
        toast.success("Form field response submitted");
      } else {
        toast.error(response.error);
      }
    });
  };

  const convertStringToBoolean = (value: string, type: string) => {
    if (type === "checkbox") {
      return value === "true";
    } else if (type === "number") {
      return parseInt(value);
    }

    return value;
  };

  const createInitialValues = (): IEventFormField[] => {
    const values = ticketRequest.event_form_responses || [];
    let initialValues: any = {};
    formFields.forEach((field) => {
      const response = values.find(
        (value) => value.event_form_field_id === field.id
      );
      if (response !== undefined) {
        initialValues[field.id.toString()] = convertStringToBoolean(
          response.value as string,
          field.type
        );
      }

      console.log("initialValues", initialValues);
    });

    return initialValues;
  };

  createInitialValues();

  return (
    <Box>
      <StyledText
        level="body-sm"
        fontSize={22}
        color={PALLETTE.cerise}
        fontWeight={700}
        sx={{ mt: 2 }}
      >
        {t("event_form_fields.title")}
      </StyledText>
      <StyledText
        level="body-sm"
        fontSize={16}
        color={PALLETTE.charcoal_see_through}
        sx={{ mb: 2 }}
      >
        {t("event_form_fields.description")}
      </StyledText>
      <StyledText
        level="body-sm"
        fontSize={16}
        color={PALLETTE.charcoal}
        sx={{ mb: 2 }}
      >
        <ReactMarkdown>
          {ticketRequest.ticket_release?.event?.form_field_description}
        </ReactMarkdown>
      </StyledText>
      <Divider sx={{ mb: 2 }} />
      <Formik
        initialValues={createInitialValues()}
        validationSchema={createValidationSchema()}
        validateOnChange={true}
        validateOnMount={true}
        validateOnBlur={true}
        enableReinitialize={true}
        onSubmit={(values: IEventFormField[]) => {
          handleSubmit(values);
        }}
      >
        {({ isValid }) => {
          if (formFields.length === 0) {
            return (
              <StyledText
                level="body-sm"
                fontSize={20}
                fontWeight={600}
                color={PALLETTE.orange}
              >
                {t("event_form_fields.no_form_fields")}
              </StyledText>
            );
          }
          return (
            <Form>
              {formFields.map((field) => {
                return createField(field);
              })}
              <StyledText
                level="body-sm"
                fontSize={16}
                color={PALLETTE.charcoal}
                sx={{ mb: 2 }}
              >
                {t("event_form_fields.accept_terms_and_conditions")}
              </StyledText>
              <StyledButton
                type="submit"
                size="md"
                bgColor={PALLETTE.green}
                disabled={!isValid}
                sx={{ mt: 2 }}
              >
                {t("form.button_submit")}
              </StyledButton>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

interface EditFormFieldResponseProps {
  ticket?: ITicket;
  ticketRequest?: ITicketRequest;
}

const EditFormFieldResponse: React.FC<EditFormFieldResponseProps> = ({
  ticket,
  ticketRequest,
}) => {
  if (ticket !== undefined) {
    return (
      <EditFormFieldResponseBase
        ticketRequest={ticket.ticket_request!}
        formFields={ticket.ticket_request?.ticket_release?.event?.form_fields!}
      />
    );
  } else if (ticketRequest !== undefined) {
    return (
      <EditFormFieldResponseBase
        ticketRequest={ticketRequest}
        formFields={ticketRequest.ticket_release?.event?.form_fields!}
      />
    );
  } else {
    return <></>;
  }
};

export default EditFormFieldResponse;
