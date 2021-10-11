import axios from "axios";

const host = axios.create({
  baseURL: process.env.REACT_APP_HOST,
});

// type body

const api = {
  getData: (limit: Number, offset: Number) =>
    host.get(`list?limit=${limit}&offset=${offset}`),
};

export default api;
