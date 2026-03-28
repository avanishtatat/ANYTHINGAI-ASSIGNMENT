const express = require("express"); 
const { register, login, getUserInfo } = require("../controllers/authControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router(); 

router.post("/register", register); 
router.post("/login", login); 
router.get("/getUser", protect, getUserInfo); 

module.exports = router;