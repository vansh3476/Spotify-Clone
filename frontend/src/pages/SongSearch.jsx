// src/components/SongSearch.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import api from "../services/api";
import { useAuthContext } from "../context/authContext";

const SongSearch = ({ playlistId }) => {
  const { token } = useAuthContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await api.get(`/spotify/search?query=${query}`, {
      headers: { Authorization: `${token}` },
    });
    setResults(res.data);
  };

  const handleAdd = async (song) => {
    await api.post(`/playlists/${playlistId}/songs`, song, {
      headers: { Authorization: `${token}` },
    });
    alert("Song added!");
  };

  return (
    <Box>
      <Box display="flex" gap={1} mb={2}>
        <TextField
          fullWidth
          label="Search Spotify..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

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
    </Box>
  );
};

export default SongSearch;
