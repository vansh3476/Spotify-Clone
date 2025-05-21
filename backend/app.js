import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import paylistRoutes from "./routes/paylistRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";

dotenv.config();
const app = express();

try {
  const mongoUrl = process.env.MONGODB_URL;
  mongoose.connect(mongoUrl);
} catch (err) {
  console.log(err, "errerrerr");
}

app.use(express.json());

app.use("/", authRoutes);
app.use("/paylist", paylistRoutes);
app.use("/spotify", spotifyRoutes);

app.listen(5000, () => {
  console.log(`Backend is running on port 5000`);
});
