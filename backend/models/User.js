const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }, {
  timestamps: true
}
);

// Hash password before saving 
UserSchema.pre("save", async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare passwords 
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', UserSchema); 