import { Box, Grid } from "@mui/joy";
import { useState } from "react";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import PALLETTE from "../../../theme/pallette";
import StandardGrid from "../../../components/wrappers/standard_grid";
import StyledText from "../../../components/text/styled_text";
import BorderBox from "../../../components/wrappers/border_box";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import { useTranslation } from "react-i18next";

const EditTicketReleaseAddonsPage: React.FC = () => {
  const { eventID, ticketReleaseID } = useParams();

  const { t } = useTranslation();

  return (
    <TesseraWrapper>
      <StandardGrid>
        <Grid xs={8}>
          <Box mt={2}>
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
          </Box>
        </Grid>
        <Grid xs={8}>
          <BorderBox>
            <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
              {t("manage_event.edit.ticket_types.ticket_details")}
            </StyledText>
            <StyledText level="body-md" fontSize={16} color={PALLETTE.charcoal}>
              {t("manage_event.edit.ticket_types.ticket_details_helperText")}
            </StyledText>
          </BorderBox>
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default EditTicketReleaseAddonsPage;
