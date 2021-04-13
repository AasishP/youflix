import axios from "axios";

const yts = axios.create({
  baseURL: "https://yts.mx/api/v2",
  method: "get",
});
export default yts;
