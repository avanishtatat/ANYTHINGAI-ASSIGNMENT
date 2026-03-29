const Role = require("../models/Role");
const RolePermission = require("../models/RolePermission");
const User = require("../models/User");
const UserRole = require("../models/UserRole");
const { generateToken } = require("../utils/helper");

const {
  validateRegistrationBody,
  validateLoginBody,
} = require("../utils/validation");

module.exports.register = async (req, res) => {
  try {
    const validationResult = validateRegistrationBody(req.body || {});
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }

    const { name, email, password, roleId } = validationResult;

    const existingUser = await User.findOne({ email });
    // Check if email already exists
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: 'Invalid role ID' });
    }

    const newUser = await User.create({ name, email, password });

    await UserRole.create({ userId: newUser._id, roleId });

    return res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const validationResult = validateLoginBody(req.body);
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }

    const { email, password } = validationResult;

    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);
    return res
      .status(200)
      .json({ token: token, message: "Login Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;

    const userRole = await UserRole.findOne({ userId }).populate("roleId"); 

    if (!userRole || !userRole.roleId) {
      return res.status(404).json({ message: "User role not found" });
    }

    const permissions = await RolePermission.find({ roleId: userRole.roleId._id }).populate('permissionId');

    return res
      .status(200)
      .json({
        user: req.user,
        role: userRole.roleId.name,
        permissions: permissions.filter((perm) => perm.permissionId).map((perm) => perm.permissionId.name),
      });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' }); 
  }
};
