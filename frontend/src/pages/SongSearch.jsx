// src/components/SongSearch.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import api from "../services/api";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";

const SongSearch = ({ handleAdd, fetchPlaylists }) => {
  const { token } = useAuthContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/spotify/search?query=${query}`, {
        headers: { Authorization: `${token}` },
      });
      setResults(res.data);

    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box display="flex" gap={1} mb={2}>
        <TextField
          fullWidth
          label="Search Song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          {loading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </Box>
      <div style={{ overflow: "auto", maxHeight: "65vh" }}>
        {results.map((song) => (
          <Card key={song.spotifyId} style={{ marginBottom: "1rem" }}>
            <CardContent>
              <Typography variant="h6">{song.title}</Typography>
              <Typography variant="body2">
                {song.artist} — {song.album}
              </Typography>
              {song.previewUrl && <audio controls src={song.previewUrl} />}
              <Button
                onClick={() => handleAdd(song)}
                variant="outlined"
                style={{ marginTop: "0.5rem" }}
              >
                Add to Playlist
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
};

export default SongSearch;
