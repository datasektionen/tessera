import { Box, Grid } from "@mui/joy";
import TicketIcon from "../../assets/icons/ticket.png";
import FillOutIcon from "../../assets/icons/fillout_form.png";
import WaitIcon from "../../assets/icons/wait.png";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

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
                Make a Ticket Request
              </StyledText>
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={animateText ? "visible" : "hidden"}
                transition={{ delay: 2.0, type: "spring" }}
              >
                {showText[0] && (
                  <StyledText level="body-md" color={PALLETTE.charcoal}>
                    Tessera's innovative approach to ticket distribution allows
                    users to request tickets to events through methods like a
                    lottery system or first-come-first-serve, making the process
                    fairer and more accessible; simply navigate to the events
                    tab, find your event, and click 'Request' to start.
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
                Fill Out Personal Details
              </StyledText>
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={animateText ? "visible" : "hidden"}
                transition={{ delay: 2.0, type: "spring" }}
              >
                {showText[1] && (
                  <StyledText level="body-md" color={PALLETTE.charcoal}>
                    After requesting a ticket, you'll need to provide personal
                    details like food preferences and allergies. This
                    information helps organizers tailor the event to your needs,
                    ensuring a personalized experience. Tessera links your
                    account to your tickets, streamlining the process and
                    enhancing your enjoyment of the event.
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
                Wait...
              </StyledText>
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={animateText ? "visible" : "hidden"}
                transition={{ delay: 2.0, type: "spring" }}
              >
                {showText[2] && (
                  <StyledText level="body-md" color={PALLETTE.charcoal}>
                    The final step involves waiting for the ticket release to
                    close and for tickets to be allocated, either by lottery or
                    on a first-come-first-served basis. Tessera ensures fair
                    ticket distribution, so monitor your email or Tessera
                    account for updates on your request status. If successful,
                    you'll receive further instructions, including any necessary
                    payment details.
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
