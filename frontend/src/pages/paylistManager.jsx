// src/components/PlaylistManager.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import api from "../services/api";
import SongSearch from "./SongSearch";
import { useAuthContext } from "../context/authContext";

const PlaylistManager = () => {
  const { token } = useAuthContext();
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const fetchPlaylists = async () => {
    console.log("token", token);
    const res = await api.get("/paylist", {
      headers: { Authorization: `${token}` },
    });
    setPlaylists(res.data);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await api.put(
        `/playlists/${editId}`,
        { name, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      await api.post(
        "/playlists",
        { name, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    setName("");
    setDescription("");
    setEditId(null);
    fetchPlaylists();
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setName(p.name);
    setDescription(p.description || "");
  };

  const handleDelete = async (id) => {
    await api.delete(`/playlists/${id}`, {
      headers: { Authorization: `${token}` },
    });
    fetchPlaylists();
  };

  return (
    <Box>
      <h2>Your Playlists</h2>
      <Box display="flex" gap="1rem" mb={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          {editId ? "Update" : "Create"}
        </Button>
      </Box>

      <List>
        {playlists.map((playlist) => (
          <ListItem
            key={playlist._id}
            secondaryAction={
              <>
                <div onClick={() => handleEdit(playlist)}>Edit</div>
                <div onClick={() => handleDelete(playlist._id)}>Delete</div>
              </>
            }
            button
            onClick={() => setSelectedPlaylist(playlist)}
          >
            <ListItemText
              primary={playlist.name}
              secondary={playlist.description}
            />
          </ListItem>
        ))}
      </List>

      <Dialog
        open={!!selectedPlaylist}
        onClose={() => setSelectedPlaylist(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Manage Songs in: {selectedPlaylist?.name}</DialogTitle>
        <DialogContent>
          {selectedPlaylist && <SongSearch playlistId={selectedPlaylist._id} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PlaylistManager;
