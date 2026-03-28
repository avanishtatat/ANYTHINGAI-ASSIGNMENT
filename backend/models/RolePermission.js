const mongoose = require("mongoose"); 

const RolePermissionSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  pemissionId : { type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}
}); 

module.exports = mongoose.model('RolePermission', RolePermissionSchema);