import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
} from "@mui/joy";
import Title from "../text/title";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import { useTranslation } from "react-i18next";

const CommonlyAskedQuestions: React.FC = () => {
    const {t} = useTranslation();

  return (
    <Box>
      <Title fontSize={24}>Commonly Asked Questions</Title>
      <AccordionGroup>
        {data.map((item, index) => {
          return (
            <Accordion key={`faq-${index}`}>
              <AccordionSummary>
                <StyledText
                  level="body-md"
                  fontSize={18}
                  color={PALLETTE.cerise}
                  fontWeight={600}
                >
                  {t()
                </StyledText>
              </AccordionSummary>
              <AccordionDetails>
                <StyledText
                  level="body-sm"
                  fontSize={14}
                  color={PALLETTE.charcoal}
                  fontWeight={400}
                >
                  {item.answer}
                </StyledText>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </AccordionGroup>
    </Box>
  );
};

export default CommonlyAskedQuestions;
