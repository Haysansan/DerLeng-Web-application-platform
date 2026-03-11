// src/services/auth.service.js
import api from "./api";

// Login API request
export const loginRequest = async (email, password) => {
  return await api.post("/auth/login", { email, password });
};

// Send verification code to email
export const sendVerificationCode = async ({ email }) => {
  const response = await api.post("/auth/send-code", { email });
  return response.data;
};

// Register account with code verification
export const registerAccount = async ({ name, username, email, password, code }) => {
  const response = await api.post("/auth/register", {
    name,
    username,
    email,
    password,
    code
  });
  return response.data;
};

export const loginAfterRegister = async ({ email, password }) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};