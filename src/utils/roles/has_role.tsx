import { IUser, RoleType } from "../../types";


export const userHasRole = (user: IUser, role: RoleType) => {
    return user.roles!.some((userRole) => userRole.name === role);
}