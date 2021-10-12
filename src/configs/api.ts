/* eslint-disable camelcase */
import axios from "axios";

const host = axios.create({
  baseURL: process.env.REACT_APP_HOST,
});

// type body
export interface BodyPostData {
  komoditas: string;
  area_provinsi: string;
  area_kota: string;
  size: string;
  price: string;
  tgl_parsed: string;
}

const api = {
  getData: (limit: Number, offset: Number, search: any) =>
    host.get(`list?limit=${limit}&offset=${offset}&search=${search}`),
  getArea: () => host.get("option_area"),
  getSize: () => host.get("option_size"),
  postData: (body: BodyPostData) => host.post("list", [body]),
};

export default api;
