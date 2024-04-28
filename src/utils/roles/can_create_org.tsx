import { IUser, RoleType } from "../../types";

export const canCreateOrg = (user: IUser) => {
  return user.roles!.some((role) => role.name === RoleType.SUPER_ADMIN);
};
