const jwt = require("jsonwebtoken"); 

// Generate JWT token 
module.exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};
