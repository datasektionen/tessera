import * as Yup from "yup";

function isValidAccountNumber(clearingNumber: string, accountNumber: string) {
  let regex;
  if (/^(3300|3782)$/.test(clearingNumber)) {
    // Nordea personkonto
    regex = /^[0-9]{10}$/; // Assuming YYMMDDXXXX format for simplicity
  } else if (/^[7-8][0-9]{3}$/.test(clearingNumber)) {
    // Swedbank accounts
    regex = /^[0-9]{11,15}$/; // Adjusted for Swedbank's specifics
  } else {
    // Add more conditions for other banks based on the format requirements
    regex = /^[0-9]{6,10}$/;
  }
  return regex.test(accountNumber);
}

const BankingValidationSchema = Yup.object().shape({
  bank_name: Yup.string().required("Bank name is required"),
  account_holder: Yup.string().required("Account holder is required"),
  clearing_number: Yup.string()
    .matches(/^[0-9]{4,5}$/, "Invalid clearing number format")
    .required("Clearing number is required"),
  account_number: Yup.string()
    .test("account-number", "Invalid account number format", function (value) {
      const { clearing_number } = this.parent;
      return isValidAccountNumber(clearing_number, value!);
    })
    .required("Account number is required"),
});

export default BankingValidationSchema;
