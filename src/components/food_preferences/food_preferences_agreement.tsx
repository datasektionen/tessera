import { Link } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import StyledText from "../text/styled_text";

interface TextProps {
  children: React.ReactNode;
}

const Title: React.FC<TextProps> = ({ children }) => (
  <StyledText
    level="h4"
    fontSize={24}
    color={PALLETTE.cerise}
    sx={{
      mt: 4,
    }}
  >
    {children}
  </StyledText>
);

const SubTitle: React.FC<TextProps> = ({ children }) => (
  <StyledText
    level="h5"
    fontSize={20}
    fontWeight={600}
    color={PALLETTE.charcoal}
    sx={{
      mt: 2,
    }}
  >
    {children}
  </StyledText>
);

const BaseText: React.FC<TextProps> = ({ children }) => (
  <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
    {children}
  </StyledText>
);

const FoodPreferencesAgreement: React.FC = () => {
  return (
    <BaseText>
      <Title>GDPR Privacy Notice Regarding Food Preferences</Title> <br />{" "}
      <br />
      <strong>Konglig Datasektionen</strong> is dedicated to protecting your
      privacy in line with the EU General Data Protection Regulation (GDPR) and
      our internal Information Handling Policy. This notice outlines our
      practices regarding the collection, use, and protection of your food
      preferences to ensure personalized and safe participation in our events.
      <br />
      <SubTitle>About Us and Our Commitment</SubTitle>
      <br />
      In accordance with our{" "}
      <Link
        href="https://styrdokument.datasektionen.se/pm/pm_informationshantering"
        target="_blank"
      >
        Information Handling Policy
      </Link>
      ,
      <ul>
        <li>
          Purpose: This document describes how we manage and use member data to
          organize the section's activities, aiming to set clear routines for
          handling personal information, ensuring its proper use and protection
          (§1 Formalia, §1.2 Syfte).
        </li>
        <li>
          Scope: These procedures apply to the section and everyone involved in
          its activities (§1.3 Omfattning).
        </li>
        <li>
          Responsibility: The board is responsible for personal data within the
          section and can be contacted at{" "}
          <Link href="mailto:drek@datasektionen.se">drek@datasektionen.se</Link>{" "}
          (§1.4 Ansvar).
        </li>
      </ul>
      <br />
      <Title>Legal Basis for Processing</Title>
      <br />
      Our processing of your food preferences is grounded in:
      <ul>
        <li>
          Tasks of public interest, as outlined by Swedish higher education law
          and student union regulations, providing a legal basis under GDPR
          Article 6.1 e (§2.1 Laglig grund).
        </li>
        <li>
          Other potential bases include consent (Article 6.1 a), contract
          fulfillment (Article 6.1 b), legal obligation (Article 6.1 c), and
          legitimate interest (Article 6.1 f).
        </li>
      </ul>
      <Title>Your Rights</Title>
      <br />
      You have the right to:
      <ul>
        <li>
          Access your data, request corrections for inaccuracies, and complete
          incomplete information (§3.1 Tillgång till hanterade uppgifter, §3.2
          Rättelse av hanterade uppgifter).
        </li>
        <li>
          Request deletion of your data under certain conditions (§3.3
          Borttagning av hanterade uppgifter).
        </li>
        <li>
          Report concerns about data handling to the Swedish Authority for
          Privacy Protection (§3.4 Anmälan av felaktig hantering).
        </li>
      </ul>
      <Title>Our Data Handling Practices</Title>
      <br />
      <ul>
        <li>
          Administration: Data collection is overseen by a designated individual
          ensuring compliance with laws and our policies. Contact details for
          inquiries and a link to our Information Handling Policy are provided
          in data collection forms (§4.1 Administration av uppgifter).
        </li>
        <li>
          Email Management: Incoming emails are processed in line with GDPR,
          with personal data being securely stored or deleted as appropriate
          (§4.2 Hantering av inkommande e-post).
        </li>
        <li>
          Data Protection: Personal data is stored on Google Drive accessible
          only to the active group, the board, and auditors. Data transfer
          across borders complies with GDPR requirements (§4.3 Hur skyddar vi
          uppgifter).
        </li>
      </ul>
      <Title>Data Storage and Retention</Title>
      <br />
      Your food preferences are stored securely until the end of the calendar
      year (31 December). You will be contacted via email for consent renewal
      for the upcoming year. Without new consent, your information will be
      deleted. <br />
      <Title>
        <br />
        Contact and Complaints
      </Title>
      <br />
      For any inquiries or to exercise your rights, contact us at
      <Link href="mailto:drek@datasektionen.se">drek@datasektionen.se</Link>. If
      you believe our data handling breaches GDPR, you may file a complaint with
      the Swedish Authority for Privacy Protection.
      <br />
      This notice and our Information Handling Policy are subject to updates for
      accuracy and compliance. We encourage you to review these documents
      periodically. <br />
      <br />
      <SubTitle>Revision Date: 09/02/2024</SubTitle>
    </BaseText>
  );
};

export default FoodPreferencesAgreement;
