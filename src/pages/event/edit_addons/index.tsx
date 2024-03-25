import { Box, Grid, Stack, Tooltip, styled } from "@mui/joy";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import PALLETTE from "../../../theme/pallette";
import StandardGrid from "../../../components/wrappers/standard_grid";
import StyledText from "../../../components/text/styled_text";
import BorderBox from "../../../components/wrappers/border_box";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import StyledButton from "../../../components/buttons/styled_button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

import { AppDispatch, RootState } from "../../../store";
// Assume these actions exist and are properly defined for managing addons

import AddonFormSchema from "../../../validation/edit_addons_form";
import CreateAddonForm from "../../../components/events/addons/create_addon_form";
import {
  addAddon,
  removeAddon,
  setSelectedAddon,
} from "../../../redux/features/addonCreationSlice";

const EditTicketReleaseAddonsPage: React.FC = () => {
  const { eventID, ticketReleaseID } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  // Assume these selectors are set up to retrieve addons related data
  const { selectedAddon, addons } = useSelector(
    (state: RootState) => state.addonCreation
  );

  const [invalidForms, setInvalidForms] = useState<{ [key: string]: boolean }>(
    {}
  );
  const validateAddonForms = async () => {
    // Validation logic here
  };

  const handleAddAddon = () => {
    dispatch(addAddon());
  };

  const handleRemoveAddon = (index: number) => {
    dispatch(removeAddon(index));
  };

  return (
    <TesseraWrapper>
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
            {addons.map((addon, index) => (
              <Box key={addon.id} mt={2}>
                <StyledText
                  level="body-lg"
                  fontSize={24}
                  color={PALLETTE.cerise}
                >
                  {addon.name}
                </StyledText>
                <Tooltip title={t("tooltips.edit_addon")} placement="bottom">
                  <EditIcon onClick={() => dispatch(setSelectedAddon(index))} />
                </Tooltip>
                <Tooltip title={t("tooltips.remove_addon")} placement="bottom">
                  <RemoveIcon onClick={() => handleRemoveAddon(index)} />
                </Tooltip>
              </Box>
            ))}
            <Tooltip title={t("tooltips.add_addon")} placement="bottom">
              <AddIcon onClick={handleAddAddon} />
            </Tooltip>
          </Box>
        </Grid>
        <Grid xs={8}>
          <BorderBox>
            <CreateAddonForm
              addons={addons}
              selectedAddon={selectedAddon}
              validateAddonForms={validateAddonForms}
            />
          </BorderBox>
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default EditTicketReleaseAddonsPage;
