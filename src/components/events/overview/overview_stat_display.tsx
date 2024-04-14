import React from "react";
import { Grid, Stack } from "@mui/joy";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useTranslation } from "react-i18next";
import { OverviewBorderBoxWrapper } from "./overview_borde_box_wrapper";

interface OverviewStatisticDisplayProps {
  title: string;
  value: number | string;
  changeText?: string;
  color: string;
}

/**
 * Displays a statistic within a styled box.
 * @param {object} props - The props for the component.
 * @param {string} title - The title of the statistic.
 * @param {number | string} value - The value of the statistic.
 * @param {string} changeText - The change text, describing how the value has changed.
 * @param {string} color - The color theme for the text.
 */
const OverviewStatisticDisplay: React.FC<OverviewStatisticDisplayProps> = ({
  title,
  value,
  changeText,
  color,
}) => {
  const { t } = useTranslation();
  return (
    <Grid>
      <OverviewBorderBoxWrapper>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <StyledText
            color={color}
            level="body-md"
            fontWeight={700}
            fontSize={24}
          >
            {t(title)}
          </StyledText>
          <StyledText
            color={color}
            level="body-md"
            fontWeight={500}
            fontSize={30}
          >
            {value}
          </StyledText>
          {changeText && (
            <StyledText
              color={PALLETTE.charcoal_see_through}
              level="body-md"
              fontWeight={500}
              fontSize={14}
            >
              {changeText}
            </StyledText>
          )}
        </Stack>
      </OverviewBorderBoxWrapper>
    </Grid>
  );
};

export default OverviewStatisticDisplay;
