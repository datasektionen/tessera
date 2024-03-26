import { Box, Grid, Stack, Tooltip, styled } from "@mui/joy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import PALLETTE from "../../../theme/pallette";
import StandardGrid from "../../../components/wrappers/standard_grid";
import StyledText from "../../../components/text/styled_text";
import BorderBox from "../../../components/wrappers/border_box";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import AddIcon from "@mui/icons-material/Add";
import StatusIcon, {
  DisabledIcon,
} from "../../../components/icons/status_icon";

import { AppDispatch, RootState } from "../../../store";
// Assume these actions exist and are properly defined for managing addons

import AddonFormSchema from "../../../validation/edit_addons_form";
import CreateAddonForm from "../../../components/events/addons/create_addon_form";
import {
  addAddon,
  deleteAddonRequest,
  removeAddon,
  setAddons,
  setSelectedAddon,
} from "../../../redux/features/addonCreationSlice";
import StyledBorderBox from "../../../components/wrappers/styled_border_box";
import { RemoveListFormButton } from "../../../components/events/ticket_types/remove_ticket_type_button";
import { Block } from "@mui/icons-material";
import StyledButton from "../../../components/buttons/styled_button";
import { toast } from "react-toastify";
import { updateAddons } from "../../../redux/sagas/axios_calls/addons";
import { getAddonsRequest } from "../../../redux/features/addonSlice";
import LoadingOverlay from "../../../components/Loading";

const EditTicketReleaseAddonsPage: React.FC = () => {
  const { eventID, ticketReleaseID } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  // Assume these selectors are set up to retrieve addons related data
  const { selectedAddon, addons, loading } = useSelector(
    (state: RootState) => state.addonCreation
  );

  const { addons: fetchedAddons } = useSelector(
    (state: RootState) => state.addons
  );

  const [invalidForms, setInvalidForms] = useState<{
    [key: number]: string[];
  }>({});

  const validateAllForms = async () => {
    let allFormsAreValid = true;

    const invalidForms: {
      [key: number]: string[];
    } = {};

    for (let index = 0; index < addons.length; index++) {
      try {
        await AddonFormSchema.validate(addons[index], {
          abortEarly: false,
        });
      } catch (err: any) {
        invalidForms[index] = err.inner.map((error: any) => error.path);
        allFormsAreValid = false;
      }
    }

    setInvalidForms(invalidForms);
  };

  const handleAddAddon = () => {
    dispatch(addAddon());
  };

  const handleRemoveAddon = (index: number) => {
    dispatch(
      deleteAddonRequest({
        eventID: parseInt(eventID!),
        ticketReleaseID: parseInt(ticketReleaseID!),
        addonID: addons[index].id,
      })
    );
  };

  const handleSubmit = async () => {
    validateAllForms();

    if (Object.keys(invalidForms).length > 0) {
      toast.error("Please fix all errors before submitting");
      return;
    } else {
      const res = await updateAddons(
        parseInt(eventID!),
        parseInt(ticketReleaseID!),
        addons
      );

      dispatch(
        getAddonsRequest({
          eventID: parseInt(eventID!),
          ticketReleaseID: parseInt(ticketReleaseID!),
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getAddonsRequest({
        eventID: parseInt(eventID!),
        ticketReleaseID: parseInt(ticketReleaseID!),
      })
    );
  }, []);

  useEffect(() => {
    if (fetchedAddons.length > 0) {
      dispatch(setSelectedAddon(0));
      dispatch(setAddons(fetchedAddons));
    }
  }, [dispatch, fetchedAddons]);

  return (
    <TesseraWrapper>
      {loading && <LoadingOverlay />}
      <StandardGrid>
        <Grid xs={8}>
          <StyledText
            color={PALLETTE.charcoal}
            level="body-lg"
            fontSize={32}
            style={{ marginBottom: "16px" }}
          >
            {t("manage_event.edit.addons.title")}
          </StyledText>
          <StyledText color={PALLETTE.charcoal} level="body-sm">
            {t("manage_event.edit.addons.subtitle")}
          </StyledText>
          <Box mt={2}>
            {addons.map((addon, index) => {
              const isInvalid = invalidForms[index]?.length > 0;
              return (
                <StyledBorderBox
                  key={index}
                  onClick={() => {
                    dispatch(setSelectedAddon(index));
                  }}
                  style={{
                    color:
                      index == selectedAddon
                        ? PALLETTE.charcoal
                        : PALLETTE.cerise,
                    backgroundColor: addon.is_enabled
                      ? index === selectedAddon
                        ? PALLETTE.cerise
                        : PALLETTE.offWhite
                      : PALLETTE.charcoal_see_through,
                  }}
                >
                  <Tooltip
                    title={t("tooltips.must_be_edited")}
                    placement="bottom"
                  >
                    {addon.is_enabled ? (
                      <StatusIcon isValid={!isInvalid} />
                    ) : (
                      <DisabledIcon />
                    )}
                  </Tooltip>
                  <StyledText
                    level="body-lg"
                    fontSize={32}
                    fontWeight={700}
                    color={
                      addon.is_enabled
                        ? index == selectedAddon
                          ? PALLETTE.charcoal
                          : PALLETTE.cerise
                        : PALLETTE.cerise_dark
                    }
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {addon.name}
                  </StyledText>
                  {addon.id !== 0 && (
                    <Box
                      style={{
                        position: "absolute",
                        left: "-40px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <RemoveListFormButton
                        index={index}
                        text={t("form.button_delete")}
                        color={PALLETTE.red}
                        action={handleRemoveAddon}
                      />
                    </Box>
                  )}
                </StyledBorderBox>
              );
            })}
          </Box>
          <Box
            mt={1}
            style={{
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <Tooltip title={t("tooltips.add_ticket_type")} placement="bottom">
              <AddIcon
                onClick={handleAddAddon}
                style={{
                  color: PALLETTE.cerise,
                  fontSize: "40px",
                  // svg shadow
                  filter: "drop-shadow( 0px 0px 2px rgba(200, 0, 0, .7))",
                }}
              />
            </Tooltip>
          </Box>
          <StyledButton
            size="lg"
            onClick={handleSubmit}
            color={PALLETTE.charcoal}
            bgColor={PALLETTE.green}
            style={{
              width: "100px",
              marginTop: "64px",
            }}
          >
            {t("form.button_save")}
          </StyledButton>
        </Grid>
        <Grid xs={8}>
          <BorderBox>
            <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
              {t("manage_event.edit.addons.form_title")}
            </StyledText>
            <StyledText level="body-md" fontSize={16} color={PALLETTE.charcoal}>
              {t("manage_event.edit.addons.form_subtitle")}
            </StyledText>
            <CreateAddonForm
              addons={addons}
              ticketReleaseID={parseInt(ticketReleaseID!)}
              selectedAddon={selectedAddon}
              validateAllForms={validateAllForms}
            />
          </BorderBox>
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default EditTicketReleaseAddonsPage;
