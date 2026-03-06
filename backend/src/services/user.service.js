import User from "../models/User.js";
import bcrypt from "bcryptjs";

const getAllUsers = async () => {
  return await User.find().select("-password_hash");
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password_hash");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateUser = async (id, currentUser, updateData) => {
  if (id !== currentUser._id.toString()) {
    throw new Error("Not authorized to update this user");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  if (updateData.username) {
    user.username = updateData.username;
  }

  if (updateData.password) {
    user.password_hash = await bcrypt.hash(updateData.password, 10);
  }

  await user.save();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};
const deleteUser = async (id, currentUser) => {
  if (id !== currentUser._id.toString()) {
    throw new Error("Not authorized to delete this user");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
