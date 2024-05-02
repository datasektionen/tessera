import { Box, FormControl, Link } from "@mui/joy";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import { PackageTiers } from "../pricing/features";
import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { StyledFormLabel } from "../../components/forms/form_labels";
import { FormInput, FormTextarea } from "../../components/forms/input_types";
import { StyledErrorMessage } from "../../components/forms/messages";
import StyledButton from "../../components/buttons/styled_button";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ManagerContactFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  plan: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

interface IManagerContactFormValues {
  name: string;
  plan: PackageTiers;
  email: string;
  message: string;
}

interface IManagerContactFormProps {
  plan: PackageTiers;
}

const ManagerContactForm: React.FC<IManagerContactFormProps> = ({ plan }) => {
  const { t } = useTranslation();
  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const onSubmit = async (values: IManagerContactFormValues) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/plan-contact`,
        values,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Plan enrollment request sent successfully");
      }
    } catch (error) {
      toast.error("There was an error sending the plan enrollment request");
    }
  };

  const [initialValues, setInitialValues] = useState<IManagerContactFormValues>(
    {
      name: "",
      plan: plan,
      email: currentUser?.email!,
      message: "",
    }
  );

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      plan: plan,
    });
  }, [initialValues, plan]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ManagerContactFormValidationSchema}
      validateOnChange={true}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        onSubmit(values);
      }}
      enableReinitialize
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
                  width: "300px",
                }}
              />
              <StyledErrorMessage name="name" />
            </FormControl>
            <FormControl>
              <StyledFormLabel>{t("form.contact.plan")}*</StyledFormLabel>
              <FormInput
                name="plan"
                label="Plan"
                placeholder="Plan"
                disabled
                overrideStyle={{
                  width: "300px",
                }}
              />
              <StyledErrorMessage name="plan" />
            </FormControl>
            <FormControl>
              <StyledFormLabel>{t("form.contact.email")}*</StyledFormLabel>
              <FormInput
                name="email"
                label="Email"
                placeholder="Email"
                overrideStyle={{
                  width: "300px",
                }}
              />
              <StyledErrorMessage name="email" />
            </FormControl>
            <FormControl>
              <StyledFormLabel>{t("form.contact.message")}*</StyledFormLabel>
              <FormTextarea
                name="message"
                label="Message"
                placeholder="Message"
                minRows={5}
                overrideStyle={{
                  width: "500px",
                }}
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
  );
};

export default ManagerContactForm;
