import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../context/authContext";
import "./style.css";

export default function Layout({ children }) {
  const { loaded, user, logout } = useAuthContext();

  if (!loaded) {
    return;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Spotify Clone
            </Typography>
            {user && (
              <div>
                <div className="hover-underline" onClick={logout}>
                  Log Out
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </Box>
  );
}
