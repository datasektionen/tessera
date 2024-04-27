import { Box, Grid, Sheet } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import StyledText from "../../components/text/styled_text";
import AsteriskIcon from "../../components/icons/asterisk";

const TicketFees: React.FC = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(90deg, ${PALLETTE.white} 0%, ${PALLETTE.light_pink} 100%)`,
        height: 400,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 16,
      }}
    >
      {/* Row 1 */}
      <Box
        sx={{
          width: "100%",
          mt: -4,
        }}
      >
        <Box>
          <StyledText
            color={PALLETTE.cerise_dark}
            level="h2"
            fontSize={32}
            fontWeight={700}
            sx={{ textAlign: "center" }}
          >
            Ticket Fee
          </StyledText>
          <StyledText
            color={PALLETTE.cerise_dark}
            level="body-md"
            fontSize={18}
            fontWeight={500}
            sx={{
              width: "50%",
              textwrap: "balance",
              m: "0 auto",
              textAlign: "center",
              mb: 2,
            }}
          >
            Tickets fee includes VAT, all banks and credit card fees,{" "}
            <strong>no hidden costs</strong>, providing you with the services
            you need to succeed with your event.
          </StyledText>
        </Box>

        <Sheet
          sx={{
            width: "75%",
            background: `linear-gradient(90deg, ${PALLETTE.cerise_dark} 0%, ${PALLETTE.offBlack} 100%)`,
            p: 2,
            borderRadius: 8,
            m: "0 auto",
            mt: 1,
            zIndex: 1,
            maxWidth: 750,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid xs={6}>
              <StyledText
                color={PALLETTE.white}
                level="h2"
                fontSize={28}
                fontWeight={600}
                sx={{ textAlign: "center", mb: 2 }}
              >
                Regular Ticket Fees
              </StyledText>
              <StyledText
                color={PALLETTE.white}
                level="h2"
                fontSize={28}
                fontWeight={600}
                sx={{ textAlign: "center" }}
              >
                For non-profit organizations
              </StyledText>
            </Grid>
            <Grid xs={6}>
              <Box>
                <StyledText
                  color={PALLETTE.white}
                  level="h3"
                  fontSize={28}
                  sx={{ textAlign: "center", mb: 2 }}
                  fontWeight={700}
                >
                  3.5 % + 3 SEK
                  <AsteriskIcon color={PALLETTE.white} ml={3} size={10} />
                </StyledText>
              </Box>

              <Box>
                <StyledText
                  color={PALLETTE.white}
                  level="h3"
                  fontSize={28}
                  sx={{ textAlign: "center" }}
                  fontWeight={700}
                >
                  3 % + 1 SEK
                  <AsteriskIcon color={PALLETTE.white} ml={3} size={10} />
                </StyledText>
              </Box>
            </Grid>
          </Grid>
        </Sheet>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <StyledText
            color={PALLETTE.charcoal}
            level="h3"
            fontSize={18}
            sx={{ display: "inline", mt: 1 }}
            fontWeight={400}
          >
            <AsteriskIcon color={PALLETTE.charcoal} size={10} />
            Per sold ticket
          </StyledText>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketFees;
