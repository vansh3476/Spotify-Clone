import express from 'express';
import { searchSongs } from '../controllers/spotifyController.js';
import { verifyAccessToken } from "../middlewares/index.js";

const router = express.Router();

router.get('/search', verifyAccessToken, searchSongs);

export default router;
