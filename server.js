// ✅ server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/user");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/consumption", require("./routes/consumption"));


// Database & Server Start
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
