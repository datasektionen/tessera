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
  Sheet,
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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import LoadingOverlay from "../../../Loading";
import ConfirmModal from "../../../modal/confirm_modal";

interface EventFormFieldsProps {
  event: IEvent;
  refetchEvent: () => void;
}

const EditEventFormFields: React.FC<EventFormFieldsProps> = ({
  event,
  refetchEvent,
}) => {
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    const res = (await handleEventFormFieldsSubmit(event.id, values)) as {
      success?: boolean;
      error?: string;
    };

    if (res.success) {
      setTimeout(() => {
        toast.success("Form fields updated");
      }, 200);
      refetchEvent();
    } else {
      toast.error(res.error);
    }

    setSubmitting(false);
  };

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  return (
    <Box>
      {submitting && <LoadingOverlay />}
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
                width: "95%",
              }}
            />
            <StyledErrorMessage name="form_field_description" />
            <StyledFormLabelWithHelperText>
              {t("form.event_fields.form_field_description_helperText")}
            </StyledFormLabelWithHelperText>

            <Divider sx={{ my: 1 }} />

            <Stack direction="row" sx={{ my: 1, px: 2 }} spacing={2}>
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
                  width: "350px",
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

                const items = Array.from(values.form_fields);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);

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
                                    <Box
                                      style={{
                                        position: "relative",
                                        border: "1px solid " + PALLETTE.cerise,
                                        backgroundColor:
                                          PALLETTE.offWhite + " !important",
                                      }}
                                      my={1}
                                      px={2}
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
                                          <ConfirmModal
                                            title="Delete Field"
                                            isOpen={openDeleteConfirm}
                                            onClose={() =>
                                              setOpenDeleteConfirm(false)
                                            }
                                            actions={[
                                              <StyledButton
                                                size="sm"
                                                onClick={() => {
                                                  setOpenDeleteConfirm(false);
                                                  remove(index);
                                                }}
                                              >
                                                {t("form.button_confirm")}
                                              </StyledButton>,
                                              <StyledButton
                                                size="sm"
                                                bgColor={PALLETTE.red}
                                                onClick={() =>
                                                  setOpenDeleteConfirm(false)
                                                }
                                              >
                                                {t("form.button_cancel")}
                                              </StyledButton>,
                                            ]}
                                          >
                                            <StyledText
                                              level="body-sm"
                                              color={PALLETTE.charcoal}
                                              fontSize={18}
                                            >
                                              {t(
                                                "form.event_fields.delete_field_confirm"
                                              )}
                                            </StyledText>
                                          </ConfirmModal>
                                          <StyledButton
                                            size="sm"
                                            type="button"
                                            onClick={() => {
                                              setOpenDeleteConfirm(true);
                                            }}
                                            style={{
                                              marginLeft: "128px",
                                            }}
                                          >
                                            {t("form.button_delete")}
                                          </StyledButton>
                                        </Box>
                                      </Stack>
                                      <Box
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                        }}
                                      >
                                        <DragIndicatorIcon
                                          style={{
                                            color: PALLETTE.charcoal,
                                          }}
                                        />
                                      </Box>
                                    </Box>
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
