const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

try {
  const mongoUrl = process.env.MONGODB_URL;
  mongoose.connect(mongoUrl);
} catch (err) {
  console.log(err, "errerrerr");
}

app.use(express.json());

app.use("/", authRoutes);

app.listen(5000, () => {
  console.log(`Backend is running on port 5000`);
});
