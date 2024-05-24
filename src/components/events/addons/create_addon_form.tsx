import { Box, Divider, FormControl, Grid } from "@mui/joy";
import { Formik, Form } from "formik";
import { StyledFormLabel, StyledFormLabelWithHelperText } from "../../forms/form_labels";
import { FormCheckbox, FormInput, FormTextarea } from "../../forms/input_types";
import { StyledErrorMessage } from "../../forms/messages";
import StyledButton from "../../buttons/styled_button";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

import AddonFormSchema from "../../../validation/edit_addons_form";
import { setAddons, clearAddon, updateAddon } from "../../../redux/features/addonCreationSlice";
import { IAddon } from "../../../types";

interface CreateAddonFormProps {
  addons: IAddon[];
  ticketReleaseID: number;
  selectedAddon: number;
  validateAllForms: () => void;
}

const CreateAddonForm: React.FC<CreateAddonFormProps> = ({
  addons,
  selectedAddon,
  ticketReleaseID,
  validateAllForms,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleFieldChange = (fieldName: string, value: any, index: number) => {
    // Update the local form state and dispatch the update to the Redux store
    dispatch(
      updateAddon({
        index,
        values: { ...addons[index], [fieldName]: value },
      })
    );
  };

  useEffect(() => {
    validateAllForms();
  }, [addons]);

  return (
    <>
      {addons.map((addon: IAddon, index) => (
        <Box
          key={index}
          style={{
            display: index === selectedAddon ? "inherit" : "none",
          }}
        >

          <Formik
            key={index}
            initialValues={addon}
            validationSchema={AddonFormSchema}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={true}
            onSubmit={(values: IAddon) => {
              dispatch(updateAddon({ index, values }));
            }}
            enableReinitialize
          >
            {({ handleChange, handleSubmit }) => {
              return (
                <Form
                  onSubmit={handleSubmit}
                  onFocus={() => {
                    validateAllForms();
                  }}
                  onBlur={() => {
                    validateAllForms();
                  }}
                >
                  {/* Form fields adjusted for add-on properties */}
                  <FormControl>
                    <StyledFormLabel>{t("form.addon.name")}*</StyledFormLabel>
                    <FormInput
                      label="Name"
                      name="name"
                      placeholder="Addon name"
                      onChange={(e: any) => {
                        handleChange(e);
                        // Optionally dispatch on change instead of on submit
                        handleFieldChange("name", e.target.value, index);
                      }}
                    />
                    <StyledFormLabelWithHelperText>
                      {t("form.addon.name_helperText")}
                    </StyledFormLabelWithHelperText>
                    <StyledErrorMessage name="name" />
                  </FormControl>

                  <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                  <FormControl>
                    <StyledFormLabel>{t("form.addon.contains_alcohol")}</StyledFormLabel>
                    <FormCheckbox
                      label="Contains Alcohol"
                      name="contains_alcohol"
                      onChange={(e: any) => {
                        handleChange(e);
                        // Optionally dispatch on change instead of on submit
                        handleFieldChange("contains_alcohol", e.target.checked, index);
                      }}
                    />
                    <StyledFormLabelWithHelperText>
                      {t("form.addon.contains_alcohol_helperText")}
                    </StyledFormLabelWithHelperText>
                    <StyledErrorMessage name="contains_alcohol" />
                  </FormControl>

                  {/* Additional fields for min_quantity, max_quantity, is_enabled based on IAddon */}
                  {/* Implementation omitted for brevity */}
                  <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                  <FormControl>
                    <StyledFormLabel>{t("form.addon.price")}*</StyledFormLabel>
                    <FormInput
                      label="Price"
                      type="number"
                      name="price"
                      placeholder=""
                      onChange={(e: any) => {
                        handleChange(e);
                        let fvstring = parseFloat(e.target.value).toFixed(2);
                        let floatValue = parseFloat(fvstring);

                        if (isNaN(floatValue)) {
                          return;
                        }

                        handleFieldChange("price", floatValue, index);

                        // Optionally dispatch on change instead of on submit
                      }}
                    />
                    <StyledFormLabelWithHelperText>
                      {t("form.addon.price_helperText")}
                    </StyledFormLabelWithHelperText>
                    <StyledErrorMessage name="price" />
                  </FormControl>
                  <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                  <FormControl>
                    <StyledFormLabel>{t("form.addon.description")}*</StyledFormLabel>
                    <FormTextarea
                      label="Description"
                      name="description"
                      placeholder="Enter a description for this add-on."
                      onChange={(e: any) => {
                        handleChange(e);
                        // Optionally dispatch on change instead of on submit
                        handleFieldChange("description", e.target.value, index);
                      }}
                      overrideStyle={{
                        width: "95%",
                      }}
                    />
                    <StyledFormLabelWithHelperText>
                      {t("form.addon.description_helperText")}
                    </StyledFormLabelWithHelperText>
                    <StyledErrorMessage name="description" />
                  </FormControl>

                  <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                  <FormControl>
                    <StyledFormLabel>{t("form.addon.max_quantity")}*</StyledFormLabel>
                    <FormInput
                      label="Max Quantity"
                      type="number"
                      name="max_quantity"
                      placeholder=""
                      onChange={(e: any) => {
                        handleChange(e);
                        let fvstring = parseFloat(e.target.value).toFixed(2);
                        let floatValue = parseFloat(fvstring);

                        if (isNaN(floatValue)) {
                          return;
                        }

                        handleFieldChange("max_quantity", floatValue, index);

                        // Optionally dispatch on change instead of on submit
                      }}
                    />
                    <StyledFormLabelWithHelperText>
                      {t("form.addon.max_quantity_helperText")}
                    </StyledFormLabelWithHelperText>
                    <StyledErrorMessage name="max_quantity" />
                  </FormControl>

                  <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                  <FormControl>
                    <StyledFormLabel>{t("form.addon.is_enabled")}</StyledFormLabel>
                    <FormCheckbox
                      label="Is Enabled"
                      name="is_enabled"
                      onChange={(e: any) => {
                        handleChange(e);
                        // Optionally dispatch on change instead of on submit
                        handleFieldChange("is_enabled", e.target.checked, index);
                      }}
                    />
                    <StyledFormLabelWithHelperText>
                      {t("form.addon.is_enabled_helperText")}
                    </StyledFormLabelWithHelperText>
                    <StyledErrorMessage name="is_enabled" />
                  </FormControl>

                  <Grid
                    container
                    spacing={2}
                    flexDirection="row"
                    justifyContent="flex-end"
                  >
                    <Grid>
                      <StyledButton
                        size="md"
                        color="primary"
                        onClick={() => dispatch(clearAddon(index))}
                      >
                        {t("form.button_clear")}
                      </StyledButton>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Box>
      ))}
    </>
  );
};

export default CreateAddonForm;
