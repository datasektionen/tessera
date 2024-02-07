import { Box, FormControl } from "@mui/joy";
import Title from "../../components/text/title";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { Form, Formik } from "formik";
import { IContactFormValues } from "../../types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../components/forms/form_labels";
import { FormInput, FormTextarea } from "../../components/forms/input_types";
import { StyledErrorMessage } from "../../components/forms/messages";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ContactFormSchema from "../../validation/contact_form";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import StyledButton from "../../components/buttons/styled_button";
import axios from "axios";
import { toast } from "react-toastify";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (values: IContactFormValues) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/contact`, values, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(t("form.contact.success"));
        }
      })
      .catch((err) => {
        toast.error(t("form.contact.fail"));
      });
  };

  const ContactFormInitialValues: IContactFormValues = {
    name: currentUser?.first_name + " " + currentUser?.last_name,
    email: currentUser?.email!,
    subject: "",
    message: "",
  };

  return (
    <TesseraWrapper>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        pt={2}
      >
        <Box>
          <Title>{t("form.contact.title")}</Title>
          <StyledText
            level="body-sm"
            fontSize={18}
            color={PALLETTE.charcoal}
            style={{
              width: "350px",
            }}
            sx={{ marginBottom: "10px" }}
          >
            {t("form.contact.description")}
          </StyledText>
          <Formik
            initialValues={ContactFormInitialValues}
            validationSchema={ContactFormSchema}
            validateOnChange={true}
            onSubmit={(values, actions) => {
              handleSubmit(values);
              actions.setSubmitting(false);
            }}
          >
            {({ values, isValid, errors }) => {
              return (
                <Form>
                  <FormControl>
                    <StyledFormLabel>{t("form.contact.name")}*</StyledFormLabel>
                    <FormInput
                      name="name"
                      label="Name"
                      placeholder="Name"
                      overrideStyle={{
                        width: "350px",
                      }}
                    />
                    <StyledErrorMessage name="name" />

                    <StyledFormLabel>
                      {t("form.contact.email")}*
                    </StyledFormLabel>
                    <FormInput
                      name="email"
                      label="Email"
                      placeholder="Email"
                      overrideStyle={{
                        width: "350px",
                      }}
                    />
                    <StyledErrorMessage name="email" />

                    <StyledFormLabel>
                      {t("form.contact.subject")}*
                    </StyledFormLabel>
                    <FormInput
                      name="subject"
                      label="Subject"
                      placeholder="Subject"
                      overrideStyle={{
                        width: "350px",
                      }}
                    />
                    <StyledErrorMessage name="subject" />

                    <StyledFormLabel>
                      {t("form.contact.message")}*
                    </StyledFormLabel>
                    <FormTextarea
                      name="message"
                      label="Message"
                      placeholder="Message"
                      minRows={5}
                    />
                    <StyledErrorMessage name="message" />
                  </FormControl>
                  <StyledButton
                    size="sm"
                    type="submit"
                    bgColor={isValid ? PALLETTE.green : PALLETTE.orange}
                    color={PALLETTE.charcoal}
                    style={{ width: "150px" }}
                    sx={{ marginTop: "16px" }}
                  >
                    {t("form.button_send")}
                  </StyledButton>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </TesseraWrapper>
  );
};

export default ContactPage;
