import { Form, Formik } from "formik";
import { IBankingDetails, IBankingDetailsReq, IEvent } from "../../../../types";
import BankingValidationSchema from "../../../../validation/banking_details_validation";
import { FormControl } from "@mui/joy";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { useTranslation } from "react-i18next";
import { FormInput } from "../../../forms/input_types";
import { StyledErrorMessage } from "../../../forms/messages";
import StyledButton from "../../../buttons/styled_button";
import PALLETTE from "../../../../theme/pallette";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";
import { submitBankingDetailsRequest } from "../../../../redux/features/bankingDetailsSlice";
import { useEffect, useState } from "react";
import StyledText from "../../../text/styled_text";
import { format } from "date-fns";

interface BankingDetailsFormProps {
  bankingDetails: IBankingDetails;
  organizationID: number;
}

export const BankingDetailsForm: React.FC<BankingDetailsFormProps> = ({
  bankingDetails,
  organizationID,
}) => {
  const [initialValues, setInitialValues] = useState<IBankingDetailsReq>({
    bank_name: bankingDetails.bank_name,
    account_holder: bankingDetails.account_holder,
    clearing_number: bankingDetails.clearing_number,
    account_number: bankingDetails.account_number,
  });

  useEffect(() => {
    setInitialValues({
      bank_name: bankingDetails.bank_name,
      account_holder: bankingDetails.account_holder,
      clearing_number: bankingDetails.clearing_number,
      account_number: bankingDetails.account_number,
    });
  }, [bankingDetails]);

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (values: IBankingDetailsReq) => {
    dispatch(
      submitBankingDetailsRequest({
        organizationID: organizationID,
        bankingDetails: values,
      })
    );
  };

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BankingValidationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validateOnChange={true}
      enableReinitialize={true}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form>
          <FormControl>
            <StyledFormLabel>
              {t("form.banking_details.bank_name")}
            </StyledFormLabel>
            <FormInput
              name="bank_name"
              placeholder="Bank name"
              label="Bank name"
            />
            <StyledErrorMessage name="bank_name" />
            <StyledFormLabelWithHelperText>
              {t("form.banking_details.bank_name_helperText")}
            </StyledFormLabelWithHelperText>
          </FormControl>

          <FormControl>
            <StyledFormLabel>
              {t("form.banking_details.account_holder")}
            </StyledFormLabel>
            <FormInput
              name="account_holder"
              placeholder="Account holder"
              label="Account holder"
            />
            <StyledErrorMessage name="account_holder" />
            <StyledFormLabelWithHelperText>
              {t("form.banking_details.account_holder_helperText")}
            </StyledFormLabelWithHelperText>
          </FormControl>

          <FormControl>
            <StyledFormLabel>
              {t("form.banking_details.clearing_number")}
            </StyledFormLabel>
            <FormInput
              name="clearing_number"
              placeholder="Clearing number"
              label="Clearing number"
            />
            <StyledErrorMessage name="clearing_number" />{" "}
            <StyledFormLabelWithHelperText>
              {t("form.banking_details.clearing_number_helperText")}
            </StyledFormLabelWithHelperText>
          </FormControl>

          <FormControl>
            <StyledFormLabel>
              {t("form.banking_details.account_number")}
            </StyledFormLabel>
            <FormInput
              name="account_number"
              placeholder="Account number"
              label="Account number"
            />
            <StyledErrorMessage name="account_number" />
            <StyledFormLabelWithHelperText>
              {t("form.banking_details.account_number_helperText")}
            </StyledFormLabelWithHelperText>
          </FormControl>

          {bankingDetails.updated_at && (
            <StyledText
              sx={{ mt: `20px` }}
              level="body2"
              fontSize={16}
              color={PALLETTE.charcoal_see_through}
            >
              {t("form.banking_details.updated_at", {
                date: format(bankingDetails.updated_at, "dd/MM/yyyy"),
              })}
            </StyledText>
          )}
          <StyledButton
            type="submit"
            size="lg"
            bgColor={PALLETTE.green}
            sx={{ mt: `10px` }}
          >
            {t("form.button_save")}
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default BankingDetailsForm;
