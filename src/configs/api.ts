import axios from "axios";

const host = axios.create({
  baseURL: process.env.REACT_APP_HOST,
});

// type body

const api = {
  getSeasons: () => host.get("seasons"),
};

export default api;
