import { Box, Divider } from "@mui/joy";
import { ISendOut } from "../../../types";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import RecipientsDetails from "./recipients_details";

interface DetailSendOutProps {
  sendOut: ISendOut;
}

function decodeHtml(html: string) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const DetailSendOut: React.FC<DetailSendOutProps> = ({ sendOut }) => {
  const decodedContent = decodeHtml(sendOut.content);

  const sanitizedContent = DOMPurify.sanitize(decodedContent, {
    ADD_ATTR: ["style"],
  });

  const { t } = useTranslation();

  return (
    <Box>
      <StyledText level="h2" color={PALLETTE.cerise_dark} fontSize={20}>
        {t("manage_event.send_out.subject")}
      </StyledText>
      <StyledText level="body1" color={PALLETTE.charcoal}>
        {sendOut.subject}
      </StyledText>
      <Divider sx={{ my: 1 }} />
      <StyledText level="h2" color={PALLETTE.cerise_dark} fontSize={20}>
        {t("manage_event.send_out.message")}
      </StyledText>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      <Divider sx={{ my: 1 }} />
      <StyledText level="h2" color={PALLETTE.cerise_dark} fontSize={20}>
        {t("manage_event.send_out.recipients")}
      </StyledText>
      <RecipientsDetails sendOut={sendOut} />
    </Box>
  );
};

export default DetailSendOut;
