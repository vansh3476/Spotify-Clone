// src/pages/Login.tsx
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../services/api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const { login, user } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await api.post("/login", form);
      toast.success(res.data.msg);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        width={300}
        margin="auto"
        mt={10}
      >
        <TextField
          label="Email"
          name="email"
          autoComplete="off"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          autoComplete="off"
          type="password"
          onChange={handleChange}
          style={{ marginTop: 10 }}
        />
        <Button
          variant="contained"
          autoComplete="off"
          onClick={handleLogin}
          style={{ marginTop: 20 }}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
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
              pathname: "/register",
            }}
          >
            Sign Up here
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
