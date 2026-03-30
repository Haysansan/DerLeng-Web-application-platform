import { Server } from "socket.io";

let io;
<<<<<<< HEAD

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
=======
const users = {};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
>>>>>>> rachna-front
    },
  });

  io.on("connection", (socket) => {
<<<<<<< HEAD
    console.log("User connected:", socket.id);

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
=======
    socket.on("register", (userId) => {
      users[userId] = socket.id;
    });

    socket.on("disconnect", () => {
      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
        }
      }
    });
  });
};

export const sendNotification = (userId, data) => {
  const socketId = users[userId];
  if (socketId && io) {
    io.to(socketId).emit("notification", data);
  }
>>>>>>> rachna-front
};
