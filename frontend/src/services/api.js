//C:\Users\DELL\Documents\Cadt\cadty3t2\New folder (2)\DerLeng-Web-application-platform\frontend\src\services\api.js
// frontend/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000"
});

// Attach token to every request
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default api;