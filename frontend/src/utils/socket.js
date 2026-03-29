import { io } from "socket.io-client";

// Use the same VITE_API_URL you used for your order services
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Ensure there is no trailing slash which can sometimes confuse socket.io
const cleanSocketUrl = SOCKET_URL.endsWith("/")
  ? SOCKET_URL.slice(0, -1)
  : SOCKET_URL;

export const socket = io(cleanSocketUrl, {
  autoConnect: true,
  reconnection: true,
});
