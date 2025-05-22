// src/pages/Register.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../services/api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";

const Register = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post("/signup", form);
      toast.success("Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={300}
      margin="auto"
      mt={10}
    >
      <TextField
        label="Name"
        name="name"
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        onChange={handleChange}
        style={{ marginTop: 10 }}
        autoComplete="off"
      />
      <FormControl sx={{ marginTop: "8px" }} variant="outlined">
        <InputLabel autoComplete="off" htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button
        variant="contained"
        onClick={handleRegister}
        style={{ marginTop: 20 }}
      >
        {loading ? <CircularProgress size={24} /> : "Register"}
      </Button>
      <Box
        sx={{
          typography: "body1",
          "& > :not(style) ~ :not(style)": {
            ml: 2,
          },
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "underline",
        }}
      >
        <Link
          to={{
            pathname: "/login",
          }}
        >
          Login here
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
