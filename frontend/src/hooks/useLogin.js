// src/hooks/useLogin.js

import { useState, useContext } from "react";
import { loginRequest } from "../services/auth.service";
import { validateUserForm } from "../utils/validators";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useLogin = (onClose) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async (email, password) => {
    const validationErrors = validateUserForm({ email, password });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await loginRequest(email, password);
      const { token, user } = res.data.data;

      login(user, token);

      toast.success("Login successful!", { duration: 2000 });

      onClose();
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }

      return true;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Login failed. Check your credentials",
        { duration: 2000 }
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, errors, setErrors };
};