import React, { useState, useEffect } from "react";
import {
  EventFormFields,
  IEvent,
  IEventFormField,
  IEventFormFieldInput,
} from "../../../../types";
import axios from "axios";
import * as Yup from "yup";
import { Field, FieldArray, Form, Formik } from "formik";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { Box, FormControl, MenuItem, Option, Select, Stack } from "@mui/joy";
import { DefaultInputStyle, FormInput } from "../../../forms/input_types";
import StyledButton from "../../../buttons/styled_button";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { InputLabel } from "@mui/material";
import { mt } from "date-fns/locale";
import { formFieldSchema } from "../../../../validation/event_form_fields";
import { handleEventFormFieldsSubmit } from "../../../../redux/sagas/axios_calls/event_form_fields";
import { toast } from "react-toastify";
import { StyledFormLabel } from "../../../forms/form_labels";

interface EventFormFieldsProps {
  event: IEvent;
}

const EditEventFormFields: React.FC<EventFormFieldsProps> = ({ event }) => {
  const initialValues: { formFields: IEventFormFieldInput[] } = {
    formFields: event.form_fields || [{ name: "", type: "", description: "" }],
  };

  const { t } = useTranslation();

  const handleSubmit = async (values: {
    formFields: IEventFormFieldInput[];
  }) => {
    console.log(values);
    const res = (await handleEventFormFieldsSubmit(event.id, values)) as {
      success?: boolean;
      error?: string;
    };

    if (res.success) {
      toast.success("Form fields updated");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={formFieldSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Stack direction="row" sx={{ my: 1 }} spacing={2}>
              <StyledFormLabel
                overrideStyles={{
                  width: "200px",
                }}
              >
                {t("form.event_fields.label_name")}
              </StyledFormLabel>
              <StyledFormLabel
                overrideStyles={{
                  width: "200px",
                }}
              >
                {t("form.event_fields.label_type")}
              </StyledFormLabel>
              <StyledFormLabel
                overrideStyles={{
                  width: "200px",
                }}
              >
                {t("form.event_fields.label_description")}
              </StyledFormLabel>
            </Stack>
            <FieldArray name="formFields">
              {({ insert, remove, push }) => (
                <Box>
                  {values.formFields.length > 0 &&
                    values.formFields.map((field, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        spacing={2}
                        sx={{
                          my: 1,
                        }}
                      >
                        <FormInput
                          label="Field Name"
                          name={`formFields.${index}.name`}
                          placeholder="Field Name"
                        />

                        <Field name={`formFields.${index}.type`}>
                          {({ field, form }: any) => {
                            return (
                              <Select
                                {...field}
                                onChange={(_, newValue) => {
                                  form.setFieldValue(
                                    field.name,
                                    newValue as number
                                  );
                                }}
                                style={DefaultInputStyle}
                                placeholder="Select a field type"
                              >
                                {EventFormFields.map((option) => (
                                  <Option key={option.id} value={option.id}>
                                    {option.label}
                                  </Option>
                                ))}
                              </Select>
                            );
                          }}
                        </Field>

                        <FormInput
                          label="Field Description"
                          name={`formFields.${index}.description`}
                          placeholder="Field Description"
                        />

                        <StyledButton
                          size="sm"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          {t("form.button_delete")}
                        </StyledButton>
                      </Stack>
                    ))}
                  <StyledButton
                    size="sm"
                    type="button"
                    onClick={() =>
                      push({ name: "", type: "", description: "" })
                    }
                    sx={{
                      mt: 2,
                    }}
                  >
                    {t("form.button_add_field")}
                  </StyledButton>
                </Box>
              )}
            </FieldArray>
            <StyledButton
              size="lg"
              type="submit"
              bgColor={PALLETTE.green}
              sx={{ mt: 2 }}
            >
              {t("form.button_save")}
            </StyledButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditEventFormFields;
