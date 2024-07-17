import { useParams } from "react-router-dom";
import Title from "../../../../components/text/title";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import BankingDetailsForm from "../../../../components/events/settings/financial/bank_details_form";
import { useBankingDetails } from "../../../../hooks/use_banking_details_hook";
import { useTranslation } from "react-i18next";
import StyledText from "../../../../components/text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import LoadingOverlay from "../../../../components/Loading";
import DrawerBoxWrapper from "../../../../components/wrappers/manager_wrapper";

const SettingsFinancialPage: React.FC = () => {
  const { eventID } = useParams();

  const {
    bankingDetails: { bankingDetails, loading },
    event,
  } = useBankingDetails(parseInt(eventID!));
  const { t } = useTranslation();

  return (
    <MUITesseraWrapper>
      {loading && <LoadingOverlay />}
      <DrawerBoxWrapper eventID={eventID!}>
        <Title>{t("manage_event.settings.financial.title")}</Title>
        <StyledText
          sx={{ marginBottom: `20px`, maxWidth: 700, textWrap: "balance" }}
          level="body1"
          color={PALLETTE.charcoal}
        >
          {t("manage_event.settings.financial.description")}
        </StyledText>
        <BankingDetailsForm
          bankingDetails={bankingDetails}
          organizationID={event?.organization_id!}
        />
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default SettingsFinancialPage;
