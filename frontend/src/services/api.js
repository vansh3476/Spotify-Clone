// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://spotify-clone-l0b7.onrender.com", // change this if deployed
});

export default api;
