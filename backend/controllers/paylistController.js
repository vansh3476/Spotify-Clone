import Playlist from "../models/Playlist.js";

export const createPlaylist = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    const newPlaylist = await Playlist.create({ name, description, userId });
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ message: 'Internal Sever Error' });
  }
};

export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: 'Internal Sever Error' });
  }
};

export const updatePlaylist = async (req, res) => {
  const { name, description } = req.body;

  try {
    const updated = await Playlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Playlist not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Internal Sever Error' });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const deleted = await Playlist.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!deleted) return res.status(404).json({ message: 'Playlist not found' });
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Sever Error' });
  }
};

export const addSongToPlaylist = async (req, res) => {
  const { id: playlistId } = req.params;
  const song = req.body;

  try {
    const playlist = await Playlist.findOne({ _id: playlistId, userId: req.user.id });
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    playlist.songs.push(song);
    await playlist.save();

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Internal Sever Error' });
  }
};
