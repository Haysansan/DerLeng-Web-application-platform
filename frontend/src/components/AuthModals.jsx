// src/components/AuthModals.jsx
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthModals({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); // default mode

  if (!isOpen) return null;

  return (
    <>
      {mode === "login" && (
        <Login
          isOpen={true}
          onClose={onClose}
          switchToRegister={() => setMode("register")}
        />
      )}

      {mode === "register" && (
        <Register
          isOpen={true}
          onClose={onClose}
          switchToLogin={() => setMode("login")}
        />
      )}
    </>
  );
}
