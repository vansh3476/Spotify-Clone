import express from "express";
const router = express.Router();
import { verifyAccessToken } from "../middlewares/index.js";
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist
} from "../controllers/paylistController.js";

router.post("/", verifyAccessToken, createPlaylist);
router.get("/", verifyAccessToken, getPlaylists);
router.put("/:id", verifyAccessToken, updatePlaylist);
router.delete("/:id", verifyAccessToken, deletePlaylist);
router.post("/:id/songs", verifyAccessToken, addSongToPlaylist);

export default router;
