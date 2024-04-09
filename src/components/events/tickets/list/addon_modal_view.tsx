import { Box, Stack } from "@mui/joy";
import { ITicket, ITicketAddon } from "../../../../types";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface AddonModalViewProps {
  ticket: ITicket;
}

const AddonModalView: React.FC<AddonModalViewProps> = ({ ticket }) => {
  return (
    <Box>
      {ticket.ticket_request?.ticket_add_ons?.map((addon: ITicketAddon) => {
        const add_on = addon.add_on!;
        return (
          <Stack key={addon.id + "-manage-addon"} direction="row" spacing={3}>
            <StyledText
              level="body-md"
              fontSize={18}
              color={PALLETTE.charcoal}
              startDecorator={<AddCircleOutlineIcon />}
            >
              {add_on.max_quantity} x {add_on.name}
            </StyledText>
            <StyledText
              level="body-md"
              fontSize={18}
              color={PALLETTE.charcoal}
              fontWeight={600}
            >
              SEK {add_on.price * addon.quantity}
            </StyledText>
            <StyledText
              level="body-md"
              fontSize={18}
              color={PALLETTE.charcoal}
              fontWeight={400}
            >
              {add_on.contains_alcohol
                ? "(Alcohol included)"
                : "(Alcohol not included)"}
            </StyledText>
          </Stack>
        );
      })}
    </Box>
  );
};

export default AddonModalView;
