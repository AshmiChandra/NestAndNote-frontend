import axios from "axios";

const apiHost = process.env.REACT_APP_API_HOST;
const baseURL = process.env.REACT_APP_API_URL ||
  (apiHost
    ? `https://${apiHost}/api`
    : process.env.NODE_ENV === "production"
      ? "https://nest-and-note-api.onrender.com/api"
      : "http://localhost:8080/api");

const api = axios.create({
  baseURL,
});

export default api;