// src/components/SongAddToPlaylistModal.tsx
import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import api from "../services/api";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";

const SongAddToPlaylistModal = ({
  open,
  onClose,
  song,
  playlists,
  fetchPlaylists,
}) => {
  const { token } = useAuthContext();
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSelectedId(e.target.value);
  };

  const handleConfirm = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      await api.post(`/paylist/${selectedId}/songs`, song, {
        headers: { Authorization: `${token}` },
      });
      toast.success("Song added to playlist!");
      fetchPlaylists();
      onClose();
    } catch (err) {
      toast.error("Failed to add song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select Playlist to Add Song</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="playlist-select-label">Playlist</InputLabel>
          <Select
            labelId="playlist-select-label"
            value={selectedId}
            onChange={handleChange}
            label="Playlist"
          >
            {playlists.map((playlist) => (
              <MenuItem key={playlist._id} value={playlist._id}>
                {playlist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!selectedId || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Add to Playlist"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SongAddToPlaylistModal;
