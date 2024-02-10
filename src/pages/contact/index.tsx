import {
  Autocomplete,
  Box,
  FormControl,
  Option,
  Select,
  TextField,
} from "@mui/joy";
import Title from "../../components/text/title";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { Field, Form, Formik } from "formik";
import { IContactFormValues, IOrganization } from "../../types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../components/forms/form_labels";
import {
  DefaultInputStyle,
  FormInput,
  FormTextarea,
} from "../../components/forms/input_types";
import { StyledErrorMessage } from "../../components/forms/messages";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ContactFormSchema from "../../validation/contact_form";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import StyledButton from "../../components/buttons/styled_button";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { listOrganizationsStart } from "../../redux/features/listOrganizationsSlice";
import LoadingOverlay from "../../components/Loading";
import { useLocation } from "react-router-dom";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { organizations, loading: orgLoading } = useSelector(
    (state: RootState) => state.organizations
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const organization_id = queryParams.get("organization_id");
  const dispatch: AppDispatch = useDispatch();

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

  useEffect(() => {
    dispatch(listOrganizationsStart());
  }, []);

  const ContactFormInitialValues: IContactFormValues = {
    name: currentUser?.first_name + " " + currentUser?.last_name,
    email: currentUser?.email!,
    organization_id: organization_id ? parseInt(organization_id) : 0,
    subject: "",
    message: "",
  };

  if (orgLoading) {
    return <LoadingOverlay />;
  }

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
                  <StyledFormLabel>
                    {t("form.contact.team_name")}*
                  </StyledFormLabel>
                  <Field name="organization_id">
                    {({ field, form }: any) => {
                      const selectedOrganization =
                        organizations.find((org) => org.id === field.value) ||
                        ({
                          id: 0,
                          name: "",
                          email: "",
                          created_at: 0,
                        } as IOrganization);
                      return (
                        <Autocomplete
                          value={selectedOrganization}
                          options={organizations}
                          getOptionLabel={(option) => option.name}
                          style={DefaultInputStyle}
                          onChange={(_, newValue) => {
                            form.setFieldValue(
                              field.name,
                              newValue ? newValue.id : ""
                            );
                          }}
                        />
                      );
                    }}
                  </Field>
                  <StyledErrorMessage name="organization_id" />
                  <StyledText
                    level="body-sm"
                    fontSize={16}
                    color={PALLETTE.charcoal}
                    style={{
                      width: "350px",
                    }}
                    sx={{ marginBottom: "10px" }}
                  >
                    {t("form.contact.team_helperText")}
                  </StyledText>

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
                  </FormControl>
                  <FormControl>
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
                  </FormControl>
                  <FormControl>
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
                  </FormControl>
                  <FormControl>
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
