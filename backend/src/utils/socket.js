import { Server } from "socket.io";

let io;
const users = {};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
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
};
