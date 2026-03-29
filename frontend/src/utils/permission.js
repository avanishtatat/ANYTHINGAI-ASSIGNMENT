export const hasPermission = (userPermissions, permission) => {
  return Array.isArray(userPermissions) && userPermissions.includes(permission);
}