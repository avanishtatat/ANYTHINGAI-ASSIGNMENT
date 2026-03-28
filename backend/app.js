require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const taskRoutes = require("./routes/taskRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Health Endpoint 
app.get("/", (req, res) => {
  res.status(200).json({ message: 'Server is running' });
})

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});