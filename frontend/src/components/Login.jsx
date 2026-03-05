// src/components/Login.jsx

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.svg";
import { Toaster } from "react-hot-toast";
import { useLogin } from "../hooks/useLogin";

export default function Login({ isOpen, onClose, switchToRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, loading, errors, setErrors } = useLogin(onClose);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setErrors({});
    }
  }, [isOpen, setErrors]);

  if (!isOpen) return null;

  const submitForm = async (e) => {
    e.preventDefault();
    const success = await handleLogin(email, password);

    if (success) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl">
          <div className="bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[450px] rounded-l">

            {/* LEFT FORM */}
            <div className="relative w-full md:w-[65%] p-6 flex flex-col">
              <div className="flex items-baseline mb-6">
                <img src={logo} alt="Derleng" className="h-5 w-auto" />
                <span className="text-lg font-bold text-[#002B11]" style={{ fontFamily: "Georgia, serif" }}>
                  ERLENG
                </span>
              </div>

              <div className="max-w-xs mx-auto w-full">
                <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center">
                  Sign In
                </h2>

                <form autoComplete="off" onSubmit={submitForm}>
                  <div className="space-y-3">

                    {/* EMAIL */}
                    <div>
                      <label className="block text-xs font-bold text-[#002B11] mb-1">
                        Email
                      </label>

                      <input
                        type="email"
                        className={`w-full bg-[#E5E7EB] border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* PASSWORD */}
                    <div>
                      <label className="block text-xs font-bold text-[#002B11] mb-1">
                        Password
                      </label>

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`w-full bg-[#E5E7EB] border ${
                            errors.password ? "border-red-500" : "border-gray-300"
                          } rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]`}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 mb-6 text-xs">
                    <button type="button" className="text-[#002B11] font-semibold hover:underline">
                      Forget your password?
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                      }}
                      className="text-gray-500 hover:underline"
                    >
                      Continue as Guest
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full max-w-[150px] mx-auto block bg-[#008A3D] text-white font-semibold py-2 text-sm rounded-full hover:bg-[#006F31] transition disabled:opacity-50 cursor-pointer"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={switchToRegister}
                    className="text-[#002B11] font-bold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>

              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative hidden md:flex w-[35%] h-full bg-[#002B11] overflow-hidden items-center justify-center rounded-l-[50%]">
              <div className="absolute inset-0 bg-[#002B11]" />
              <svg className="absolute right-0 top-0 h-full w-[100%]" viewBox="0 0 500 800" preserveAspectRatio="none">
                <path d="M200 0 C 400 200, 100 600, 300 800 L 500 800 L 500 0 Z" fill="#1A3B28" />
              </svg>
              <svg className="absolute right-0 top-0 h-full w-[100%]" viewBox="0 0 500 800" preserveAspectRatio="none">
                <path d="M350 0 C 500 300, 150 500, 450 800 L 500 800 L 500 0 Z" fill="#3D5A43" />
              </svg>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-white text-3xl italic opacity-80 leading-tight"
                  style={{ fontFamily: "Georgia, serif", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                  Welcome to our website
                </h1>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
            >
              ✕
            </button>

          </div>
        </div>
      </div>
    </>
  );
}