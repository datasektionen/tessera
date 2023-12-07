import { IOrganizationUser, IUser } from "../types";

export function getUserFullName(user: IUser | IOrganizationUser): string {
  return user.first_name + " " + user.last_name;
}
