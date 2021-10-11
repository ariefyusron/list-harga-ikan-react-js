import axios from "axios";

const host = axios.create({
  baseURL: process.env.REACT_APP_HOST,
});

// type body

const api = {
  getData: () => host.get("list"),
};

export default api;
