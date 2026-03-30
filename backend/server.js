// import dotenv from "dotenv";
// dotenv.config();
// import connectDB from "./src/config/db.js";
// import app from "./src/app.js";
// import { initSocket } from "./src/socket.js";
// // import createAdmin from "./src/services/seedAdmin.js";

// // Database
// connectDB();

// initSocket(server);

// // await createAdmin();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config();

import http from "http";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import { initSocket } from "./src/utils/socket_booking.js";

// connect DB
connectDB();

//  create HTTP server
const server = http.createServer(app);

//  init socket with server

const PORT = process.env.PORT || 5000;
initSocket(server);

//  DO NOT use app.listen
//  use server.listen
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
