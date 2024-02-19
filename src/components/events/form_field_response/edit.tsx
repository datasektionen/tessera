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
import { FormCheckbox, FormInput } from "../../forms/input_types";
import * as Yup from "yup";
import { StyledErrorMessage } from "../../forms/messages";

interface EditFormFieldResponsePropsBase {
  formFields: IEventFormField[];
}

const createField = (field: IEventFormField) => {
  const getFieldType = (type: string) => {
    switch (type) {
      case "text":
        return (
          <FormInput
            name={field.id.toString()}
            label="text"
            type="text"
            placeholder="Enter text"
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

  return (
    <Box>
      <StyledText
        level="body-sm"
        fontSize={22}
        color={PALLETTE.cerise}
        fontWeight={700}
        sx={{ mt: 2 }}
      >
        {t("ticket_request.ticket_request_response")}
      </StyledText>
      <Formik
        initialValues={{}}
        validationSchema={createValidationSchema()}
        validateOnChange={true}
        validateOnMount={true}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log("values", values);
        }}
      >
        <Form>
          {formFields.map((field) => {
            return createField(field);
          })}
        </Form>
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
        formFields={ticket.ticket_request?.ticket_release?.event?.form_fields!}
      />
    );
  } else if (ticketRequest !== undefined) {
    return (
      <EditFormFieldResponseBase
        formFields={ticketRequest.ticket_release?.event?.form_fields!}
      />
    );
  } else {
    return <></>;
  }
};

export default EditFormFieldResponse;
