export function isValidDecimal(value: any) {
  // Convert the value to a string and check if it starts with a zero
  if (String(value).startsWith("0") && value !== 0) {
    return false;
  }

  // Check if the value is a valid number
  if (isNaN(Number(value))) {
    return false;
  }

  return true;
}
