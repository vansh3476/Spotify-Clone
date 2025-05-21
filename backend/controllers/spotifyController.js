import spotifyApi, { getAccessToken } from "../utils/spotifyHelper.js";

export const searchSongs = async (req, res) => {
  const { query } = req.query;

  try {
    await getAccessToken();
    const result = await spotifyApi.searchTracks(query, { limit: 10 });

    const songs = result.body.tracks.items.map((track) => ({
      spotifyId: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      album: track.album.name,
      previewUrl: track.preview_url,
    }));

    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
