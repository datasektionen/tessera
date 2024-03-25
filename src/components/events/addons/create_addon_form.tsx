import { Box, Divider, FormControl, Grid, Stack } from "@mui/joy";
import { Formik, Form, Field } from "formik";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../forms/form_labels";
import { FormCheckbox, FormInput, FormTextarea } from "../../forms/input_types";
import { StyledErrorMessage } from "../../forms/messages";
import StyledButton from "../../buttons/styled_button";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import AddonFormSchema from "../../../validation/edit_addons_form";
import {
  setAddons,
  clearAddon,
  updateAddon,
} from "../../../redux/features/addonCreationSlice";
import { IAddon } from "../../../types";

interface CreateAddonFormProps {
  addons: IAddon[];
  selectedAddon: number;
  validateAddonForms: () => void;
}

const CreateAddonForm: React.FC<CreateAddonFormProps> = ({
  addons,
  selectedAddon,
  validateAddonForms,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    validateAddonForms();
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
            initialValues={addon}
            validationSchema={AddonFormSchema}
            onSubmit={(values: IAddon) => {
              dispatch(updateAddon({ index, values }));
            }}
            enableReinitialize
          >
            {({ handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* Form fields adjusted for add-on properties */}
                <FormControl>
                  <StyledFormLabel>{t("form.addon.name")}*</StyledFormLabel>
                  <FormInput
                    label="Name"
                    name="name"
                    placeholder={t("form.placeholder.addon_name")}
                    onChange={handleChange}
                  />
                  <StyledErrorMessage name="name" />
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
                    onChange={handleChange}
                  />
                  <StyledErrorMessage name="price" />
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
            )}
          </Formik>
        </Box>
      ))}
    </>
  );
};

export default CreateAddonForm;
