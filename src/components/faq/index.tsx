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

const CommonlyAskedQuestions: React.FC = () => {
  const { t } = useTranslation();

  const [questionNumbers, setQuestionNumbers] = useState<number[]>([]);

  useEffect(() => {
    const numQuestions = 1;
    const numbers = [];
    for (let i = 1; i <= numQuestions; i++) {
      numbers.push(i);
    }
    setQuestionNumbers(numbers);
  }, []);

  return (
    <Box>
      <Title fontSize={24}>{t("faq.title")}</Title>
      <AccordionGroup>
        {questionNumbers.map((index: number) => {
          return (
            <Accordion key={`faq-${index}`}>
              <AccordionSummary>
                <StyledText
                  level="body-md"
                  fontSize={20}
                  color={PALLETTE.cerise}
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
