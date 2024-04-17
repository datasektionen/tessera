import { Autocomplete, Box, Divider, Input, Stack, TextField } from "@mui/joy";

import { useEventSendOuts } from "../../../hooks/use_event_send_outs_hook";
import { ISendOut } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import LoadingOverlay from "../../Loading";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface ListSendOutsProps {
  sendOuts: ISendOut[];
  selectedSendOut: ISendOut | null;
  setSelectedSendOut: (sendOut: ISendOut) => void;
}

const ListSendOuts: React.FC<ListSendOutsProps> = ({
  sendOuts,
  selectedSendOut,
  setSelectedSendOut,
}) => {
  const { timestamp } = useSelector((state: RootState) => state.timestamp);
  const { t } = useTranslation();
  if (!sendOuts || sendOuts.length === 0) {
    return (
      <Box>
        <StyledText
          level="body-md"
          fontSize={16}
          color={PALLETTE.charcoal}
          fontWeight={500}
          sx={{ mt: 1 }}
        >
          {t("manage_event.send_out.no_send_outs")}
        </StyledText>
      </Box>
    );
  }

  return (
    <Box
      style={{
        position: "relative",
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        sx={{
          pt: 2,
        }}
      >
        {[...sendOuts]
          .sort((a, b) => {
            const dateA =
              a.created_at instanceof Date
                ? a.created_at
                : new Date(a.created_at);
            const dateB =
              b.created_at instanceof Date
                ? b.created_at
                : new Date(b.created_at);
            return dateA.getTime() - dateB.getTime();
          })
          .map((sendOut) => {
            const selected = sendOut?.id === selectedSendOut?.id;
            return (
              <Box
                sx={{
                  borderColor: selected ? PALLETTE.dark_green : PALLETTE.cerise,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  pt: 0.5,
                  backgroundColor: PALLETTE.white,
                  borderRadius: 4,
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "scale(1.01)",
                    backgroundColor: PALLETTE.light_pink,
                    borderColor: PALLETTE.cerise_dark,
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  setSelectedSendOut(sendOut);
                }}
              >
                <StyledText
                  level="body-md"
                  fontSize={16}
                  color={PALLETTE.charcoal}
                  fontWeight={700}
                  sx={{
                    pl: 1,
                  }}
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  {sendOut.subject}
                </StyledText>
                <StyledText
                  level="body-md"
                  fontSize={14}
                  color={PALLETTE.charcoal_see_through}
                  sx={{
                    pl: 1,
                  }}
                >
                  {format(sendOut.created_at, "yyyy-MM-dd HH:mm")}
                </StyledText>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
};

export default ListSendOuts;
