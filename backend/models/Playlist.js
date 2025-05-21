import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  spotifyId: String,
  title: String,
  artist: String,
  album: String,
  previewUrl: String,
  addedAt: { type: Date, default: Date.now },
});

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  songs: [songSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Playlist", playlistSchema);
