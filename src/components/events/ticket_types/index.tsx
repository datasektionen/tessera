import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";
import { ITicketType } from "../../../types";
import PALLETTE from "../../../theme/pallette";

interface TicketTypeProps {
  ticketType: ITicketType;
}

const TicketType: React.FC<TicketTypeProps> = ({ ticketType }) => {
  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      style={{
        backgroundColor: PALLETTE.charcoal,
        maxHeight: "150px",
        minWidth: "fit-content",
        width: "90%",
      }}
    >
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div>
              <Typography
                textColor={PALLETTE.cerise}
                fontFamily={"Josefin sans"}
                fontWeight={700}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "160px", // Adjust this value to suit your needs
                }}
              >
                {ticketType.name}
              </Typography>
              <Typography
                level="body-sm"
                fontSize={12}
                fontFamily={"Josefin sans"}
                textColor={PALLETTE.offWhite}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "160px", // Adjust this value to suit your needs
                }}
              >
                {ticketType.description}
              </Typography>
            </div>
            <Typography
              level="body-sm"
              textColor={PALLETTE.cerise}
              style={{
                width: "150px",
                whiteSpace: "nowrap",
              }}
            >
              SEK{" "}
              <Typography
                level="body-sm"
                fontSize={18}
                fontWeight={"lg"}
                fontFamily={"Josefin sans"}
                textColor={PALLETTE.cerise}
              >
                {" "}
                {ticketType.price}
              </Typography>
            </Typography>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              color="primary"
              size="sm"
              variant="outlined"
              sx={{ px: 0.2, width: "40px", height: "20px" }}
            >
              -
            </Button>
            <Typography
              level="body-xs"
              fontWeight={700}
              fontSize={18}
              fontFamily={"Josefin sans"}
              textColor={PALLETTE.cerise}
              mx={1}
            >
              1
            </Typography>
            <Button
              variant="outlined"
              size="sm"
              color="primary"
              sx={{ px: 0.2, width: "40px", height: "20px" }}
            >
              +
            </Button>
          </div>
        </div>
      </CardContent>
      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: "vertical-rl",
          textAlign: "center",
          fontSize: "xs",
          fontWeight: "xl",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderLeft: "1px solid",
          borderColor: "divider",
        }}
      >
        Ticket
      </CardOverflow>
    </Card>
  );
};

export default TicketType;
