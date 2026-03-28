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

module.exports.validateTaskParams = (params) => {
  if (!params.id) {
    return {isValid: false, message: 'Task id not found'}; 
  }

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return { isValid: false, message: 'Invalid task ID.' };
  }

  return { isValid: true, taskId: params.id };
}

module.exports.validateTaskBody = (body) => {
  const {title, description = ""} = body; 
  if (!title) {
    return {isValid: false, message: 'Title is required'}; 
  }
  return { isValid: true, title: title.trim(), description: description.trim() };
}