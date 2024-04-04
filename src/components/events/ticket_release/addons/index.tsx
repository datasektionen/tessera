import { Box, Checkbox, Chip, Grid, Input, Stack, Tooltip } from "@mui/joy";
import { ITicketRelease } from "../../../../types";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { useTranslation } from "react-i18next";
import React from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import StyledButton from "../../../buttons/styled_button";

interface TicketReleaseAddonsProps {
  ticketRelease: ITicketRelease;
  selectedAddons: {
    id: number;
    quantity: number;
  }[];
  handleChange: (selectedAddons: { id: number; quantity: number }[]) => void;
}

const TicketReleaseAddons: React.FC<TicketReleaseAddonsProps> = ({
  ticketRelease,
  selectedAddons,
  handleChange,
}) => {
  const { t } = useTranslation();

  const { addons } = ticketRelease;

  if (!addons) {
    return null;
  }

  return (
    <Box mt={2}>
      <StyledText level="h3" color={PALLETTE.cerise_dark} fontSize={20}>
        {t("event.ticket_release.addons.title")}
      </StyledText>
      <StyledText level="body-sm" color={PALLETTE.charcoal} fontSize={16}>
        {t("event.ticket_release.addons.description")}
      </StyledText>
      {addons.map((addon) => {
        return (
          <Box key={addon.id} mt={2}>
            <Grid
              container
              justifyContent={"flex-start"}
              spacing={2}
              alignItems={"center"}
            >
              <Grid>
                <Checkbox
                  name={addon.name + addon.id}
                  checked={selectedAddons.some(
                    (selectedAddon) => selectedAddon.id === addon.id
                  )}
                  onChange={() => {
                    if (
                      selectedAddons.some(
                        (selectedAddon) => selectedAddon.id === addon.id
                      )
                    ) {
                      handleChange(
                        selectedAddons.filter(
                          (selectedAddon) => selectedAddon.id !== addon.id
                        )
                      );
                    } else {
                      handleChange([
                        ...selectedAddons,
                        {
                          id: addon.id,
                          quantity: 1,
                        },
                      ]);
                    }
                  }}
                />
              </Grid>
              <Grid>
                <Tooltip title={addon.name} placement="right-start">
                  <span>
                    <StyledText
                      color={PALLETTE.charcoal}
                      fontSize={20}
                      level="body-sm"
                      fontWeight={600}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px", // Adjust this value to suit your needs
                      }}
                    >
                      {addon.name}
                      <StyledText
                        level="body-sm"
                        startDecorator={<HorizontalRuleIcon />}
                        color={PALLETTE.charcoal}
                        fontSize={18}
                        fontWeight={500}
                        sx={{
                          ml: 1,
                        }}
                      >
                        SEK {addon.price}
                      </StyledText>
                    </StyledText>
                  </span>
                </Tooltip>
              </Grid>
              {selectedAddons.some(
                (selectedAddon) => selectedAddon.id === addon.id
              ) && (
                <Stack
                  spacing={2}
                  direction={"row"}
                  alignItems={"center"}
                  ml={2}
                >
                  <StyledButton
                    size="sm"
                    color={PALLETTE.charcoal}
                    bgColor={PALLETTE.red}
                    fs={40}
                    style={{
                      height: "30px",
                    }}
                    disabled={
                      selectedAddons.find(
                        (selectedAddon) => selectedAddon.id === addon.id
                      )?.quantity === 0
                    }
                    onClick={() => {
                      const selectedAddon = selectedAddons.find(
                        (selectedAddon) => selectedAddon.id === addon.id
                      );

                      if (!selectedAddon) {
                        return;
                      }

                      if (selectedAddon.quantity === 0) {
                        return;
                      }

                      handleChange(
                        selectedAddons.map((selectedAddon) =>
                          selectedAddon.id === addon.id
                            ? {
                                ...selectedAddon,
                                quantity: selectedAddon.quantity - 1,
                              }
                            : selectedAddon
                        )
                      );
                    }}
                  >
                    -
                  </StyledButton>
                  <StyledText
                    color={PALLETTE.charcoal}
                    fontSize={20}
                    level="body-sm"
                    fontWeight={700}
                  >
                    {
                      selectedAddons.find(
                        (selectedAddon) => selectedAddon.id === addon.id
                      )?.quantity
                    }
                  </StyledText>
                  <StyledButton
                    size="sm"
                    color={PALLETTE.charcoal}
                    bgColor={PALLETTE.green}
                    fs={40}
                    style={{
                      height: "30px",
                    }}
                    disabled={
                      selectedAddons.find(
                        (selectedAddon) => selectedAddon.id === addon.id
                      )?.quantity === addon.max_quantity
                    }
                    onClick={() => {
                      const selectedAddon = selectedAddons.find(
                        (selectedAddon) => selectedAddon.id === addon.id
                      );

                      if (!selectedAddon) {
                        return;
                      }

                      if (selectedAddon.quantity === addon.max_quantity) {
                        return;
                      }

                      handleChange(
                        selectedAddons.map((selectedAddon) =>
                          selectedAddon.id === addon.id
                            ? {
                                ...selectedAddon,
                                quantity: selectedAddon.quantity + 1,
                              }
                            : selectedAddon
                        )
                      );
                    }}
                  >
                    +
                  </StyledButton>
                </Stack>
              )}
            </Grid>
            <StyledText
              level="body-sm"
              color={PALLETTE.charcoal}
              fontSize={14}
              sx={{
                mt: 1,
              }}
            >
              {addon.description}{" "}
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal_see_through}
                fontSize={14}
                fontWeight={600}
              >
                ({t("event.ticket_release.addons.max_quantity")}{" "}
                {addon.max_quantity}) (
                {addon.contains_alcohol &&
                  t("event.ticket_release.addons.contains_alcohol")}
                )
              </StyledText>
            </StyledText>
          </Box>
        );
      })}
    </Box>
  );
};

export default TicketReleaseAddons;
