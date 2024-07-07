import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { ChromePicker } from "react-color";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppDispatch, RootState } from "../../../store";
import {
  updateNetworkSettingsRequest,
  uploadLogoRequest,
} from "../../../redux/features/networkSettingsSlice";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import DrawerBoxWrapper from "../../../components/wrappers/manager_wrapper";
import { INetworkSettingsInput } from "../../../types";
import StyledText from "../../../components/text/styled_text";
import StyledButton from "../../../components/buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import { FormInput } from "../../../components/forms/input_types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../components/forms/form_labels";
import { StyledErrorMessage } from "../../../components/forms/messages";
import { useNetworkDetails } from "../../../hooks/manager/network_details_hook";
import LoadingOverlay from "../../../components/Loading";

const validationSchema = Yup.object().shape({
  main_color: Yup.string().required("Main color is required"),
  accent_color: Yup.string().required("Accent color is required"),
});

type ColorSettings = Pick<INetworkSettingsInput, "main_color" | "accent_color">;

const GeneralSettingsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const { network, loading, error, refetch } = useNetworkDetails();
  const { fileUploadProgress } = useSelector(
    (state: RootState) => state.networkSettings
  );

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeColorPicker, setActiveColorPicker] = useState<
    "main_color" | "accent_color" | null
  >(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setActiveColorPicker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (
    values: ColorSettings,
    { setSubmitting }: FormikHelpers<ColorSettings>
  ) => {
    dispatch(updateNetworkSettingsRequest(values));
    setSubmitting(false);
    refetch();
  };

  const handleLogoUpload = () => {
    if (logoFile) {
      dispatch(uploadLogoRequest(logoFile));
      refetch();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  const renderColorPicker = (
    colorType: "main_color" | "accent_color",
    formikProps: any
  ) => (
    <Box sx={{ mb: 2 }}>
      <StyledFormLabel>
        {t(`manager.settings.general.${colorType}`)}
      </StyledFormLabel>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <StyledButton
          onClick={() =>
            setActiveColorPicker(
              activeColorPicker === colorType ? null : colorType
            )
          }
          size="md"
          bgColor={formikProps.values[colorType]}
          textColor={getContrastColor(formikProps.values[colorType])}
          style={{ marginRight: "10px" }}
        >
          {t("manager.settings.general.pick_color", {
            color: t(`manager.settings.general.${colorType}`),
          })}
        </StyledButton>
        <FormInput
          name={colorType}
          label=""
          placeholder={t(`manager.settings.general.${colorType}`)}
          overrideStyle={{ width: "120px" }}
        />
      </Box>
      {activeColorPicker === colorType && (
        <Box sx={{ position: "absolute", zIndex: 1 }} ref={colorPickerRef}>
          <ChromePicker
            color={formikProps.values[colorType]}
            onChange={(color) =>
              formikProps.setFieldValue(colorType, color.hex)
            }
          />
        </Box>
      )}
    </Box>
  );

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!network) {
    return <div>{t("errors.network_not_found")}</div>;
  }

  const initialValues: ColorSettings = {
    main_color: network.settings?.main_color || "",
    accent_color: network.settings?.accent_color || "",
  };

  ("hi");

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper showManagerDashboard={true}>
        <StyledText
          level="h2"
          color="neutral"
          fontSize={38}
          style={{ textTransform: "capitalize" }}
        >
          {t("manager.settings.general.title")}
        </StyledText>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formikProps) => (
            <Form>
              <Box sx={{ mt: 3 }}>
                {renderColorPicker("main_color", formikProps)}
                {renderColorPicker("accent_color", formikProps)}

                <StyledButton
                  type="submit"
                  size="md"
                  bgColor={PALLETTE.cerise}
                  textColor={PALLETTE.offWhite}
                  style={{ marginTop: "1rem" }}
                  disabled={formikProps.isSubmitting}
                >
                  {t("manager.settings.general.save_settings")}
                </StyledButton>
              </Box>
            </Form>
          )}
        </Formik>

        <Box sx={{ mt: 4, mb: 2 }}>
          <StyledFormLabel>
            {t("manager.settings.general.logo")}
          </StyledFormLabel>
          <input
            id="logo"
            name="logo"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <StyledButton
            onClick={() => document.getElementById("logo")?.click()}
            size="md"
            bgColor={PALLETTE.offWhite}
            textColor={PALLETTE.charcoal}
          >
            {t("manager.settings.general.upload_logo")}
          </StyledButton>
          <StyledFormLabelWithHelperText>
            {t("manager.settings.general.logo_helperText")}
          </StyledFormLabelWithHelperText>
          {(previewUrl || network.settings?.logo) && (
            <Box sx={{ mt: 2, position: "relative", display: "inline-block" }}>
              <img
                src={previewUrl || network.settings?.logo || ""}
                alt="Logo preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              {previewUrl && (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setLogoFile(null);
                    setPreviewUrl(null);
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          )}
          {fileUploadProgress > 0 && fileUploadProgress < 100 && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <CircularProgress
                variant="determinate"
                value={fileUploadProgress}
              />
            </Box>
          )}
          <StyledButton
            onClick={handleLogoUpload}
            size="md"
            bgColor={PALLETTE.cerise}
            textColor={PALLETTE.offWhite}
            style={{ marginTop: "1rem" }}
            disabled={!logoFile}
          >
            {t("manager.settings.general.save_logo")}
          </StyledButton>
        </Box>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default GeneralSettingsPage;
