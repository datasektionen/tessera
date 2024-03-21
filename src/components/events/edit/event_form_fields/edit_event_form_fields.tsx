import React, { useState, useEffect } from "react";
import {
  EventFormFields,
  IEvent,
  IEventFormField,
  IEventFormFieldInput,
} from "../../../../types";
import axios from "axios";
import * as Yup from "yup";
import { Field, FieldArray, Form, Formik, useFormikContext } from "formik";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Option,
  Select,
  Stack,
} from "@mui/joy";
import {
  DefaultInputStyle,
  FormCheckbox,
  FormInput,
  FormTextarea,
} from "../../../forms/input_types";
import StyledButton from "../../../buttons/styled_button";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { InputLabel } from "@mui/material";
import { mt } from "date-fns/locale";
import { formFieldSchema } from "../../../../validation/event_form_fields";
import { handleEventFormFieldsSubmit } from "../../../../redux/sagas/axios_calls/event_form_fields";
import { toast } from "react-toastify";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { StyledErrorMessage } from "../../../forms/messages";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface EventFormFieldsProps {
  event: IEvent;
}

const EditEventFormFields: React.FC<EventFormFieldsProps> = ({ event }) => {
  const initialValues: IEventFormFieldInput =
    event.form_fields !== undefined
      ? {
          form_field_description: event.form_field_description || "",
          form_fields: event.form_fields,
        }
      : {
          form_field_description: "",
          form_fields: [
            { name: "", type: "", description: "", is_required: false },
          ],
        };

  const { t } = useTranslation();

  const handleSubmit = async (values: IEventFormFieldInput) => {
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
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <StyledFormLabel>
              {t("form.event_fields.form_field_description")}
            </StyledFormLabel>
            <FormTextarea
              label="Form Field Description"
              name="form_field_description"
              placeholder="Form Field Description"
              required={false}
              overrideStyle={{
                width: "80%",
              }}
            />
            <StyledErrorMessage name="form_field_description" />
            <StyledFormLabelWithHelperText>
              {t("form.event_fields.form_field_description_helperText")}
            </StyledFormLabelWithHelperText>

            <Divider sx={{ my: 1 }} />

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
              <StyledFormLabel
                overrideStyles={{
                  width: "200px",
                }}
              >
                {t("form.event_fields.label_required")}
              </StyledFormLabel>
            </Stack>
            <DragDropContext
              onDragEnd={(result) => {
                if (!result.destination) {
                  return;
                }

                console.log(values.form_fields);

                const items = Array.from(values.form_fields);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);

                console.log(items);

                setFieldValue("form_fields", items);
              }}
            >
              <FieldArray name="form_fields">
                {({ insert, remove, push }) => (
                  <Box key={values.form_fields.length}>
                    <Droppable droppableId="formFields">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {values.form_fields.length > 0 &&
                            values.form_fields.map((field, index) => (
                              <Draggable
                                draggableId={String(index)}
                                index={index}
                                key={index}
                              >
                                {(
                                  provided // Added parent element for JSX expressions
                                ) => (
                                  <div
                                    key={index}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Stack
                                      key={index}
                                      direction="row"
                                      spacing={2}
                                      sx={{
                                        my: 1,
                                      }}
                                    >
                                      <Box>
                                        <FormInput
                                          label="Field Name"
                                          name={`form_fields.${index}.name`}
                                          placeholder="Field Name"
                                        />
                                        <StyledErrorMessage
                                          name={`form_fields.${index}.name`}
                                        />
                                      </Box>
                                      <Box>
                                        <Field
                                          name={`form_fields.${index}.type`}
                                        >
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
                                                {EventFormFields.map(
                                                  (option) => (
                                                    <Option
                                                      key={option.id}
                                                      value={option.id}
                                                    >
                                                      {option.label}
                                                    </Option>
                                                  )
                                                )}
                                              </Select>
                                            );
                                          }}
                                        </Field>
                                        <StyledErrorMessage
                                          name={`form_fields.${index}.type`}
                                        />
                                      </Box>

                                      <Box>
                                        <FormTextarea
                                          label="Field Description"
                                          name={`form_fields.${index}.description`}
                                          placeholder="Field Description"
                                        />
                                        <StyledErrorMessage
                                          name={`form_fields.${index}.description`}
                                        />
                                      </Box>

                                      <Box>
                                        <FormCheckbox
                                          label="Required"
                                          name={`form_fields.${index}.is_required`}
                                        />
                                      </Box>

                                      <Box>
                                        <StyledButton
                                          size="sm"
                                          type="button"
                                          onClick={() => remove(index)}
                                          style={{
                                            marginLeft: "128px",
                                          }}
                                        >
                                          {t("form.button_delete")}
                                        </StyledButton>
                                      </Box>
                                    </Stack>
                                    <Divider sx={{ my: 1 }} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
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
            </DragDropContext>

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
