const RolePermission = require("../models/RolePermission");
const UserRole = require("../models/UserRole")
// Required for populate('permissionId') to resolve the Permission model
require("../models/Permission");

module.exports.hasPermission = async (userId, permission) => {
  try {
    const userRole = await UserRole.findOne({ userId });
    if (!userRole) return false;

    const rolePermissions = await RolePermission.find({ roleId: userRole.roleId }).populate('permissionId');

    const permissions = rolePermissions
      .map((perm) => perm.permissionId && perm.permissionId.name)
      .filter(Boolean);

    if (!permissions.includes(permission)) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error validating permission', error);
    return false;
  }
}