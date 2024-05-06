import {
  IOrganizationUser,
  IUser,
  NetworkRoleType,
  OrganizationUserRoleType,
} from "../types";

export function getUserFullName(user: IUser | IOrganizationUser): string {
  return user.first_name + " " + user.last_name;
}

export function isTeamOwner(user: IUser): boolean {
  return user.organization_user_roles!.some(
    (role) => role.organization_role_name === OrganizationUserRoleType.OWNER
  );
}

export function isTeamMember(user: IUser): boolean {
  return user.organization_user_roles!.some(
    (role) =>
      role.organization_role_name === OrganizationUserRoleType.MEMBER ||
      role.organization_role_name === OrganizationUserRoleType.OWNER
  );
}

export function isNetworkSuperAdmin(user: IUser): boolean {
  return user.network_user_roles!.some(
    (role) => role.network_role_name === NetworkRoleType.NetworkSuperAdmin
  );
}

export function isNetworkAdmin(user: IUser): boolean {
  return user.network_user_roles!.some(
    (role) =>
      role.network_role_name === NetworkRoleType.NetworkAdmin ||
      role.network_role_name === NetworkRoleType.NetworkSuperAdmin
  );
}

export function isNetworkMember(user: IUser): boolean {
  return user.network_user_roles!.some(
    (role) =>
      role.network_role_name === NetworkRoleType.NetworkMember ||
      role.network_role_name === NetworkRoleType.NetworkAdmin ||
      role.network_role_name === NetworkRoleType.NetworkSuperAdmin
  );
}
