const mongoose = require("mongoose");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports.validateRegistrationBody = (body) => {
  const { name, email, password, roleId } = body;

  if (!name || !email || !password || !roleId) {
    return { isValid: false, message: 'All fields are required.' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format.' };
  }

  if (!mongoose.Types.ObjectId.isValid(roleId)) {
    return { isValid: false, message: 'Invalid role ID.' };
  }

  return { isValid: true, name: name.trim(), email: email.trim().toLowerCase(), password, roleId };
}

module.exports.validateLoginBody = (body) => {
  const { email, password } = body;

  if (!email || !password) {
    return { isValid: false, message: 'All fields are required.' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format.' };
  }

  return { isValid: true, email: email.trim().toLowerCase(), password };
}