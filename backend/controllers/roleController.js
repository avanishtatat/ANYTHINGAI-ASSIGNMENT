const Role = require("../models/Role")

module.exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    return res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}