import axios from "axios";

const host = axios.create({
  baseURL: process.env.REACT_APP_HOST,
});

// type body

const api = {
  getData: (limit: Number, offset: Number, search: any) =>
    host.get(`list?limit=${limit}&offset=${offset}&search=${search}`),
};

export default api;
