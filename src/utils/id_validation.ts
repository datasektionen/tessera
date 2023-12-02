export function validateAndConvertEventID(id: string): number {
  const idAsNumber = Number(id);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid event ID");
  }
  return idAsNumber;
}
