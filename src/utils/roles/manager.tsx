import { IUser, RoleType } from "../../types";

export const isEventManager = (user: IUser) => {
  return user.roles!.some(
    (role) =>
      role.name === RoleType.MANAGER || role.name === RoleType.SUPER_ADMIN
  );
};
