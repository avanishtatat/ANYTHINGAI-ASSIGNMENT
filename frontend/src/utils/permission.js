export const hasPermission = (userPermissions, permission) => {
  if (!userPermissions.includes(permission)) return false;
  return true;
}