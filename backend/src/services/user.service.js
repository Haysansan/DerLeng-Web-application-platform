import User from "../models/User.js";
import bcrypt from "bcryptjs";

import EmailVerification from "../models/EmailVerification.js";
import sendVerificationEmail from "./email.service.js";

const requestEmailChange = async (userId, newEmail) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.email === newEmail) {
    throw new Error("New email must be different from current email");
  }
  const emailExists = await User.findOne({ email: newEmail });

  if (emailExists) {
    throw new Error("Email already in use");
  }

  const code = Math.floor(1000 + Math.random() * 9000).toString();

  await EmailVerification.findOneAndUpdate(
    { email: newEmail },
    {
      email: newEmail,
      code,
      user_id: userId,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
    { upsert: true },
  );

  await sendVerificationEmail(newEmail, code);

  return { message: "Verification code sent to new email" };
};

const verifyEmailChange = async (userId, code) => {
  const record = await EmailVerification.findOne({ user_id: userId });

  if (!record) {
    throw new Error("No verification request found");
  }

  if (record.code !== code) {
    throw new Error("Invalid verification code");
  }

  if (record.expiresAt < new Date()) {
    throw new Error("Verification code expired");
  }

  const user = await User.findById(userId);

  user.email = record.email;

  await user.save();

  await EmailVerification.deleteOne({ user_id: userId });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

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
  if (id !== currentUser._id.toString() && currentUser.role !== "admin") {
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

  // Only admin can change role
  if (updateData.role && currentUser.role === "admin") {
    user.role = updateData.role;
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
  if (id !== currentUser._id.toString() && currentUser.role !== "admin") {
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
  requestEmailChange,
  verifyEmailChange,
};
