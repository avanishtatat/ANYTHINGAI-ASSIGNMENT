const Role = require("../models/Role");
const Permission = require("../models/Permission");
const RolePermission = require("../models/RolePermission");
const connectDB = require("../config/db");

const roles = ['admin', 'user'];

const permissions = ['CREATE_TASK', 'UPDATE_TASK', 'VIEW_TASK', 'DELETE_TASK'];

async function main() {
  try {
    await connectDB();

    // Clear existing data
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await RolePermission.deleteMany({});
    console.log('Cleared existing data');

    // Create permissions
    const createdPermissions = await Permission.insertMany(
      permissions.map(perm => ({ name: perm }))
    );
    console.log('Permissions created:', createdPermissions.length);

    // Create roles
    const createdRoles = await Role.insertMany(
      roles.map(role => ({ name: role }))
    );
    console.log('Roles created:', createdRoles.length);

    // Find the actual role and permission documents
    const adminRole = await Role.findOne({ name: 'admin' });
    const userRole = await Role.findOne({ name: 'user' });
    const allPermissions = await Permission.find({});

    // Assign all permissions to admin
    const adminPermissions = allPermissions.map(perm => ({
      roleId: adminRole._id,
      permissionId: perm._id
    }));
    await RolePermission.insertMany(adminPermissions);
    console.log('Admin permissions assigned');

    // Assign limited permissions to user (VIEW_TASK)
    const userPermissions = allPermissions
      .filter(perm => perm.name === 'VIEW_TASK')
      .map(perm => ({
        roleId: userRole._id,
        permissionId: perm._id
      }));
    await RolePermission.insertMany(userPermissions);
    console.log('User permissions assigned');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

main();