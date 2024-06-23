import React, { useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../components/forms/form_labels";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Option,
  Select,
  Stack,
} from "@mui/joy";
import {
  DefaultInputStyle,
  FormInput,
} from "../../../components/forms/input_types";
import { StyledErrorMessage } from "../../../components/forms/messages";
import { useTranslation } from "react-i18next";
import "../../../../node_modules/flag-icons/css/flag-icons.min.css";
import libphonenumber from "google-libphonenumber";

import "react-phone-number-input/style.css";
import PALLETTE from "../../../theme/pallette";
import StyledButton from "../../../components/buttons/styled_button";
import { AvaialableCountries, BusinessDetailsFormValues } from "../../../types";
import { BusinessDetailsFormSchema } from "../../../validation/manager/business_validation_form";

interface BusinessDetailsFormProps {
  submit: (values: BusinessDetailsFormValues) => void;
}

const BusinessDetailsForm: React.FC<BusinessDetailsFormProps> = ({
  submit,
}) => {
  const initialValues: BusinessDetailsFormValues = {
    country_code: "",
    legal_name: "",
    corporate_id: "",
    address_line1: "",
    address_line2: "",
    city: "",
    postal_code: "",
    phone_number: "",
    business_email: "",
    store_name: "",
  };

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BusinessDetailsFormSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => {
        submit(values);
      }}
    >
      {({ errors, touched, values }) => (
        <Form>
          <Grid container spacing={4} direction={"row"}>
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.legal_name")}*
                </StyledFormLabel>
                <FormInput
                  name="legal_name"
                  type="text"
                  label="Legal Name"
                  placeholder="Legal Name"
                />
                <StyledFormLabelWithHelperText>
                  {t(
                    "form.manager.setup.business_details.legal_name_helperText"
                  )}
                </StyledFormLabelWithHelperText>
                <StyledErrorMessage name="legal_name" />
              </FormControl>
            </Grid>
            '
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.corporate_id")}*
                </StyledFormLabel>
                <FormInput
                  name="corporate_id"
                  type="text"
                  label="Corporate ID"
                  placeholder="Corporate ID"
                />
                <StyledFormLabelWithHelperText>
                  {t(
                    "form.manager.setup.business_details.corporate_id_helperText"
                  )}
                </StyledFormLabelWithHelperText>
                <StyledErrorMessage name="corporate_id" />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.business_email")}*
                </StyledFormLabel>
                <FormInput
                  name="business_email"
                  type="email"
                  label="Business Email"
                  placeholder="Business Email"
                />
                <StyledFormLabelWithHelperText>
                  {t(
                    "form.manager.setup.business_details.business_email_helperText"
                  )}
                </StyledFormLabelWithHelperText>
                <StyledErrorMessage name="business_email" />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.store_name")}*
                </StyledFormLabel>
                <FormInput
                  name="store_name"
                  type="text"
                  label="Store Name"
                  placeholder="Store Name"
                />
                <StyledErrorMessage name="store_name" />
                <StyledFormLabelWithHelperText>
                  {t(
                    "form.manager.setup.business_details.store_name_helperText"
                  )}
                </StyledFormLabelWithHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                sx={{
                  width: "250px",
                }}
              >
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.country")}*
                </StyledFormLabel>
                <Field name="country_code">
                  {({ field, form }: any) => {
                    return (
                      <Select
                        {...field}
                        onChange={(_, newValue) => {
                          form.setFieldValue(field.name, newValue as number);
                        }}
                        style={{
                          ...DefaultInputStyle,
                        }}
                        slotProps={{
                          listbox: {
                            sx: {
                              position: "absolute", // Ensures that the listbox can be positioned relative to its normal position
                              left: "100%", // Moves the dropdown to the right of the Select
                              top: 0, // Aligns the dropdown with the top of the Select
                              zIndex: "tooltip", // Use a z-index that places the dropdown above other content
                            },
                          },
                        }}
                      >
                        {AvaialableCountries.map((c) => {
                          const className = `fi fi-${c.code.toLowerCase()}`;
                          return (
                            <Stack
                              direction="row"
                              key={c.code}
                              alignItems="center"
                              sx={{
                                width: "100%",
                              }}
                            >
                              <span
                                className={className}
                                style={{ marginRight: "8px" }}
                              />
                              <Option key={c.code} value={c.code}>
                                {c.name}
                              </Option>
                            </Stack>
                          );
                        })}
                      </Select>
                    );
                  }}
                </Field>
                <StyledFormLabelWithHelperText>
                  {t("form.manager.setup.business_details.country_helperText")}
                </StyledFormLabelWithHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.phone_number")}*
                </StyledFormLabel>
                <FormInput
                  name="phone_number"
                  type="text"
                  label="Phone Number"
                  placeholder="Phone Number"
                  startDecorator={
                    values.country_code
                      ? "+" +
                        AvaialableCountries.find(
                          (c) => c.code === values.country_code
                        )?.phone
                      : null
                  }
                />
                <StyledFormLabelWithHelperText>
                  {t(
                    "form.manager.setup.business_details.phone_number_helperText"
                  )}
                </StyledFormLabelWithHelperText>
                <StyledErrorMessage name="phone_number" />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.address_line1")}*
                </StyledFormLabel>
                <FormInput
                  name="address_line1"
                  type="text"
                  label="Address Line 1"
                  placeholder="Address Line 1"
                />
                <StyledFormLabelWithHelperText>
                  {t(
                    "form.manager.setup.business_details.address_line1_helperText"
                  )}
                </StyledFormLabelWithHelperText>
                <StyledErrorMessage name="address_line1" />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.address_line2")}
                </StyledFormLabel>
                <FormInput
                  name="address_line2"
                  type="text"
                  label="Address Line 2"
                  placeholder="Address Line 2"
                  required={false}
                />
                <StyledFormLabelWithHelperText>
                  {t(
                    "form.manager.setup.business_details.address_line2_helperText"
                  )}
                </StyledFormLabelWithHelperText>
                <StyledErrorMessage name="address_line2" />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.city")}*
                </StyledFormLabel>
                <FormInput
                  name="city"
                  type="text"
                  label="City"
                  placeholder="City"
                />
                <StyledFormLabelWithHelperText>
                  {t("form.manager.setup.business_details.city_helperText")}
                </StyledFormLabelWithHelperText>
                <StyledErrorMessage name="city" />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <StyledFormLabel>
                  {t("form.manager.setup.business_details.postal_code")}*
                </StyledFormLabel>
                <FormInput
                  name="postal_code"
                  type="text"
                  label="Postal Code"
                  placeholder="Postal Code"
                />
                <StyledFormLabelWithHelperText>
                  {t(
                    "form.manager.setup.business_details.postal_code_helperText"
                  )}
                </StyledFormLabelWithHelperText>
                <StyledErrorMessage name="postal_code" />
              </FormControl>
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            size="md"
            bgColor={PALLETTE.cerise}
            color={PALLETTE.charcoal}
            sx={{
              mt: 4,
            }}
          >
            {t("form.button_submit")}
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default BusinessDetailsForm;
