// hooks/useRegister.js
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { sendVerificationCode, registerAccount } from "../services/auth.service";
import { validateUserForm } from "../utils/validators";

export const useRegister = (switchToLogin) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: ""
  });

  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownRef = useRef(null);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" })); // clear error on change
  };

  const startCooldown = () => {
    setResendCooldown(60);
    cooldownRef.current = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1: send verification code
  const handleSendCode = async () => {
    const { code, ...formWithoutCode } = form;
    const validationErrors = validateUserForm(formWithoutCode);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await sendVerificationCode({ email: form.email });
      toast.success("Verification code sent!");
      setStep(2);
      startCooldown();
    } catch (err) {
      // Map server error to email field if possible
      const msg = err.response?.data?.message || "Failed to send verification code";
      if (msg.toLowerCase().includes("email")) {
        setErrors(prev => ({ ...prev, email: msg }));
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: register account
  const handleRegister = async () => {
    if (!form.code) {
      setErrors(prev => ({ ...prev, code: "Verification code is required" }));
      return;
    }

    try {
      setLoading(true);
      await registerAccount(form);
      toast.success("Registration successful!");
      resetForm();
      switchToLogin();
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";

      // Map server errors to specific fields
      if (msg.toLowerCase().includes("code")) {
        setErrors(prev => ({ ...prev, code: msg }));
      } else if (msg.toLowerCase().includes("email")) {
        setErrors(prev => ({ ...prev, email: msg }));
      } else {
        // fallback toast
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      code: ""
    });
    setErrors({});
    setStep(1);
    setResendCooldown(0);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
  };

  useEffect(() => {
    return () => cooldownRef.current && clearInterval(cooldownRef.current);
  }, []);

  return {
    form,
    errors,
    step,
    loading,
    resendCooldown,
    setStep,
    handleChange,
    handleSendCode,
    handleRegister,
    resetForm
  };
};