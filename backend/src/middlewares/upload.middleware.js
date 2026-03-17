import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const postStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const communityStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "communities",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const bookingStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bookings",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const uploadPost = multer({
  storage: postStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
export const uploadProduct = multer({
  storage: productStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
export const uploadCommunity = multer({
  storage: communityStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
export const uploadBooking = multer({
  storage: bookingStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
