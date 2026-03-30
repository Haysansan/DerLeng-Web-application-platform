import { Server } from "socket.io";

let io;
<<<<<<<< HEAD:backend/src/utils/socket_booking.js
const users = {};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
========

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
>>>>>>>> e07a416fb100dae97f4c3f520c13eb9bc466bbd5:backend/src/utils/socket_order.js
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

<<<<<<<< HEAD:backend/src/utils/socket_booking.js
    socket.on("register", (userId) => {
      users[userId] = socket.id;
      console.log("Registered user:", userId);
    });

    socket.on("disconnect", () => {
      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });
};


export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

// Send notification
export const sendNotification = (userId, data) => {
  const socketId = users[userId];

  if (socketId && io) {
    io.to(socketId).emit("notification", data);
  }
========
    // Join a private room based on User ID so they only get THEIR notifications
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their private room`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
>>>>>>>> e07a416fb100dae97f4c3f520c13eb9bc466bbd5:backend/src/utils/socket_order.js
};
