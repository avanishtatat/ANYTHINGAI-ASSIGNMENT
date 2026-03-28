require('dotenv').config();
const express = require("express"); 
const cors = require("cors"); 

const PORT = process.env.PORT || 3000;
const app = express(); 

app.use(express.json()); 
app.use(cors()); 

// Health Endpoint 
app.get("/", (req,res) => {
  res.status(200).json({message: 'Server is running'}); 
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`); 
});