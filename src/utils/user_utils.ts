import { ITeamUser, IUser } from "../types";

export function getUserFullName(user: IUser | ITeamUser): string {
  return user.first_name + " " + user.last_name;
}
