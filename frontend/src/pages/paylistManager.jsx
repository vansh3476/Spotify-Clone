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
  Typography,
} from "@mui/material";
import api from "../services/api";
import SongSearch from "./SongSearch";
import { useAuthContext } from "../context/authContext";
import "./style.css";
import { PaylistModal } from "../components/paylistModal.jsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SongAddToPlaylistModal from "../components/songAddToPlaylistModal.jsx";
import { toast } from "react-toastify";

const PlaylistManager = () => {
  const { token } = useAuthContext();
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const fetchPlaylists = async () => {
    const res = await api.get("/paylist", {
      headers: { Authorization: `${token}` },
    });
    setPlaylists(res.data);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
  };

  const handleSubmit = async () => {
    if (editId) {
      await api.put(
        `/paylist/${editId}`,
        { name, description },
        {
          headers: { Authorization: `${token}` },
        }
      );
      toast.success("Paylist Updated");
    } else {
      await api.post(
        "/paylist",
        { name, description },
        {
          headers: { Authorization: `${token}` },
        }
      );
      toast.success("Paylist Created");
    }
    setName("");
    setDescription("");
    setEditId(null);
    setOpen(false);
    fetchPlaylists();
  };

  const handleOpenModal = (song) => {
    setSelectedSong(song);
    setModalOpen(true);
  };

  const handleEdit = (p) => {
    setOpen(true);
    setEditId(p._id);
    setName(p.name);
    setDescription(p.description || "");
  };

  const handleDelete = async (id) => {
    await api.delete(`/paylist/${id}`, {
      headers: { Authorization: `${token}` },
    });
    fetchPlaylists();
    setEditId(null);
    setName("");
    setDescription("");
  };

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "flex-start", columnGap: "30px" }}
      >
        <Box sx={{ width: "40%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "20px",
            }}
          >
            <h2 className="paylistTitle">Your Playlists</h2>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              <span>+ New </span>
            </Button>
          </Box>
          <div className="paylistWrapper">
            {!playlists?.length && (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "black",
                  margin: "0 auto",
                }}
              >
                No Paylist Found
              </span>
            )}
            {playlists.map((playlist) => (
              <div
                className="listitem"
                key={playlist._id}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <div style={{ display: "grid" }}>
                  <span
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {playlist.name}
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontWeight: "400",
                      fontSize: "0.875rem",
                      lineHeight: "1.43",
                      letterSpacing: "0.01071em",
                    }}
                  >
                    {playlist.description}
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontWeight: "500",
                      fontSize: "0.875rem",
                      lineHeight: "1.43",
                      letterSpacing: "0.01071em",
                      marginTop: "10px",
                    }}
                  >
                    Songs: {!playlist?.songs?.length && "No Songs Added"}
                    <br />{" "}
                    <ui>
                      {playlist.songs.map((item) => (
                        <li
                          style={{
                            fontWeight: "400",
                          }}
                        >
                          {item.title}
                        </li>
                      ))}
                    </ui>
                  </span>
                </div>
                <div className="iconWrapper">
                  <EditIcon
                    onClick={() => handleEdit(playlist)}
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Edit
                  </EditIcon>
                  <DeleteIcon
                    onClick={() => handleDelete(playlist._id)}
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Delete
                  </DeleteIcon>
                </div>
              </div>
            ))}
          </div>
        </Box>
        <Box sx={{ width: "60%", marginTop: "10px" }}>
          <SongSearch
            handleAdd={(song) => handleOpenModal(song)}
            fetchPlaylists={fetchPlaylists}
          />
        </Box>
      </Box>
      <PaylistModal
        open={open}
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
        editId={editId}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
      {selectedSong && (
        <SongAddToPlaylistModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          song={selectedSong}
          playlists={playlists}
          fetchPlaylists={fetchPlaylists}
        />
      )}
    </>
  );
};

export default PlaylistManager;
