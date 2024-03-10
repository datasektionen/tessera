import { Box, Grid } from "@mui/joy";
import TicketIcon from "../../assets/icons/ticket.png";
import FillOutIcon from "../../assets/icons/fillout_form.png";
import WaitIcon from "../../assets/icons/wait.png";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HowToUse: React.FC = () => {
  const [showText, setShowText] = useState([false, false, false]);
  const [animateText, setAnimateText] = useState(false);

  const handleReadMore = (index: number) => {
    const newShowText = [...showText];
    newShowText[index] = !newShowText[index];
    setShowText(newShowText);
  };

  const variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const [ref1, inView1] = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
  });

  const [ref3, inView3] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView1 && inView2 && inView3) {
      setShowText([true, true, true]);
      setAnimateText(true);
    }
  }, [inView1, inView2, inView3]);

  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={{ xs: 2, md: 3 }}
      mx={{ xs: 2, md: 3 }}
      mt={8}
      style={{
        height: "100vh",
      }}
    >
      <Grid xs={12} md={4} ref={ref1}>
        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <Box
            style={{
              textAlign: "center",
            }}
          >
            <img
              src={TicketIcon}
              alt="ticket"
              style={{
                width: "300px",
                height: "auto",
              }}
            />
            <Box>
              <StyledText
                level="body-md"
                color={PALLETTE.cerise_dark}
                fontWeight={700}
                fontSize={24}
              >
                {t("main_page.how_to_use.request_ticket_title")}
              </StyledText>
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={animateText ? "visible" : "hidden"}
                transition={{ delay: 2.0, type: "spring" }}
              >
                {showText[0] && (
                  <StyledText level="body-md" color={PALLETTE.charcoal}>
                    {t("main_page.how_to_use.request_ticket")}
                  </StyledText>
                )}
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Grid>
      <Grid xs={12} md={4} ref={ref2}>
        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <Box
            style={{
              textAlign: "center",
            }}
          >
            <img
              src={FillOutIcon}
              alt="fill out"
              style={{
                width: "300px",
                height: "auto",
              }}
            />
            <Box>
              <StyledText
                level="body-md"
                color={PALLETTE.cerise_dark}
                fontWeight={700}
                fontSize={24}
              >
                {t("main_page.how_to_use.fill_out_title")}
              </StyledText>
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={animateText ? "visible" : "hidden"}
                transition={{ delay: 2.0, type: "spring" }}
              >
                {showText[1] && (
                  <StyledText level="body-md" color={PALLETTE.charcoal}>
                    {t("main_page.how_to_use.fill_out")}
                  </StyledText>
                )}
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Grid>
      <Grid xs={12} md={4} ref={ref3}>
        <motion.div
          variants={variants}
          initial="hidden"
          animate={inView3 ? "visible" : "hidden"}
          transition={{ delay: 1.0, type: "spring" }}
        >
          <Box
            style={{
              textAlign: "center",
            }}
          >
            <img
              src={WaitIcon}
              alt="wait"
              style={{
                width: "300px",
                height: "auto",
              }}
            />
            <Box>
              <StyledText
                level="body-md"
                color={PALLETTE.cerise_dark}
                fontWeight={700}
                fontSize={24}
              >
                {t("main_page.how_to_use.wait_title")}
              </StyledText>
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={animateText ? "visible" : "hidden"}
                transition={{ delay: 2.0, type: "spring" }}
              >
                {showText[2] && (
                  <StyledText level="body-md" color={PALLETTE.charcoal}>
                    {t("main_page.how_to_use.wait")}
                  </StyledText>
                )}
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default HowToUse;
