import { Box } from "@mui/joy";
import axios from "axios";
import { use } from "i18next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingOverlay from "../Loading";
import TesseraWrapper from "../wrappers/page_wrapper";

const PrivacyPolicy: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Get privacy policy from /privacy-policy
  const getPricacyPolicy = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/privacy-policy`
    );

    setHtmlContent(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getPricacyPolicy();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <TesseraWrapper>
      <Box
        sx={{
          mx: 5,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      </Box>
    </TesseraWrapper>
  );
};

export default PrivacyPolicy;
