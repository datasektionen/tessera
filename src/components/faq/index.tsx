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
import { useEffect, useState } from "react";
import gbJson from "../../assets/faq/gb_faq.json";

const numberOfQuestions = gbJson["numberOfQuestions"];

const CommonlyAskedQuestions: React.FC = () => {
  const { t } = useTranslation();

  const [questionNumbers, setQuestionNumbers] = useState<number[]>([]);

  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= numberOfQuestions; i++) {
      numbers.push(i);
    }
    setQuestionNumbers(numbers);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
      }}
      mx={4}
      mt={4}
    >
      <Title fontSize={24}>{t("faq.title")}</Title>
      <AccordionGroup>
        {questionNumbers.map((index: number) => {
          return (
            <Accordion key={`faq-${index}`}>
              <AccordionSummary>
                <StyledText
                  level="body-md"
                  fontSize={20}
                  color={PALLETTE.cerise_dark}
                  fontWeight={600}
                >
                  {t(`faq.q${index}.question`)}
                </StyledText>
              </AccordionSummary>
              <AccordionDetails>
                <StyledText
                  level="body-sm"
                  fontSize={18}
                  color={PALLETTE.charcoal}
                  fontWeight={400}
                >
                  {t(`faq.q${index}.answer`)}
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
