const mongoose = require("mongoose"); 

const UserRoleSchema = new mongoose.Schema({
  userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
}); 

module.exports = mongoose.model('UserRole', UserRoleSchema);