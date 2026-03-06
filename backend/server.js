import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";
// import createAdmin from "./src/services/seedAdmin.js";

dotenv.config();

// Database
connectDB();

// await createAdmin();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
