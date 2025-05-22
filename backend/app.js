import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import paylistRoutes from "./routes/paylistRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://spotifyclone-nine-psi.vercel.app",
    credentials: true,
  })
);

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

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend is running on port 5000`);
});
