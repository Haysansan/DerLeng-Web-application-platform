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
    console.log("User connected:", socket.id);

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
};
