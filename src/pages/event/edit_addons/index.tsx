import { Box, Grid, Sheet, Stack, Tooltip, styled } from "@mui/joy";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { previousStep } from "../../../redux/features/eventCreationSlice";
import {
  removeTicketType,
  addTicketType,
  setSelectedTicketType,
  setTicketTypes,
} from "../../../redux/features/ticketTypeCreationSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketTypeFormSchema from "../../../validation/create_ticket_type_form";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ITicketRelease, ITicketType, ITicketTypeForm } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchTicketTypesRequest,
  fetchTicketTypesSuccess,
  resetUpdateSuccess,
  updateTicketTypesRequest,
} from "../../../redux/features/ticketTypeSlice";
import PALLETTE from "../../../theme/pallette";
import StandardGrid from "../../../components/wrappers/standard_grid";
import StyledText from "../../../components/text/styled_text";
import StatusIcon from "../../../components/icons/status_icon";
import StyledButton from "../../../components/buttons/styled_button";
import BorderBox from "../../../components/wrappers/border_box";
import EditTicketTypeForm from "../../../components/events/edit/edit_ticket_type_form";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import LoadingOverlay from "../../../components/Loading";
import { is } from "date-fns/locale";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditTicketReleaseAddonsPage: React.FC = () => {
  const { eventID, ticketReleaseID } = useParams();
  const navigate = useNavigate();

  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const [invalidForms, setInvalidForms] = useState<{
    [key: number]: string[];
  }>({});

  const someFormsAreInvalid = Object.keys(invalidForms).length > 0;
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
